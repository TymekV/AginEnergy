import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeTabs } from "./HomeTabs";
import { ProductOnboarding } from "@screns/onboarding";
import { SetupConnect, SetupPrice } from "@screns/onboarding/setup";
import { useServer } from "@lib/hooks";

export type OnboardingParams = {
  Onboarding: undefined;
  Main: undefined;
  SetupConnect: undefined;
  SetupPrice: undefined;
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

      {/* Setup */}
      <Stack.Screen name="SetupConnect" component={SetupConnect} />
      <Stack.Screen name="SetupPrice" component={SetupPrice} />
    </Stack.Navigator>
  );
}
