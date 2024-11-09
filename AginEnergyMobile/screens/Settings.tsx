import { Button } from "@lib/components";
import { SafeAreaView, Text } from "react-native";
import React from "react";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import * as SecureStore from 'expo-secure-store';
import { useServer } from "@lib/hooks";

export default function Settings() {
    const { server } = useServer();
    return (
        <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
            <Button onPress={() => SecureStore.deleteItemAsync('server')}>Resetuj SecureStore</Button>
            <Text>{server}</Text>
        </SafeAreaView>
    );
}
