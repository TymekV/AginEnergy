import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Onboarding } from '@lib/navigators';
import DevicesProvider from '@lib/providers/DevicesProvider';
import ServerProvider from '@lib/providers/ServerProvider';

export default function App() {
    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <DevicesProvider>
                    <NavigationContainer>
                        <ServerProvider>
                            <Onboarding />
                        </ServerProvider>
                    </NavigationContainer>
                </DevicesProvider>
            </GestureHandlerRootView>
        </>
    );
}

