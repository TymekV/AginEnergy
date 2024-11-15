import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import AddPlug from './AddPlug';
import SelectSheet from './SelectSheet';
import { Icon } from '@tabler/icons-react-native';
import { Dispatch, Key, SetStateAction } from 'react';
import ColorPickerSheet from './ColorPicker';
import DeviceSheet from './DeviceSheet';

registerSheet('addPlug', AddPlug);
registerSheet('selectSheet', SelectSheet)
registerSheet('colorPicker', ColorPickerSheet)
registerSheet('device', DeviceSheet)

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
        'colorPicker': SheetDefinition<{
            payload: {
                initial?: {
                    r: number,
                    g: number,
                    b: number,
                }
            },
            returnValue?: {
                r: number,
                g: number,
                b: number,
            }
        }>;
        'device': SheetDefinition<{
            payload: {
                id: string,
            }
        }>
    }
}

export { };