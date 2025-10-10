import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { LoginScreen, OTPVerifyScreen, HomeScreen, SplashScreen } from "../screens";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Stack.Screen 
        name="SplashScreen" 
        component={SplashScreen}
      />

      <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen 
        name="OTPVerifyScreen" 
        component={OTPVerifyScreen}
        options={{
          title: "Verify OTP",
        }}
      />
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{
          title: "Home",
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;