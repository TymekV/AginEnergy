import { DefaultColor, useColors } from '@lib/hooks';
import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from './Title';

export type InlineUsageIndicatorProps = {
    label: string,
    value: string,
    description?: string,
    color: DefaultColor,
}

export function InlineUsageIndicator({ label, value, description, color }: InlineUsageIndicatorProps) {
    const { defaultColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 5,
        }
    }), []);

    return (
        <View style={styles.container}>
            <Title order={2}>{label}</Title>
            <View>
                <Title order={2} color={defaultColors[color][7]} fontFamily="Poppins-Bold">{value}</Title>
            </View>
        </View>
    )
}