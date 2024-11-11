import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import AddPlug from './AddPlug';

registerSheet('addPlug', AddPlug);

// We extend some of the types here to give us great intellisense
// across the app for all registered sheets.
declare module 'react-native-actions-sheet' {
    interface Sheets {
        'addPlug': SheetDefinition;
    }
}

export { };