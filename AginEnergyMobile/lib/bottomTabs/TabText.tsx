import { useColors } from '@lib/hooks';
import React from 'react';
import { Text } from 'react-native';


export type TabTextProps = {
    children: React.ReactNode,
    active: boolean,
    position?: string,
}

export default function TabText({ children, active, position, }: TabTextProps) {
    const { colors } = useColors();
    return (
        <Text style={{ color: active ? colors[8] : '#A9A9A9', fontSize: 10, marginLeft: position == 'beside-icon' ? 40 : 0, fontFamily: 'Poppins-Regular' }}>{children}</Text>
    )
}