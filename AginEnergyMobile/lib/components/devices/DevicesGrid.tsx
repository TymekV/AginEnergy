import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import { Title } from "../Title";
import { DeviceTile } from "./DeviceTile";
import { useContext, useEffect } from "react";
import { DevicesContext, DevicesContextType } from "@lib/providers/DevicesProvider";

export default function DevicesGrid() {
  const [devices, setDevices]: any = useContext<DevicesContextType | undefined>(DevicesContext);

  // const data = [
  //   { id: "1", label: "Telewizor" },
  //   { id: "2", label: "Odkurzacz" },
  //   { id: "3", label: "Mikrofala" },
  //   { id: "4", label: "Reaktor jądrowy" },
  //   { id: "5", label: "Rower elektryczny" },
  // ];

  // function setPower(i: number, value: boolean) {
  //   setDevices((d) => [...d, d[i].power = value]);
  // }


  return (
    <View>
      <Title order={2}>Moje urządzenia:</Title>
      <FlatList
        data={devices}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <DeviceTile margin={index % 2 == 0 ? { right: 5 } : { left: 5 }} setPower={() => setDevices((d: [{ power: boolean }]) => { const newArr = [...d]; newArr[index].power = !item?.power; return newArr; })} power={item?.power} small name={item.label} activeSince={454} />
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
