import { Button, Input, Loading, SetupOption, SetupPageContent, SheetContainer } from '@lib/components';
import { PinInput } from '@lib/components/PinInput';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { useColors } from '@lib/hooks';
import { IconKey, IconLock, IconPencil, IconPlug, IconWifi, IconWifi0, IconWifi1, IconWifi2 } from '@tabler/icons-react-native';
import axios from 'axios';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { FlatList, RouteScreenProps, } from 'react-native-actions-sheet'
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
                id: `aginplug_${plugData.serialNumber}.local`,
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