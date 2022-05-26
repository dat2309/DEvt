import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Button, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { LogBox, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import DrawerContent from "./src/components/Navigator/DrawerContent";
import TabNavigator from "./src/components/Navigator/TabNavigator";
import UserStack from "./src/components/Navigator/UserStack";

const theme = {
  ...DefaultTheme,
  color: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const Logout = () => {
  const handleLogout = () => {
    console.log("logout");
  };
  return <Button onPress={handleLogout}>Logout</Button>;
};

export default function App() {
  const [loginVisible, setLoginVisible] = useState(false);

  const getUserInStorage = async () => {
    const user = await AsyncStorage.getItem("user");
    if (user) {
      setLoginVisible(true);
    }
  };

  useEffect(() => {
    getUserInStorage();
  }, [loginVisible]);

  const Drawer = createDrawerNavigator();

  let [fontsLoaded] = useFonts({
    "CarmenSans-Thin": require("./assets/fonts/CarmenSans-Thin.otf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    "NativeBase:",
    "Warning: Each child in a list should have a unique",
  ]);
  const UserComponentStack = (props) => {
    return <UserStack handleUserLogin={handleUserLogin} {...props} />;
  };
  const handleUserLogin = (value) => {
    setLoginVisible(value);
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={theme}>
        {loginVisible ? (
          <Drawer.Navigator
            useLegacyImplementation={true}
            screenOptions={{
              headerShown: false,
            }}
            drawerContent={(props) => (
              <DrawerContent
                setLoginVisible={setLoginVisible}
                {...props}
              />
            )}
          >
            <Drawer.Screen
              name="Home Page"
              component={TabNavigator}
            />
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator
            useLegacyImplementation={true}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Drawer.Screen
              name="Go Home"
              component={TabNavigator}
            />
            <Drawer.Screen
              name="Login"
              component={UserComponentStack}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
