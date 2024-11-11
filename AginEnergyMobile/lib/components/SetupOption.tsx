import { useColors } from "@lib/hooks";
import { useMemo } from "react";
import { StyleSheet, TouchableHighlight, TouchableHighlightProps, View } from "react-native";
import { Title } from "./Title";
import { Icon } from "@tabler/icons-react-native";
import { ThemeIcon } from "./ThemeIcon";

export interface SetupOptionProps extends TouchableHighlightProps {
    label: string,
    icon?: Icon,
    rightSection?: React.ReactNode,
}

export function SetupOption({ label, icon, rightSection, ...props }: SetupOptionProps) {
    const { setupOptionColor } = useColors();

    const styles = useMemo(() => StyleSheet.create({
        option: {
            borderRadius: 10,
            backgroundColor: setupOptionColor,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            ...(icon && {
                paddingVertical: 12,
                paddingLeft: 12,
            })
        },
        optionLeft: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
        touchable: {
            borderRadius: 10,
        }
    }), [setupOptionColor]);

    return (
        <TouchableHighlight style={styles.touchable} {...props}>
            <View style={styles.option}>
                <View style={styles.optionLeft}>
                    {icon && <ThemeIcon
                        icon={icon}
                    />}
                    <Title order={2}>{label}</Title>
                </View>
                <View style={styles.optionLeft}>
                    {rightSection}
                </View>
            </View>
        </TouchableHighlight>
    )
}