import { Color, Font } from '@/app/utills/theme';
import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, TextStyle, Text } from 'react-native';




interface CustomButtonProps {
    style?: ViewStyle;
    buttonCustomStyle?: ViewStyle;
    activeOpacity?: number;
    disabled?: boolean;
    onPress: () => void;
    btnIconName?: string;
    btnIconCustomStyle?: TextStyle;
    title?: string;
    titleStyle?: TextStyle;
}

const CustomButton: React.FC<CustomButtonProps> = props => {
    const {
        buttonCustomStyle,
        activeOpacity,
        disabled,
        onPress,
        btnIconName,
        btnIconCustomStyle,
        titleStyle,
        title,
    } = props;


    return (
        <TouchableOpacity
            style={[
                styles.buttonStyle,
                { backgroundColor: disabled ? Color.DARKGRAY : Color.GREEN },
                buttonCustomStyle,
            ]}
            activeOpacity={activeOpacity}
            disabled={disabled}
            onPress={onPress}>
            {btnIconName && (
                <TouchableOpacity style={[styles.btnIconStyle, btnIconCustomStyle]} disabled={true} >
                    {btnIconName}
                </TouchableOpacity>

            )}
            {title && (
                <Text
                    style={[
                        styles.textStyle,
                        {
                            color: disabled ? Color.WHITE : Color.WHITE,
                        },
                        titleStyle || {}, // Use an empty object if titleStyle is undefined
                    ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 16,
        height: 42,
    },
    textStyle: {
        fontFamily: Font.MONTSERRAT_BOLD,
        fontSize: Font.SIZE_16,
    },
    btnIconStyle: {
        fontSize: Font.SIZE_18,
        marginRight: 6,
    },
});

export default CustomButton;
