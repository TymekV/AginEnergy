import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeTabs } from "./HomeTabs";
import { ProductOnboarding } from "@screns/onboarding";

export type OnboardingParams = {
  Onboarding: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<OnboardingParams>();

export function Onboarding() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={ProductOnboarding} />
      <Stack.Screen name="Main" component={HomeTabs} />
    </Stack.Navigator>
  );
}
