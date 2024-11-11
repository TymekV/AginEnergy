import { Button, Input, SetupPageContent, SheetContainer } from '@lib/components';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconPencil } from '@tabler/icons-react-native';
import { useCallback, useContext, useState, } from 'react';
import { Alert, StyleSheet, } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet'
import { PlugContext } from '..';
import useApi from '@lib/hooks/useApi';
import { DevicesContext } from '@lib/providers/DevicesProvider';

export const SetName = ({ router }: RouteScreenProps<'addPlug', 'setName'>) => {
    const [plugData, setPlugData] = useContext(PlugContext);

    const [saving, setSaving] = useState(false);

    const api = useApi();
    const { refreshDevices } = useContext(DevicesContext);

    const savePlug = useCallback(async () => {
        if (!api) return;
        setSaving(true);

        try {
            await api?.post('/plugs', {
                id: `aginplug_${plugData.serialNumber}`,
                label: plugData.name,
            });

            await refreshDevices();

            router.close();
        } catch (error) {
            Alert.alert('Nie udało się dodać wtyczki', error as string);
            setSaving(false);
        }
    }, [api, plugData.serialNumber, plugData.name]);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconPencil}
                title='Ustaw nazwę'
                description='Wprowadź nazwę dla Agin Plug, aby łatwiej go rozpoznać w aplikacji.'
            >
                <Input placeholder="Wproawdź nazwę..." value={plugData.name} onChangeText={(p) => setPlugData(d => ({ ...d, name: p }))} autoFocus />
            </SetupPageContent>
            <SheetBottomActions>
                <Button disabled={plugData.name.length == 0 || saving} onPress={savePlug}>Dalej</Button>
            </SheetBottomActions>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 15,
    }
});