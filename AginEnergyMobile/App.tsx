import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Onboarding } from '@lib/navigators';
import DevicesProvider from '@lib/providers/DevicesProvider';
import ServerProvider from '@lib/providers/ServerProvider';
import SocketProvider from '@lib/providers/SocketProvider';
import { SheetProvider } from 'react-native-actions-sheet';
import * as NavigationBar from 'expo-navigation-bar';
import '@lib/sheets';
import { Platform } from 'react-native';
import { usePush } from '@lib/hooks/usePush';

// TODO: Add dark mode support
if (Platform.OS == 'android') {
    NavigationBar.setBackgroundColorAsync('#FFFFFF');
    NavigationBar.setButtonStyleAsync('dark');
}

export default function App() {
    usePush();

    return (
        <>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <StatusBar style="auto" />
                <NavigationContainer>
                    <ServerProvider>
                        <SheetProvider>
                            <DevicesProvider>
                                <SocketProvider>
                                    <Onboarding />
                                </SocketProvider>
                            </DevicesProvider>
                        </SheetProvider>
                    </ServerProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </>
    );
}

