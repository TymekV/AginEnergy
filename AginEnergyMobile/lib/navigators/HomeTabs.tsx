import TabItem from '@lib/bottomTabs/TabItem';
import TabText from '@lib/bottomTabs/TabText';
import { useColors } from '@lib/hooks';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Devices from '@screns/Devices';
import Home from '@screns/Home';
import { IconGraph, IconHome, IconLayoutGrid, IconSettings2 } from '@tabler/icons-react-native';
import { useMemo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

export function HomeTabs() {
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
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            // tabBarLabelPosition: 'below-icon',
            tabBarStyle: {
                position: 'absolute',
                height: Platform.OS == 'ios' ? 90 : 80,
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
            <Tab.Screen name="Devices" component={Devices} options={{
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
    )
}