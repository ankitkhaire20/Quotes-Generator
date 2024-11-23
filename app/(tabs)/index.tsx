import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Linking,
    Alert,
} from "react-native";
import Animated, {
    ZoomIn,
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    BounceIn,
    SlideInLeft,
    BounceInLeft,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Color, Font } from "../utills/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { toggleQuote } from "../state/auth/quotesSlice";
import FlipCard from "../../components/Flipp/FlipCard";
import axios from "axios";


const HomeScreen: React.FC = () => {
    // Shared value for scaling animation

    const [quote, setQuote] = useState<string>("Click 'New Quote' to get inspired!");
    const [liked, setLiked] = useState<boolean>(false);
    const [quoteId, setQuoteId] = useState<string>(''); // Store the unique ID for the quote
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

    const dispatch = useDispatch<AppDispatch>();
    const scale = useSharedValue(1);

    // Animated style using shared value
    const animatedScaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: withTiming(scale.value, { duration: 200 }) }],
    }));

    const toggleLike = () => {
        // Use the unique ID for the quote
        let temp = {
            quoteText: quote,
            liked: !liked,
            id: quoteId, // Use the stored unique ID
        };

        console.log("temp--", temp);

        // Dispatch the action to toggle the like state
        dispatch(toggleQuote(temp));
        setLiked(!liked);
    };



    const shareQuote = async () => {
        const message = `Check out this inspirational quote: "${quote}"`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Error", "WhatsApp is not installed on this device.");
            }
        } catch (error) {
            console.error("Error sharing quote to WhatsApp:", error);
            Alert.alert("Error", "Failed to share quote to WhatsApp.");
        }
    };


    useEffect(() => {
        // getQuote();
    }, []);

    const generateUniqueId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    const getQuote = async () => {
        try {
            setIsPlaying(false);
            const response = await axios.get("https://api.api-ninjas.com/v1/quotes?category=happiness", {
                headers: {
                    "X-Api-Key": "WUyhzSkUxnx++eSsO5Ee5g==zCWy2QKfQ409iRPs",
                },
            });

            if (response.data && response.data.length > 0) {
                const newQuote = response.data[0].quote;
                const newQuoteId = generateUniqueId(); // Generate the unique ID for the quote
                setQuote(newQuote);
                setQuoteId(newQuoteId); // Save the ID for this quote
                setLiked(false); // Reset the liked state
            } else {
                Alert.alert("No quotes found.");
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
            Alert.alert("Error", "Failed to fetch quote. Please try again.");
        }
    };



    return (
        <LinearGradient
            colors={[Color.LIN_1, Color.LIN_2, Color.LIN_3]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={{ flex: 1, justifyContent: 'center' }} >

                        <FlipCard
                            liked={liked}
                            cardStyle={styles.mycard}
                            quotes={quote}
                            onPress={() => {
                                getQuote();
                            }}
                            direction={"x"} />

                        <Animated.View entering={BounceInLeft.duration(1000)}>
                            <TouchableOpacity
                                style={styles.generateButton}
                                onPress={() => {
                                    getQuote();
                                }}
                            >
                                <Text style={styles.textStyle}>Generate Quote</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <View style={styles.buttonRow} >
                            <Animated.View entering={BounceIn.duration(1000)} >
                                <AnimatedTouchableOpacity
                                    style={[styles.circleButton, animatedScaleStyle]}
                                    onPress={shareQuote}
                                >
                                    <Ionicons name="logo-whatsapp" size={24} color="#fff" />
                                </AnimatedTouchableOpacity>
                            </Animated.View>
                            <Animated.View entering={BounceIn.duration(1000)} >
                                <AnimatedTouchableOpacity
                                    style={[styles.circleButton, animatedScaleStyle]}
                                    onPress={toggleLike}>
                                    <FontAwesome
                                        name={liked ? "heart" : "heart-o"}
                                        size={24}
                                        color={liked ? "red" : "#fff"}
                                    />
                                </AnimatedTouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    circleButton: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    textStyle: {
        fontSize: 18,
        fontFamily: Font.MONTSERRAT_BOLD,
        color: "#fff",
        padding: 12,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    mycard: {
        // width: '100%',
        // height: 300,
    },
    generateButton: {
        marginBottom: 42,
        backgroundColor: "grey",
        borderRadius: 10,
        alignItems: "center",
    },
});

export default HomeScreen;
