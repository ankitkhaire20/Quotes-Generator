import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { Color, Font } from "../../app/utills/theme";

interface RegularContentProps {
    quotes: any,

}

const RegularContent: React.FC<RegularContentProps> = (props) => {

    const { quotes, } = props;

    return (
        <View style={styles.quoteBox}>
            <ScrollView contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="always">
                <Text style={styles.quoteText}>{quotes}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    quoteBox: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        borderRadius: 15,
        marginBottom: 20,
        width: '100%',
    }, quoteText: {
        fontSize: 20,
        fontFamily: Font.MONTESERRAT_SEMIBOLD,
        textAlign: 'center',
        color: Color.WHITE,
        padding: 10,
    },
    scrollContent: {
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1, // Ensures content is vertically centered
    },
})

export default RegularContent;