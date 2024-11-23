import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { LinearGradient } from "expo-linear-gradient";
import { Color, Font } from "../utills/theme";
import Animated, {
    BounceInLeft,
    JumpingTransition,
    LinearTransition,
} from "react-native-reanimated";
import { toggleQuote } from "../state/auth/quotesSlice";

const QuotesList: React.FC = () => {
    const allQuotes = useSelector((state: RootState) => state.quotes.quotes);
    const dispatch = useDispatch<AppDispatch>();

    // Local state to manage the list of quotes
    const [quotes, setQuotes] = useState(allQuotes);

    useEffect(() => {
        // Update local state when the Redux state changes
        setQuotes(allQuotes.filter((quote) => quote.liked));
    }, [allQuotes]);

    const handleToggleLike = (item) => {
        const updatedQuote = {
            ...item,
            liked: !item.liked,
        };
        dispatch(toggleQuote(updatedQuote));
    };

    const renderItem = ({ item }) => (
        <Animated.View
            style={styles.quoteContainer}
            entering={BounceInLeft}
            layout={LinearTransition}
        >
            <Text style={styles.quoteText}>{item.quoteText}</Text>
            <TouchableOpacity onPress={() => handleToggleLike(item)}>
                <Text style={styles.quoteLiked}>
                    {item.liked ? "❤️" : "💔"}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <LinearGradient
            colors={[Color.LIN_1, Color.LIN_2, Color.LIN_2]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                {quotes.length > 0 ? (
                    <Animated.FlatList
                        data={quotes}
                        showsVerticalScrollIndicator={false}
                        itemLayoutAnimation={JumpingTransition}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>
                            No liked quotes yet. ❤️ Add some!
                        </Text>
                    </View>
                )}
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
    },
    quoteText: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
        fontFamily: Font.MONTSERRAT_BOLD,
        marginBottom: 8,
    },
    quoteContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderRadius: 10,
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
    },
    quoteLiked: {
        fontSize: 14,
        color: "#fff",
        textAlign: "right",
        fontFamily: Font.MONTESERRAT_REGULAR,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        fontFamily: Font.MONTESERRAT_REGULAR,
    },
});

export default QuotesList;
