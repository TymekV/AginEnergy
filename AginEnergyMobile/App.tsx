import { Platform, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from '@screns/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabItem from '@lib/bottomTabs/TabItem';
import TabText from '@lib/bottomTabs/TabText';
import { IconGraph, IconHome, IconLayoutGrid, IconList, IconSettings2 } from '@tabler/icons-react-native';
import { BlurView } from 'expo-blur';
import { useMemo } from 'react';
import { useColors } from '@lib/hooks';

const Tab = createBottomTabNavigator();

export default function App() {
    const { tileColor, borderColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        tabsBackground: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: tileColor,
            borderTopWidth: 1,
            borderTopColor: borderColor,
        },
    }), [tileColor, borderColor]);

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                headerShown: false,
                // tabBarLabelPosition: 'below-icon',
                tabBarStyle: {
                    position: 'absolute',
                    height: 90,
                    // borderTopWidth: 0,
                    borderTopWidth: 1,
                    borderTopColor: '#FFFFFF10',
                    paddingTop: 5,
                    paddingHorizontal: 4,
                    ...(Platform.OS != 'ios' ? {
                        paddingBottom: 15,
                    } : {}),
                },
                tabBarBackground: () => <View style={styles.tabsBackground}></View>,
            })}>
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarIcon: ({ focused, }) => <TabItem icon={IconHome} active={focused} />,
                    tabBarLabel: ({ focused }) => <TabText active={focused}>Home</TabText>,
                }} />
                <Tab.Screen name="Devices" component={Home} options={{
                    tabBarIcon: ({ focused, }) => <TabItem icon={IconLayoutGrid} active={focused} />,
                    tabBarLabel: ({ focused }) => <TabText active={focused}>Urządzenia</TabText>,
                }} />
                <Tab.Screen name="Stats" component={Home} options={{
                    tabBarIcon: ({ focused, }) => <TabItem icon={IconGraph} active={focused} />,
                    tabBarLabel: ({ focused }) => <TabText active={focused}>Statystyki</TabText>,
                }} />
                <Tab.Screen name="Settings" component={Home} options={{
                    tabBarIcon: ({ focused, }) => <TabItem icon={IconSettings2} active={focused} />,
                    tabBarLabel: ({ focused }) => <TabText active={focused}>Ustawienia</TabText>,
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

