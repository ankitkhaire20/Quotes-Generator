import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Quote interface
interface Quote {
    quoteText: string;
    liked: boolean;
    id: string; // Unique ID for each quote
}

// Define the initial state shape
interface QuotesState {
    quotes: Quote[]; // Array of quotes
}

const initialState: QuotesState = {
    quotes: [], // Initialize with an empty array
};

// Create the slice with reducers
const quotesSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        // Toggle the like status or add/remove the quote in the list
        toggleQuote: (state, action: PayloadAction<Quote>) => {
            console.log("action---", action);

            const { id, liked, quoteText } = action.payload;
            console.log("id--", id);
            console.log("quoteText--", quoteText);

            // Ensure quotes is always defined as an array
            if (!state.quotes) {
                state.quotes = [];  // Fallback to empty array if undefined
            }

            // Find the index of the existing quote by its ID
            const existingQuoteIndex = state.quotes.findIndex(quote => quote.id === id);

            if (existingQuoteIndex !== -1) {
                // If the quote exists, update the like status
                state.quotes[existingQuoteIndex].liked = liked;
                console.log("Updated Quote:", state.quotes[existingQuoteIndex]);
            } else {
                // If the quote does not exist, add the new quote
                state.quotes.push(action.payload);
                console.log("Added New Quote:", action.payload);
            }
        },
        clearQuote: (state,) => {
            state.quotes = [];
        }
    },
});

// Export actions
export const { toggleQuote, clearQuote } = quotesSlice.actions;

// Export the reducer as the default export
export default quotesSlice.reducer;
