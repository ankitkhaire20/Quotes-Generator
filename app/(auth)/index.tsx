import React, { useEffect } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { BounceInUp, FadeIn, SlideInUp } from "react-native-reanimated";
import { Color, Font } from "../utills/theme";
import { Link, Redirect } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { completeIntroduction } from "../state/auth/authSlice";

const IntroductionScreen: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();

    const handleButtonPress = () => {
        dispatch(completeIntroduction(true)); // Dispatch the action
    };


    return (
        <ImageBackground
            source={require('../../assets/images/colors1.jpg')} // Replace with your image path
            style={styles.background}
            resizeMode="cover" // Adjust image to cover the whole area
        >
            <SafeAreaView style={styles.mainContainer}>
                <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <Animated.View style={styles.logoContainer} entering={BounceInUp}>
                        <Image
                            source={require('../../assets/images/app.png')}
                            style={styles.logo}
                        />
                    </Animated.View>
                    <Animated.View entering={SlideInUp.delay(200)} style={styles.quoteContainer}>
                        <Text style={styles.descriptionText}>
                            In every heartbeat lies the pulse of creation;
                            embrace the rhythm, for your dreams are the brushstrokes
                            that color your reality
                        </Text>
                    </Animated.View>
                    <Link href={'./login'} asChild >
                        <TouchableOpacity style={styles.button} activeOpacity={0.7}
                            onPress={handleButtonPress}
                        >
                            <Text style={styles.buttonText}>Let's Go</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        marginHorizontal: 16,
        marginTop: 100,
    },
    logo: {
        width: 100,
        height: 100,
    },
    logoContainer: {
        alignItems: 'center',
    },
    quoteContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly darker for better contrast
        borderRadius: 10,
        padding: 15, // Add padding for better spacing
        marginHorizontal: 20,
        marginTop: 20, // Add margin for spacing above
    },
    descriptionText: {
        fontSize: 18,
        fontFamily: Font.OPENSANS_BOLD, // Adjust font if needed
        color: '#fff',
        textAlign: 'center',
        lineHeight: 24, // Improve readability
    },
    button: {
        width: '100%',
        height: 48,
        backgroundColor: Color.SUCCESS,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 20, // Add margin for spacing
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
        fontFamily: Font.MONTSERRAT_BOLD,
    },
});

export default IntroductionScreen;

