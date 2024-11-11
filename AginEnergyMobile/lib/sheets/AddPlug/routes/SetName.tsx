import { Button, Input, SetupPageContent, SheetContainer } from '@lib/components';
import { SheetBottomActions } from '@lib/components/SheetBottomActions';
import { IconPencil } from '@tabler/icons-react-native';
import axios from 'axios';
import { useContext, } from 'react';
import { StyleSheet, } from 'react-native';
import { RouteScreenProps, } from 'react-native-actions-sheet'
import { PlugContext } from '..';

export const SetName = ({ router }: RouteScreenProps<'addPlug', 'setName'>) => {
    const [plugData, setPlugData] = useContext(PlugContext);

    return (
        <SheetContainer style={{ paddingTop: 35, position: 'relative', height: '100%' }}>
            <SetupPageContent
                icon={IconPencil}
                title='Ustaw nazwę'
                description='Wprowadź nazwę dla Agin Plug, aby łatwiej go rozpoznać w aplikacji.'
            >
                <Input placeholder="Wproawdź nazwę..." value={plugData.name} onChangeText={(p) => setPlugData(d => ({ ...d, name: p }))} secureTextEntry />
            </SetupPageContent>
            <SheetBottomActions>
                <Button disabled={plugData.name.length != 0}>Dalej</Button>
            </SheetBottomActions>
        </SheetContainer>
    )
}

const styles = StyleSheet.create({
    loading: {
        marginBottom: 15,
    }
});