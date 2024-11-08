import { StyleSheet, Platform, StatusBar } from "react-native";

export const AndroidSafeArea = StyleSheet.create({
    AndroidSafeArea: {
        paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) : 0
    }
});