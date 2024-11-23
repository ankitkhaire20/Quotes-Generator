import { Link } from "expo-router"; // Import Link for navigation
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useForm, Controller } from "react-hook-form";
import TextField from "../../components/TextField";
import { Color } from "../utills/theme";
import { REGEX, screenHeight } from "../utills/global";
import { Ionicons } from '@expo/vector-icons';
import Animated, { BounceInLeft, BounceInRight, BounceInUp } from 'react-native-reanimated';
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import { login, userLoggedIn } from "../state/auth/authSlice";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: 'all', shouldUnregister: false });

    const handlePress = (data: any) => {
        console.log("data--", data);

        dispatch(userLoggedIn(true));
        let temp = {
            email: data.email,
        }
        dispatch(login(temp));
    };



    return (
        <LinearGradient
            colors={[Color.LIN_1, Color.LIN_2, Color.LIN_3]} // Background gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.container}>
                    <Animated.View style={styles.logoContainer} entering={BounceInUp}>
                        <Image
                            source={require('../../assets/images/app.png')}
                            style={styles.logo}
                        />
                    </Animated.View>
                    <View style={{ marginTop: 80 }}>
                        <Animated.Text style={styles.title} entering={BounceInLeft}>
                            Login
                        </Animated.Text>

                        {/* Email Field */}
                        <Animated.View entering={BounceInLeft}>
                            <Controller
                                control={control}
                                name="email"
                                rules={{
                                    required: {
                                        value: true,
                                        message: JSON.stringify([{ valid: false, title: 'Email is Required' }])
                                    },
                                    pattern: {
                                        value: REGEX.EMAIL,
                                        message: JSON.stringify([{ valid: false, title: 'Please Enter a valid email' }]),
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        placeholder="Enter your Email"
                                        label="Email"
                                        value={value}
                                        secureTextEntry={false}
                                        onChangetText={onChange}  // Corrected this line
                                        editable={true}
                                        labelStyle={{ color: '#FFFFFF' }}
                                        mainTextInputStyle={{ borderColor: 'white' }}
                                        textInputStyle={{ color: '#FFFFFF' }}
                                        leftIcon="mail-outline"
                                        rightIcon={value ? 'close' : undefined}
                                        onPressRightIcon={() => {
                                            setValue('email', '', { shouldValidate: true });
                                        }}
                                        placeholderTextColor="#999"
                                        errorMessage={errors.email?.message}
                                    />
                                )}
                            />
                        </Animated.View>

                        {/* Password Field */}
                        <Animated.View style={{ marginVertical: 10 }} entering={BounceInRight}>
                            <Controller
                                control={control}
                                name="password"
                                rules={{
                                    required: {
                                        value: true,
                                        message: JSON.stringify([{ valid: false, title: 'Password is Required' }])
                                    },
                                    minLength: {
                                        value: 8,
                                        message: JSON.stringify([{ valid: false, title: 'Password must be at least 8 characters' }])
                                    }
                                }}
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <TextField
                                        label="Password"
                                        value={value}
                                        secureTextEntry={!showPassword}
                                        onChangetText={onChange}  // Corrected this line
                                        editable={true}
                                        placeholder="Enter your Password"
                                        placeholderTextColor="#999"
                                        errorMessage={error?.message}
                                        labelStyle={{ color: '#FFFFFF' }}
                                        mainTextInputStyle={{ borderColor: 'white' }}
                                        textInputStyle={{ color: '#FFFFFF' }}
                                        leftIcon="lock-closed-outline"
                                        rightIcon={showPassword ? 'eye-off' : 'eye'}
                                        onPressRightIcon={() => setShowPassword(!showPassword)}
                                    />
                                )}
                            />
                        </Animated.View>

                        {/* Login Button */}
                        <Animated.View style={{ marginTop: 30 }} entering={BounceInUp}>
                            <CustomButton
                                title="Login"
                                disabled={!isValid}
                                buttonCustomStyle={{
                                    backgroundColor: isValid ? '#007AFF' : 'lightgrey',
                                    opacity: isValid ? 1 : 0.6,
                                }}
                                titleStyle={{ color: 'white' }}
                                onPress={handleSubmit(handlePress)}
                            />
                        </Animated.View>

                        {/* Register Now Text */}
                        <View style={styles.registerContainer}>
                            <Animated.Text style={styles.registerText} entering={BounceInRight}>
                                Don't have an account?
                                <Link href="/register" style={styles.registerLink}> Register Now</Link>
                            </Animated.Text>
                        </View>
                    </View>
                </ScrollView>
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
        marginHorizontal: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 30,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    logo: {
        width: 100,
        height: 100,
    },
    registerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerText: {
        fontSize: 16,
        color: 'white',
    },
    registerLink: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
});

export default Login;
