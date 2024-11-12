import { Dimensions, FlatList, Platform, StyleSheet, View } from "react-native";
import { Title } from "../Title";
import { DeviceTile } from "./DeviceTile";
import { useContext, useEffect } from "react";
import { DevicesContext, DevicesContextType, DevicesStateType } from "@lib/providers/DevicesProvider";
import { SocketContext } from "@lib/providers/SocketProvider";
import useApi from "@lib/hooks/useApi";

export default function DevicesGrid() {
  const { devices, setDevices } = useContext(DevicesContext);
  const api = useApi();


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
            <DeviceTile margin={index % 2 == 0 ? { right: 5 } : { left: 5 }} id={item?.id} setPower={() => { api?.patch(`/plugs/${item.id}`, { on: item?.on ? 'false' : 'true' }).catch((e) => console.log(e)); setDevices((d: DevicesStateType) => { const newArr = [...d]; newArr[index].on = !item?.on; return newArr; }) }} power={item?.on} small name={item.label} activeSince={454} />
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
