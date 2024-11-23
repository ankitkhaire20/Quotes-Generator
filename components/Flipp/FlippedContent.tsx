import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { Color, Font } from "../../app/utills/theme";

interface FlippedContentProps {
    quotes: any,
}

const FlippedContent: React.FC<FlippedContentProps> = (props) => {

    const { quotes, } = props;

    return (
        <View style={styles.flippedQuoteBox}>
            <ScrollView contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="always">
                <Text style={styles.flippedQuoteText}>{quotes}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    flippedQuoteBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Changed for contrast
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        width: '100%',
    },
    flippedQuoteText: {
        fontSize: 20,
        fontFamily: Font.MONTESERRAT_SEMIBOLD,
        textAlign: 'center',
        color: Color.BLACK, // Changed color for contrast
        padding: 10,
    },
    scrollContent: {
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1, // Ensures content is vertically centered
    },
})

export default FlippedContent;
