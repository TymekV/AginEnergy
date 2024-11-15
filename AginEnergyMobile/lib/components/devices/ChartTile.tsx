import { Dispatch, SetStateAction, useState } from "react";
import { InlineUsageIndicator } from "../InlineUsageIndicator"
import { ThemeIcon } from "../ThemeIcon"
import { Tile } from "../Tile"
import { Icon, IconCalendar, IconChevronDown, IconLayoutGrid } from "@tabler/icons-react-native";
import { LineChart, LineChartPropsType, lineDataItem } from "react-native-gifted-charts";
import { useColors } from "@lib/hooks";
import { StyleSheet, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export type ChartTileProps = {
    icon: Icon;
    chartDataArray: lineDataItem[];
    chartDataArray2?: lineDataItem[];
    usageIndicatorValue?: string;
    label: string;
    chartDataType?: string;
    legend?: { color: string, legend: string, backgroundColor: string, value?: string }[];
    setChartDataType?: Dispatch<SetStateAction<string>>;
}

export default function ChartTile({ icon: Icon, chartDataArray, usageIndicatorValue, label, chartDataType, setChartDataType, chartDataArray2, legend }: ChartTileProps) {
    const [width, setWidth] = useState(100);
    const { colors, textColors, defaultColors } = useColors();
    const [maxTextWidth, setMaxTextWidth] = useState<number[]>([]);
    return (
        <Tile
            withHeader
            onLayout={(o) => {
                console.log(o.nativeEvent.layout.width);
                setWidth(o.nativeEvent.layout.width)
            }}
            headerLabel={
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 10, }}>
                        <ThemeIcon icon={Icon} />
                        <InlineUsageIndicator
                            color="orange"
                            label={label}
                            value={usageIndicatorValue}
                        />
                    </View>
                    {chartDataType && <ThemeIcon icon={IconChevronDown} onPress={() => {
                        SheetManager.show('selectSheet', {
                            payload: {
                                data: [{
                                    label: 'Napięcie',
                                    key: 'voltage'
                                }, {
                                    label: 'Natężenie',
                                    key: 'current'
                                }, {
                                    label: 'Moc',
                                    key: 'power'
                                }, {
                                    label: 'Temperatura',
                                    key: 'temperature'
                                }
                                ],
                                selected: chartDataType,
                                setSelected: setChartDataType,
                            }
                        })
                    }} />}
                </View>
            }
        >
            <LineChart
                data={chartDataArray}
                areaChart={chartDataArray2 ? false : true}
                data2={chartDataArray2}
                spacing={(width - 45) / (chartDataArray?.length - 1) != Infinity && (width - 45) / (chartDataArray?.length - 1) > 0 ? (width - 45) / (chartDataArray?.length - 1) : 0}
                // width={width - 60}
                // rulesLength={width - 10}
                initialSpacing={0}
                endSpacing={0}
                color2={defaultColors.blue[6]}
                color={colors[6]}
                startFillColor={colors[4]}
                startFillColor2={defaultColors.blue[4]}
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisLabelTextStyle={{
                    color: textColors[2],
                }}
                disableScroll

                dataPointsColor={colors[4]}
                dataPointsColor2={defaultColors.blue[4]}
            />
            {legend && <View style={styles.legend}>
                {legend.map((l, i) =>
                    <Tile
                        withHeader
                        background={l.backgroundColor}
                        headerLabel={
                            <>
                                <ThemeIcon icon={IconCalendar} stirngColor={l.color} />
                                <InlineUsageIndicator
                                    stringColor={l.color}
                                    label={l.legend}
                                    value={l.value}
                                />
                            </>
                        }
                    />
                )}
            </View>}
        </Tile >
    )
}

const styles = StyleSheet.create({
    legend: { padding: 15, paddingTop: 0, width: '100%', paddingBottom: 10, display: 'flex', flexDirection: 'column', gap: 10, }

})