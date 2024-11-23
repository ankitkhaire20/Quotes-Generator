import { StyleSheet } from "react-native";
import { Color } from "../utills/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // backgroundColor: Color.PRIMARY
    },

    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: 10,
        marginBottom: 20, // Added margin for spacing
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    result: {
        marginTop: 20,
        fontSize: 16,
    },
});

export default styles;