import { Button, Title } from "@lib/components";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { AndroidSafeArea } from "@lib/components/SafeViewAndroid";
import * as SecureStore from 'expo-secure-store';
import { useColors, useServer } from "@lib/hooks";
import { IconSettings2 } from "@tabler/icons-react-native";
import SettingsOption from "@lib/components/SettingsOption";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OnboardingParams } from "@lib/navigators";

export default function Settings() {
    const { server } = useServer();
    const { backgroundColor } = useColors();

    const navigator = useNavigation<NavigationProp<OnboardingParams>>();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            backgroundColor,
            flex: 1,
        },
        content: {
            padding: 25,
            // paddingTop: 50,
            paddingTop: 10,
            gap: 15,
            paddingBottom: 100,
        },
        topSection: {
            gap: 15,
        },
        options: {
            gap: 15
        },
    }), [backgroundColor]);

    return (
        <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
            <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View style={styles.content}>
                    <View style={styles.topSection}>
                        <Title icon={IconSettings2}>Ustawienia</Title>
                    </View>
                    <View style={styles.options}>
                        <SettingsOption
                            label="Cena prądu"
                            description="Informacja ta pozwoli dokładnie obliczać Twoje oszczędności na prądzie."
                        />
                        <SettingsOption
                            label="Zmień Agin Hub"
                            description="To urządzenie zostanie rozłączone z Agin Hub"
                            theme="danger"
                            onPress={async () => {
                                await SecureStore.deleteItemAsync('server');
                                navigator.reset({
                                    index: 0,
                                    routes: [
                                        { name: 'Onboarding' },
                                        { name: 'SetupConnect' },
                                    ],
                                });
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
