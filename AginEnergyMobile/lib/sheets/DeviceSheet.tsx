import { Platform, StyleSheet } from 'react-native';
import { SheetManager, SheetProps } from 'react-native-actions-sheet';
import SheetInlineAction from './sheetComponents/SheetInlineAction';
import { SheetContainer, StyledActionSheet } from '@lib/components';
import { IconPalette, IconTrash } from '@tabler/icons-react-native';
import { useCallback } from 'react';
import useApi from '@lib/hooks/useApi';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { OnboardingParams } from '@lib/navigators';

function DeviceSheet({ sheetId, payload }: SheetProps<'device'>) {
    const api = useApi();

    const navigator = useNavigation<NavigationProp<OnboardingParams>>();

    const setCurrentColor = useCallback(async () => {
        const newColor = await SheetManager.show('colorPicker', { payload: { initial: { r: 255, g: 0, b: 0 } } });
        if (!newColor) return;

        SheetManager.hide(sheetId);
        await api?.patch(`/plugs/${payload?.id}/color`, {
            on: true,
            ...newColor,
        });
    }, [payload?.id, api]);

    const removePlug = useCallback(async () => {
        SheetManager.hide(sheetId);
        await api?.delete(`/plugs/${payload?.id}`);
        navigator.goBack();
    }, [payload?.id, api]);

    return (
        <StyledActionSheet
            gestureEnabled={true}
        >
            <SheetContainer>
                <SheetInlineAction
                    icon={IconPalette}
                    label="Ustaw kolor"
                    onPress={setCurrentColor}
                />
                <SheetInlineAction
                    icon={IconTrash}
                    label="Usuń wtyczkę"
                    destructive
                    onPress={removePlug}
                />
            </SheetContainer>
        </StyledActionSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        paddingTop: 5,
        paddingBottom: Platform.OS == 'ios' ? 0 : 15,
    }
});

export default DeviceSheet;