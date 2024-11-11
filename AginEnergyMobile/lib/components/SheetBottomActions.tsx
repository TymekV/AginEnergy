import { StyleSheet, View, ViewProps } from "react-native";


export function SheetBottomActions({ children, style, ...props }: ViewProps) {
    return (
        <View style={[styles.actions, style]} {...props}>{children}</View>
    )
}

const styles = StyleSheet.create({
    actions: {
        position: 'absolute',
        left: 15,
        right: 15,
        bottom: 15,
        zIndex: 1,
    }
});