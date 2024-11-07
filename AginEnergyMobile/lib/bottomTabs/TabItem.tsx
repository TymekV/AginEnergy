import { useColors } from '@lib/hooks';
import { StyleSheet, View } from 'react-native';
import { TablerIcon } from 'tabler-icons-react-native';


export type TabItemProps = {
    icon: TablerIcon,
    active?: boolean,
}

export default function TabItem({ icon: Icon, active } : TabItemProps) {
    const { colors } = useColors();
    return (
        <View style={[styles.tabItem, { backgroundColor: active ? colors[1] : undefined }]}>
            <Icon color={active ? colors[6] : '#A9A9A9'} size={18} />
        </View>
    )
}

const styles = StyleSheet.create({
    tabItem: {
        width: 57,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 34,
    }
});