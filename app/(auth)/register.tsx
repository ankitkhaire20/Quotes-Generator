import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import { Image, SafeAreaView, StyleSheet, View, Text, Keyboard } from "react-native";
import { Color } from "../utills/theme";
import Animated, { BounceInUp, BounceInRight, BounceInLeft } from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import TextField from "../../components/TextField";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { REGEX } from "../utills/global";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";

const Register: React.FC = () => {
    const {
        control,
        getValues,
        setValue, reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all', shouldUnregister: false, });

    const router = useRouter(); // Use useRouter hook for navigation


    const handlePress = (data: any) => {
        console.log(data);
        router.push('/login');
        reset();// Use Expo Router to navigate
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Refs for TextFields
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    return (
        <LinearGradient
            colors={[Color.LIN_1, Color.LIN_2, Color.LIN_3]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    {/* Animated Logo */}
                    <Animated.View style={styles.logoContainer} entering={BounceInUp}>
                        <Image
                            source={require('../../assets/images/app.png')}
                            style={styles.logo}
                        />
                    </Animated.View>

                    <View style={{ marginTop: 30 }}>
                        <Animated.Text style={styles.title}>Register</Animated.Text>
                    </View>

                    {/* First Name Field */}
                    <Animated.View entering={BounceInLeft} style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="firstname"
                            rules={{
                                required: { value: true, message: JSON.stringify([{ valid: false, title: 'First Name is Required' }]) },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    placeholder="Enter your First Name"
                                    label="First Name"
                                    errorMessage={errors.firstname?.message}
                                    value={value}
                                    secureTextEntry={false}
                                    returnKeyType="next"
                                    onSubmitEditing={() => lastNameRef.current?.focus()}
                                    onChangetText={onChange}
                                    rightIcon={value ? 'close' : undefined}
                                    onPressRightIcon={() => setValue('firstname', '', { shouldValidate: true })}
                                    labelStyle={styles.inputLabel}
                                    placeholderTextColor="#999"
                                    textInputStyle={styles.inputText}
                                    mainTextInputStyle={styles.inputField}
                                    ref={firstNameRef}
                                    editable={true} />
                            )}
                        />
                    </Animated.View>

                    {/* Last Name Field */}
                    <Animated.View entering={BounceInRight} style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="lastname"
                            rules={{
                                required: { value: true, message: JSON.stringify([{ valid: false, title: 'Last Name is Required' }]) },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    placeholder="Enter your Last Name"
                                    label="Last Name"
                                    value={value}
                                    secureTextEntry={false}
                                    onChangetText={onChange}
                                    rightIcon={value ? 'close' : undefined}
                                    onPressRightIcon={() => setValue('lastname', '', { shouldValidate: true })}
                                    errorMessage={errors.lastname?.message}
                                    labelStyle={styles.inputLabel}
                                    placeholderTextColor="#999"
                                    textInputStyle={styles.inputText}
                                    mainTextInputStyle={styles.inputField}
                                    ref={lastNameRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() => emailRef.current?.focus()}
                                    editable={true} />
                            )}
                        />
                    </Animated.View>

                    {/* Email Field */}
                    <Animated.View entering={BounceInLeft} style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: { value: true, message: JSON.stringify([{ valid: false, title: 'Email is Required' }]) },
                                pattern: { value: REGEX.EMAIL, message: JSON.stringify([{ valid: false, title: 'Please Enter a valid email' }]) },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    placeholder="Enter your Email"
                                    label="Email"
                                    value={value}
                                    secureTextEntry={false}
                                    onChangetText={onChange}
                                    leftIcon="mail-outline"
                                    errorMessage={errors.email?.message}
                                    labelStyle={styles.inputLabel}
                                    placeholderTextColor="#999"
                                    rightIcon={value ? 'close' : undefined}
                                    onPressRightIcon={() => setValue('email', '', { shouldValidate: true })}
                                    textInputStyle={styles.inputText}
                                    mainTextInputStyle={styles.inputField}
                                    ref={emailRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() => passwordRef.current?.focus()}
                                    editable={true} />
                            )}
                        />
                    </Animated.View>

                    {/* Password Field */}
                    <Animated.View entering={BounceInRight} style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: { value: true, message: JSON.stringify([{ valid: false, title: 'Password is required' }]) },
                                minLength: { value: 6, message: JSON.stringify([{ valid: false, title: 'Password must be at least 6 characters long' }]) },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    placeholder="Enter your Password"
                                    label="Password"
                                    value={value}
                                    secureTextEntry={showPassword}
                                    leftIcon="lock-closed-outline"
                                    onChangetText={text => {
                                        onChange(text);
                                        const confirmPass = getValues('confirmPassword');
                                        if (confirmPass) {
                                            setValue('confirmPassword', confirmPass, { shouldValidate: true });
                                        }
                                    }}
                                    errorMessage={errors.password?.message}
                                    labelStyle={styles.inputLabel}
                                    placeholderTextColor="#999"
                                    textInputStyle={styles.inputText}
                                    mainTextInputStyle={styles.inputField}
                                    rightIcon={showPassword ? 'eye-off' : 'eye'}
                                    onPressRightIcon={() => setShowPassword(!showPassword)}
                                    ref={passwordRef}
                                    returnKeyType="next"
                                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                                    editable={true} />
                            )}
                        />
                    </Animated.View>

                    {/* Confirm Password Field */}
                    <Animated.View entering={BounceInLeft} style={styles.inputWrapper}>
                        <Controller
                            control={control}
                            name="confirmPassword"
                            rules={{
                                required: { value: true, message: JSON.stringify([{ valid: false, title: 'Confirm Password is required' }]) },
                                validate: value =>
                                    value === getValues('password') ||
                                    JSON.stringify([{ valid: false, title: 'Passwords do not match.' }]),
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    placeholder="Confirm your Password"
                                    label="Confirm Password"
                                    value={value}
                                    leftIcon="lock-closed-outline"
                                    secureTextEntry={showConfirmPassword}
                                    errorMessage={errors.confirmPassword?.message}
                                    onChangetText={onChange}
                                    labelStyle={styles.inputLabel}
                                    placeholderTextColor="#999"
                                    textInputStyle={styles.inputText}
                                    mainTextInputStyle={styles.inputField}
                                    rightIcon={showConfirmPassword ? 'eye-off' : 'eye'}
                                    onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                                    ref={confirmPasswordRef}
                                    returnKeyType="done"
                                    onSubmitEditing={handleSubmit(handlePress)}
                                    editable={true} />
                            )}
                        />
                    </Animated.View>



                    <View style={styles.buttonContainer}>
                        <CustomButton
                            title="Register"
                            buttonCustomStyle={{
                                backgroundColor: isValid ? '#007AFF' : 'lightgrey',
                                opacity: isValid ? 1 : 0.6,
                            }}
                            disabled={!isValid}
                            onPress={handleSubmit(handlePress)}
                        />
                        <CustomButton
                            title="cancel"
                            buttonCustomStyle={{
                                backgroundColor: '#007AFF',
                            }}
                            onPress={() => {
                                router.push('/login');
                            }}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        marginHorizontal: 20,
        flex: 1,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: 70,
        height: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputWrapper: {
        marginVertical: 10,
    },
    inputLabel: {
        color: '#FFFFFF',
    },
    inputText: {
        color: '#FFFFFF',
    },
    inputField: {
        borderColor: 'white',
    },
    buttonContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
});

export default Register;
