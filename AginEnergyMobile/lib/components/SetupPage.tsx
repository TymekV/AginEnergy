import { useColors } from '@lib/hooks';
import { Icon } from '@tabler/icons-react-native';
import React, { useMemo } from 'react';
import { KeyboardAvoidingView, SafeAreaView, StyleSheet, View } from 'react-native';
import { AndroidSafeArea } from './SafeViewAndroid';
import { Title } from './Title';

export type SetupPageProps = {
    icon: Icon,
    title: string,
    description?: string,
    children?: React.ReactNode,
    actions?: React.ReactNode,
}

export function SetupPage({ icon: Icon, title, description, children, actions }: SetupPageProps) {
    const { textColors, setupBackgroundColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            padding: 25,
            paddingTop: 45,
            position: 'relative',
            flex: 1,
        },
        header: {
            alignItems: 'center',
            marginBottom: 25,
        },
        icon: {
            marginBottom: 25,
        },
        title: {
            marginBottom: 10,
        },
        main: {
            flex: 1,
            backgroundColor: setupBackgroundColor,
        },
        content: {
            flex: 1,
        },
        bottomActions: {
            position: 'absolute',
            left: 15,
            right: 15,
            bottom: 15,
            zIndex: 1,
        },
    }), [textColors]);

    return (
        <SafeAreaView style={[AndroidSafeArea.AndroidSafeArea, styles.main]}>
            <KeyboardAvoidingView style={styles.container} behavior='height'>
                <View style={styles.header}>
                    <Icon size={36} color={textColors[0]} style={styles.icon} />

                    <View style={styles.title}>
                        <Title textAlign='center' fontFamily='Poppins-SemiBold'>{title}</Title>
                    </View>

                    <Title textAlign='center' order={3} fontFamily='Poppins-Medium'>{description}</Title>
                </View>
                <View style={styles.content}>
                    {children}
                </View>
                {actions && <View style={styles.bottomActions}>
                    {actions}
                </View>}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}