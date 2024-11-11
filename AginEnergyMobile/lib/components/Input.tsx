import { useColors } from '@lib/hooks';
import { Icon } from '@tabler/icons-react-native';
import { forwardRef, useMemo, useState } from 'react';
import { NativeSyntheticEvent, Platform, StyleSheet, Text, TextInput, TextInputFocusEventData, TextInputProps, TextStyle, TouchableWithoutFeedback, View } from 'react-native';

export interface InputProps extends TextInputProps {
    icon?: Icon,
    noIcon?: boolean,
    withBg?: boolean,
    label?: string,
    inputStyle?: TextStyle,
    containerStyle?: TextStyle,
    compact?: boolean,
}

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
    const { icon: Icon, noIcon, withBg, label, placeholder, style, onPress, inputStyle, onFocus, onBlur, compact, containerStyle, ...other } = (props || {});
    const { backgroundColor, borderColor, textColors, colors } = useColors();

    const [isFocused, setIsFocused] = useState(false);

    const styles = useMemo(() => StyleSheet.create({
        inputContainer: {
            width: compact ? 45 : '100%',
            height: 60,
            paddingHorizontal: compact ? 0 : 20,
            borderWidth: 1.5,
            borderColor: isFocused ? colors[7] : borderColor,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            ...(compact && {
                flexDirection: 'row',
                justifyContent: 'center',
            }),
            ...containerStyle,
        },
        input: {
            fontFamily: 'Poppins-Medium',
            fontSize: compact ? 20 : 15,
            color: textColors[0],
            flex: 1,
            height: '100%',
            ...(compact && {
                textAlign: 'center',
            }),
            ...inputStyle,
        },
        label: {
            fontFamily: 'Poppins-Medium',
            color: textColors[0],
            fontSize: 15,
            marginLeft: 12,
            marginBottom: 5,
        }
    }), [borderColor, textColors, inputStyle, colors, isFocused]);

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    return (
        <View style={style}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={[styles.inputContainer, , withBg ? { backgroundColor: backgroundColor } : {}]}>
                    {Icon && <Icon />}
                    <TextInput
                        placeholder={placeholder ?? ''}
                        placeholderTextColor={textColors[1]}
                        style={styles.input}
                        ref={ref}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...other}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
});

