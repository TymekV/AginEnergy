import { useColors } from '@lib/hooks';
import { Text } from 'react-native';


export default function TabText({ children, active, position, }) {
    const { colors } = useColors();
    return (
        <Text style={{ color: active ? colors[6] : '#A9A9A9', fontSize: 11, marginLeft: position == 'beside-icon' ? 40 : 0, }}>{children}</Text>
    )
}