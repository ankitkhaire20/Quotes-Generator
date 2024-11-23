import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchQuotes = () => {
    const [quote, setQuote] = useState(''); // Store the fetched quote
    const [error, setError] = useState(null); // To track errors if any

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response = await axios.get("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
                    headers: {
                        "X-Api-Key": "WUyhzSkUxnx++eSsO5Ee5g==zCWy2QKfQ409iRPs",
                    },
                });

                if (response.data && response.data.length > 0) {
                    setQuote(response.data[0].quote);  // Save the quote to state
                } else {
                    setQuote("No quotes found.");
                }
            } catch (error) {
                setError("Error fetching quote.");
            } finally {
            }
        };

        fetchQuotes(); // Call the async function inside useEffect
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return { quote }; // Return quote, loading, and error states
};

export default useFetchQuotes;
