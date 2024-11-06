import { useColorScheme } from "react-native";

export function useColors() {
    const colorScheme = useColorScheme();
    // console.log({colorScheme})
    return (colorScheme == 'dark' ? darkColors : lightColors)
}

const defaultColors = {
    green: [
        "#e5feee",
        "#d2f9e0",
        "#a8f1c0",
        "#7aea9f",
        "#53e383",
        "#3bdf70",
        "#2bdd66",
        "#1ac455",
        "#0caf49",
        "#00963c"
    ],
    blue: [
        "#e5f4ff",
        "#cde2ff",
        "#9bc2ff",
        "#64a0ff",
        "#3984fe",
        "#1d72fe",
        "#0969ff",
        "#0058e4",
        "#004ecc",
        "#0043b5"
    ],
    purple: [
        "#f3edff",
        "#e0d7fa",
        "#beabf0",
        "#9a7ce6",
        "#7c56de",
        "#683dd9",
        "#5f2fd8",
        "#4f23c0",
        "#451eac",
        "#3a1899"
    ],
    red: [
        "#ffe9e9",
        "#ffd1d1",
        "#fba0a1",
        "#f76d6d",
        "#f34141",
        "#f22625",
        "#f21616",
        "#d8070b",
        "#c10008",
        "#a90003"
    ],
    orange: [
        "#fff4e2",
        "#ffe9cc",
        "#ffd09c",
        "#fdb766",
        "#fca13a",
        "#fb931d",
        "#fc8c0c",
        "#e17900",
        "#c86a00",
        "#ae5a00"
    ],
    pink: [
        "#ffebff",
        "#f5d5fc",
        "#e6a9f3",
        "#d779eb",
        "#cb51e4",
        "#c437e0",
        "#c029df",
        "#a91cc6",
        "#9715b1",
        "#840a9c"
    ],
}

export const darkColors = {
    apperance: 'dark',
    colors: ["#e5f4ff",
        "#cde2ff",
        "#9bc2ff",
        "#64a0ff",
        "#3984fe",
        "#1d72fe",
        "#0969ff",
        "#0058e4",
        "#004ecc",
        "#0043b5"],
    tileColor: "#121212",
    secondaryTileColor: '#242424',
    borderColor: '#ffffff10',
    backgroundColor: '#0D0D0D',
    textColors: ['#E9ECEF', '#FFFFFF80', '#FFFFFF60', 'yellow'],
    iconColors: ['#E9ECEF', '#898989', '#7A7A7A'],
    statusColors: {
        yellow: 'yellow',
        gray: 'gray',
        cyan: 'cyan',
        green: 'green',
        teal: 'teal',
        red: 'red',
    },
    subjectColors: [defaultColors.blue, defaultColors.green, defaultColors.purple, defaultColors.orange, defaultColors.pink, defaultColors.red],
    sheetBackgroundColor: '#121212',
    sheetIndicatorColor: '#1d1d1d',
    sheetActionBackgroundColor: '#1d1d1d',
    segmentedControlBackground: '#000000',
    switchTrackColor: '#ffffff',
    defaultColors

}

export const lightColors = {
    apperance: 'light',
    colors: ["#e5f4ff",
        "#cde2ff",
        "#9bc2ff",
        "#64a0ff",
        "#3984fe",
        "#1d72fe",
        "#0969ff",
        "#0058e4",
        "#1d6ef0",
        "#0043b5"],
    tileColor: "#ededed",
    secondaryTileColor: '#d0d0d0',
    borderColor: '#00000030',
    backgroundColor: '#ffffff',
    textColors: ['#000000', '#00000080', '#00000060', 'blue'],
    iconColors: ['#191C1F', '#393939', '#5A5A5A'],
    statusColors: {
        yellow: '#c5cc04',
        gray: 'gray',
        cyan: 'cyan',
        green: 'green',
        teal: 'teal',
        red: 'red',
    },
    subjectColors: [defaultColors.blue, defaultColors.green, defaultColors.purple, defaultColors.orange, defaultColors.pink, defaultColors.red],
    sheetBackgroundColor: '#ffffff',
    sheetIndicatorColor: '#1d1d1d',
    sheetActionBackgroundColor: '#dedfe0',
    segmentedControlBackground: '#dedfe0',
    switchTrackColor: '#000000',
    defaultColors
}
