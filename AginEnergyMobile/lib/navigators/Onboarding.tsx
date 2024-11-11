import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeTabs } from "./HomeTabs";
import { ProductOnboarding } from "@screens/onboarding";
import { SetupConnect, SetupPrice } from "@screens/onboarding/setup";
import { useServer } from "@lib/hooks";
import DeviceDetails from "@screens/DeviceDetails";

export type OnboardingParams = {
  Onboarding: undefined;
  Main: undefined;
  SetupConnect: undefined;
  SetupPrice: undefined;
  DeviceDetails: { id: string };
};

const Stack = createNativeStackNavigator<OnboardingParams>();

export function Onboarding() {
  const { server } = useServer();
  let initial: keyof OnboardingParams = "Main";
  console.log(server);

  if (server != '') {
    initial = "Main"
  }

  return (
    <Stack.Navigator
      initialRouteName={"Main"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" options={{ animation: 'none' }} component={ProductOnboarding} />
      <Stack.Screen name="Main" component={HomeTabs} />
      <Stack.Screen name="DeviceDetails" component={DeviceDetails} />

      {/* Setup */}
      <Stack.Screen name="SetupConnect" component={SetupConnect} />
      <Stack.Screen name="SetupPrice" component={SetupPrice} />
    </Stack.Navigator>
  );
}
