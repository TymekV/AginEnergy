import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeTabs } from "./HomeTabs";
import { ProductOnboarding } from "@screns/onboarding";
import { SetupConnect, SetupPrice } from "@screns/onboarding/setup";

export type OnboardingParams = {
  Onboarding: undefined;
  Main: undefined;
  SetupConnect: undefined;
  SetupPrice: undefined;
};

const Stack = createNativeStackNavigator<OnboardingParams>();

export function Onboarding() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={ProductOnboarding} />
      <Stack.Screen name="Main" component={HomeTabs} />

      {/* Setup */}
      <Stack.Screen name="SetupConnect" component={SetupConnect} />
      <Stack.Screen name="SetupPrice" component={SetupPrice} />
    </Stack.Navigator>
  );
}
