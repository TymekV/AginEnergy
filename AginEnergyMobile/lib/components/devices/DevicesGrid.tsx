import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import { Title } from "../Title";
import { DeviceTile } from "./DeviceTile";

export default function DevicesGrid() {
  const data = [
    { id: "1", name: "Telewizor" },
    { id: "2", name: "Odkurzacz" },
    { id: "3", name: "Mikrofala" },
    { id: "4", name: "Reaktor jądrowy" },
    { id: "5", name: "Rower elektryczny" },
  ];

  return (
    <View>
      <Title order={2}>Moje urządzenia:</Title>
      <FlatList
        data={data}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <DeviceTile margin={index % 2 == 0 ? { right: 5 } : { left: 5 }} small name={item.name} activeSince={454} />
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flex: 1,
    // margin: 10,
    // width: (Dimensions.get('window').width - 600) / 2,
    height: (Dimensions.get('window').width - 100) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    width: 5,
    height: 10,
  },
  list: {
    marginTop: 10,
  }
});
