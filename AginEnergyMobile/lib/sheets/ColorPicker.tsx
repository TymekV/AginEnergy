import { Keyboard, Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { SheetManager, FlatList } from 'react-native-actions-sheet';
import { Key, useState } from 'react';
import SheetInlineAction from './sheetComponents/SheetInlineAction';
import { useColors } from '@lib/hooks';
import { Button, SheetContainer, StyledActionSheet } from '@lib/components';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import type { returnedResults } from 'reanimated-color-picker';
import ColorPicker, { HueSlider, LuminanceCircular, OpacitySlider, Panel1, Panel3, PreviewText, Swatches, colorKit } from 'reanimated-color-picker';


function ColorPickerSheet({ payload, sheetId }: SheetProps<'colorPicker'>) {
    const selectedColor = useSharedValue(payload?.initial ? colorKit.HEX(payload?.initial) : '#ffffff');

    const onColorSelect = (color: returnedResults) => {
        'worklet';
        selectedColor.value = color.hex;
    };

    const onDone = () => {
        const color = colorKit.RGB(selectedColor.value).object();
        SheetManager.hide(sheetId, {
            payload: color,
        });
    }

    return (
        <StyledActionSheet
            gestureEnabled={false}
            enableRouterBackNavigation={true}
        >
            <SheetContainer style={styles.container}>
                <ColorPicker
                    value={selectedColor.value}
                    sliderThickness={25}
                    thumbSize={24}
                    thumbShape='circle'
                    onChange={onColorSelect}
                    boundedThumb
                    style={styles.picker}
                >
                    <Panel1 style={styles.panelStyle} />
                    <HueSlider style={styles.sliderStyle} />
                    {/* <OpacitySlider style={styles.sliderStyle} /> */}
                </ColorPicker>
                <Button onPress={onDone}>OK</Button>
            </SheetContainer>
        </StyledActionSheet>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
    },
    panelStyle: {
        borderRadius: 16,
    },
    sliderStyle: {
        borderRadius: 20,
        marginTop: 20,
    },
    picker: {
        marginBottom: 20,
    }
});



export default ColorPickerSheet;