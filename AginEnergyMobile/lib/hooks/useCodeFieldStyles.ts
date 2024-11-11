import { useMemo } from 'react';
import { useColors } from './useColors';
import { StyleSheet } from 'react-native';

export function useCodeFieldStyles() {
    // const { } = useColors();
    const styles = useMemo(() => StyleSheet.create({
        root: { padding: 20, minHeight: 300 },
        title: { textAlign: 'center', fontSize: 30 },
        codeFiledRoot: { marginTop: 20 },
        cell: {
            width: 40,
            height: 40,
            lineHeight: 38,
            fontSize: 24,
            borderWidth: 2,
            borderColor: '#00000030',
            textAlign: 'center',
        },
        focusCell: {
            borderColor: '#000',
        },
    }), []);

    return styles;
}