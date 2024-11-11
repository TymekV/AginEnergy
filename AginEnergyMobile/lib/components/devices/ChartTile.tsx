import { Dispatch, SetStateAction, useState } from "react";
import { InlineUsageIndicator } from "../InlineUsageIndicator"
import { ThemeIcon } from "../ThemeIcon"
import { Tile } from "../Tile"
import { Icon, IconChevronDown } from "@tabler/icons-react-native";
import { LineChart, LineChartPropsType, lineDataItem } from "react-native-gifted-charts";
import { useColors } from "@lib/hooks";
import { View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export type ChartTileProps = {
    icon: Icon;
    chartDataArray: lineDataItem[];
    usageIndicatorValue: string;
    label: string;
    chartDataType?: string;
    setChartDataType?: Dispatch<SetStateAction<string>>;
}

export default function ChartTile({ icon: Icon, chartDataArray, usageIndicatorValue, label, chartDataType, setChartDataType }: ChartTileProps) {
    const [width, setWidth] = useState(100);
    const { colors, textColors } = useColors();
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
                areaChart
                spacing={(width - 45) / (chartDataArray?.length - 1) != Infinity && (width - 45) / (chartDataArray?.length - 1) > 0 ? (width - 45) / (chartDataArray?.length - 1) : 0}
                // width={width - 60}
                // rulesLength={width - 10}
                initialSpacing={0}
                endSpacing={0}
                color={colors[6]}
                startFillColor={colors[4]}
                yAxisThickness={0}
                xAxisThickness={0}
                xAxisLabelTextStyle={{
                    color: textColors[2],
                }}
                disableScroll

                dataPointsColor={colors[4]}
            />
        </Tile>
    )
}