import { Platform, StyleSheet, View } from "react-native";
import React from "react";

export type FloatingPosition = {
    left?: number,
    right?: number,
    top?: number,
    bottom?: number
};

export type FloatingProps = {
    position?: FloatingPosition,
    style?: any,
    children?: React.ReactNode,
}

export function Floating({ position, style, children }: FloatingProps) {
    return (
        <View style={[styles.floating, position ? {
            left: position?.left,
            right: position?.right,
            top: position?.top,
            bottom: position?.bottom,
        } : {
            right: 15,
            bottom: (Platform.OS != 'ios' ? 85 : 95) + 20,
        }, style]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    floating: {
        position: 'absolute',
        zIndex: 200
    }
});