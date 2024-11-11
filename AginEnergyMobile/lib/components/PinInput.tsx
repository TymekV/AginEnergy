import { Ref, RefObject, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Input, InputProps } from './Input';
import { Button } from './Button';

export type PinInputProps = {
    cellCount: number,
    value: string[],
    onChange: React.Dispatch<React.SetStateAction<string[]>>,
}

// FIXME: Bugs
export function PinInput({ cellCount, value, onChange }: PinInputProps) {
    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 10,
            height: 60
        }
    }), []);

    const inputRefs = useRef<any>([]);

    return (
        <View style={styles.container}>
            {new Array(cellCount).fill(0).map((_, i) => <Input
                autoFocus={i == 0}
                key={i}
                compact
                ref={(ref) => {
                    if (ref) {
                        inputRefs.current[i] = ref;
                    }
                }}
                value={value[i]}
                keyboardType='number-pad'
                maxLength={1}
                onChangeText={(newValue) => {
                    if (newValue.length == 1 && inputRefs.current[i + 1]) {
                        inputRefs.current[i + 1].focus();
                    }

                    onChange((v: string[]) => {
                        const newV = [...v];
                        newV[i] = newValue;
                        return newV;
                    });
                }}
                onKeyPress={({ nativeEvent }) => {
                    if (nativeEvent.key === 'Backspace') {
                        if (value[i].length == 0 && inputRefs.current[i - 1]) {
                            inputRefs.current[i - 1].focus();
                            onChange((v: string[]) => {
                                const newV = [...v];
                                newV[i - 1] = '';
                                return newV;
                            });
                        }
                    }
                }}
            />)}
        </View>
    )
}