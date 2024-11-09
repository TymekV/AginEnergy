import { useColors } from '@lib/hooks';
import { Icon } from '@tabler/icons-react-native';
import { forwardRef, useMemo } from 'react';
import { Platform, StyleSheet, Text, TextInput, TextInputProps, TouchableWithoutFeedback, View } from 'react-native';

export interface InputProps extends TextInputProps {
    icon?: Icon,
    noIcon?: boolean,
    withBg?: boolean,
    label?: string,
}

export const Input = forwardRef<TextInput, InputProps>((props, ref) => {
    const { icon: Icon, noIcon, withBg, label, placeholder, style, onPress, ...other } = (props || {});
    const { backgroundColor, borderColor, textColors } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        inputContainer: {
            width: '100%',
            height: 60,
            paddingHorizontal: 20,
            borderWidth: 1.5,
            borderColor: borderColor,
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
        },
        input: {
            fontFamily: 'Poppins-Medium',
            fontSize: 15,
            color: textColors[0],
            flex: 1,
            height: '100%',
        },
        label: {
            fontFamily: 'Poppins-Medium',
            color: textColors[0],
            fontSize: 15,
            marginLeft: 12,
            marginBottom: 5,
        }
    }), [borderColor, textColors]);

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
                        {...other}
                    />
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
});

