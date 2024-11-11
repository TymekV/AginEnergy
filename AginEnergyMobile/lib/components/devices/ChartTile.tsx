import { ForwardRefExoticComponent, useState } from "react";
import { InlineUsageIndicator } from "../InlineUsageIndicator"
import { ThemeIcon } from "../ThemeIcon"
import { Tile } from "../Tile"
import { IconProps } from "@tabler/icons-react-native";
import { LineChart, LineChartPropsType, lineDataItem } from "react-native-gifted-charts";
import { useColors } from "@lib/hooks";

export type ChartTileProps = {
    icon: ForwardRefExoticComponent<IconProps>;
    chartDataArray: lineDataItem[];
    usageIndicatorValue: string;
    label: string;
}

export default function ChartTile({ icon: Icon, chartDataArray, usageIndicatorValue, label }: ChartTileProps) {
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
                <>
                    <ThemeIcon icon={Icon} />
                    <InlineUsageIndicator
                        color="orange"
                        label={label}
                        value={usageIndicatorValue}
                    />
                </>
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