import { FlatList, StyleSheet, View } from "react-native";
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <DeviceTile name={item.name} />
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
    alignItems: "center",
    justifyContent: "center",
  },
});
