import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Color, Font } from "../utills/theme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { completeIntroduction, login, userLoggedIn } from "../state/auth/authSlice";
import Animated, { BounceInUp, RotateInDownLeft, RotateInDownRight, RotateInUpLeft, RotateInUpRight, ZoomInEasyUp, ZoomInLeft } from "react-native-reanimated";
import { clearQuote } from "../state/auth/quotesSlice";

const SettingsScreen: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const userData: any = useSelector((state: RootState) => state.auth.loginData);

    const handleLogout = () => {
        setModalVisible(false); // Close the modal
        dispatch(userLoggedIn(false));
        dispatch(completeIntroduction(false));
        dispatch(clearQuote());
        dispatch(login({}));
    };

    return (
        <LinearGradient
            colors={[Color.LIN_1, Color.LIN_2, Color.LIN_3]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.background}>
                    <Animated.View style={styles.mainViewContainer} entering={BounceInUp}>
                        <Animated.Text style={styles.textStyle}>
                            Email: {userData?.email}
                        </Animated.Text>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            onPress={() => setModalVisible(true)} // Open the modal
                        >
                            <Text style={styles.textStyle}>LogOut</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
            {/* <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay} >
                    <View style={styles.modalContent} >
                        <Text style={styles.modalText}>
                            Are you sure you want to log out?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal> */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <Animated.View style={styles.modalOverlay}
                    entering={ZoomInEasyUp}
                    exiting={ZoomInLeft}
                >
                    <View style={styles.modalContent} >
                        <Text style={styles.modalText} >
                            Are you Sure you want to log out ?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.modalButtonText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.modalButtonText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Animated.View>
            </Modal>
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
    textStyle: {
        fontSize: 18,
        color: "#fff",
        padding: 10,
    },
    mainViewContainer: {
        marginTop: 20,
        flex: 1,
        position: "relative",
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: "#ffffff",
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker for better contrast
        alignItems: "center",
        position: "absolute",
        bottom: 30,
        width: "100%",
    },
    modalOverlay: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: "rgba(255, 255, 255, 0.15)",
    },
    modalContent: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        fontSize: 16,
        color: "#fff",
        fontFamily: Font.OPENSANS_SEMIBOLD,
        textAlign: "center",
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButton: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: "center",
    },
    confirmButton: {
        backgroundColor: "#f44336", // Red for confirm
    },
    cancelButton: {
        backgroundColor: "#4CAF50", // Green for cancel
    },
    modalButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default SettingsScreen;
