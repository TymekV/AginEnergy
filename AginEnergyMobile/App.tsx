import { Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@screns/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabItem from '@lib/bottomTabs/TabItem';
import TabText from '@lib/bottomTabs/TabText';
import { IconGraph, IconHome, IconLayoutGrid, IconList, IconSettings2 } from '@tabler/icons-react-native';
import { useMemo } from 'react';
import { useColors } from '@lib/hooks';
import { StatusBar } from 'expo-status-bar';
import Devices from '@screns/Devices';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboarding } from '@lib/navigators';
import DevicesProvider from '@lib/providers/DevicesProvider';

export default function App() {


    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <DevicesProvider>
                    <NavigationContainer>
                        <Onboarding />
                    </NavigationContainer>
                </DevicesProvider>
            </GestureHandlerRootView>
        </>
    );
}

