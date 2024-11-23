import React, { forwardRef } from 'react';
import {
    NativeSyntheticEvent,
    ReturnKeyTypeOptions,
    StyleSheet,
    Text,
    TextInput,
    TextInputSubmitEditingEventData,
    TouchableOpacity,
    View,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color, Font } from '../app/utills/theme';

interface TextInputProps {
    label: string;
    leftIcon?: any;
    rightIcon?: any;
    mainTextInputStyle?: ViewStyle;
    onPressLeftIcon?: () => void;
    onPressRightIcon?: () => void;
    value: string;
    secureTextEntry: boolean;
    onChangetText: (text: string) => void;
    onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
    editable: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
    errorMessage?: any;  // Corrected to match the prop name used in `Login`
    textInputStyle?: TextStyle;
    labelStyle?: TextStyle;
    placeholderTextColor: string;
    placeholder: string;
    leftIconStyle?: any;
    rightIconStyle?: any;
}

const TextField = React.forwardRef<TextInput, TextInputProps>((props, ref) => {
    const {
        label,
        leftIcon,
        value,
        returnKeyType,
        onChangetText,
        onSubmitEditing,
        editable,
        textInputStyle,
        mainTextInputStyle,
        onPressLeftIcon,
        errorMessage,  // Use correct prop name here
        placeholder,
        placeholderTextColor,
        onPressRightIcon,
        secureTextEntry,
        rightIcon,
        labelStyle,
        leftIconStyle,
        rightIconStyle,
    } = props;

    let parsedErrorMessage: string | null = null;
    if (errorMessage) {
        try {
            const parsedArray = JSON.parse(errorMessage);
            if (Array.isArray(parsedArray) && parsedArray.length > 0) {
                parsedErrorMessage = parsedArray[0].title; // Extract `title` field from the first object
            }
        } catch (error) {
            console.error("Error parsing errorMessage JSON:", error);
        }
    }


    return (
        <View style={styles.container}>
            {label && <Text style={[styles.labelText, labelStyle]}>{label}</Text>}
            <View style={[styles.mainTextInputContainer, mainTextInputStyle]}>
                {leftIcon && (
                    <TouchableOpacity style={[styles.leftIconStyle, leftIconStyle]} onPress={onPressLeftIcon}>
                        <Ionicons name={leftIcon} size={20} color={Color.WHITE} />
                    </TouchableOpacity>
                )}
                <TextInput
                    value={value}
                    ref={ref}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    returnKeyType={returnKeyType}
                    onChangeText={onChangetText}
                    onSubmitEditing={onSubmitEditing}
                    style={[styles.textInput, textInputStyle, {
                        paddingLeft: leftIcon ? 6 : 0,
                    }]}
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                />
                {rightIcon && value !== '' && (
                    <TouchableOpacity style={styles.rightIconStyle} onPress={onPressRightIcon}>
                        <Ionicons name={rightIcon} size={20} color={Color.WHITE} />
                    </TouchableOpacity>
                )}
            </View>
            {parsedErrorMessage && <Text style={styles.errorText}>{parsedErrorMessage}</Text>}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    labelText: {
        fontSize: 16,
        fontFamily: Font.OPENSANS_BOLD,
        color: '#000000',
        marginBottom: 14,
    },
    mainTextInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Color.BLACK,
        borderRadius: 10,
        height: 42,
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    leftIconStyle: {
        marginRight: 12,
    },
    rightIconStyle: {
        marginLeft: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    errorText: {
        fontSize: 14,
        color: Color.ERROR,
        marginTop: 8,
    },
});

export default TextField;
