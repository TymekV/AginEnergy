import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import AddPlug from './AddPlug';
import SelectSheet from './SelectSheet';
import { Icon } from '@tabler/icons-react-native';
import { Dispatch, Key, SetStateAction } from 'react';

registerSheet('addPlug', AddPlug);
registerSheet('selectSheet', SelectSheet)

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
    interface Sheets {
        'addPlug': SheetDefinition;
        'selectSheet': SheetDefinition<{
            payload: {
                data: {
                    label: string;
                    key: string;
                    onPress?: () => void;
                    icon?: Icon;
                }[],
                setSelected?: Dispatch<SetStateAction<string>>;
                selected?: string,
            }
        }>;
    }
}

export { };