import { Keyboard, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { SheetManager, FlatList } from 'react-native-actions-sheet';
import { Key, useState } from 'react';
import SheetInlineAction from './sheetComponents/SheetInlineAction';
import { useColors } from '@lib/hooks';


function SelectSheet(props: SheetProps<'selectSheet'>) {
    const [localSelected, setLocalSelected] = useState(props?.payload?.selected);
    const { sheetBackgroundColor, sheetIndicatorColor } = useColors();
    return (
        <ActionSheet
            containerStyle={{
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                backgroundColor: sheetBackgroundColor,
            }}
            indicatorStyle={{
                width: 50,
                height: 5,
                borderRadius: 5,
                backgroundColor: sheetIndicatorColor,
                marginTop: 10,
            }}
            gestureEnabled={true}
        >
            <View style={styles.container}>
                <FlatList
                    data={props?.payload?.data}
                    renderItem={({ item, index }) => (
                        <SheetInlineAction label={item?.label} icon={item?.icon} selected={item?.key == localSelected} onPress={() => {
                            Keyboard.dismiss();
                            if (typeof props?.payload?.setSelected == 'function') props?.payload?.setSelected(item.key);
                            setLocalSelected(item?.key);
                            SheetManager.hide(props?.sheetId, {
                                payload: item?.key
                            });
                        }} />
                    )}
                    keyExtractor={(item, i) => item?.key}
                    keyboardShouldPersistTaps="always"
                />
            </View>
        </ActionSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 5,
        paddingBottom: Platform.OS == 'ios' ? 0 : 15,
    }
});

export default SelectSheet;