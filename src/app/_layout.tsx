import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";

const RootLayout = () => {
  return (
    <ToastProvider>
      <Stack>
        <Stack.Screen
          name="(shop)"
          options={{
            headerShown: false,
            title: "Shop",
          }}
        />
        <Stack.Screen
          name="categories"
          options={{
            headerShown: false,
            title: "Categories",
          }}
        />
        <Stack.Screen
          name="product"
          options={{
            headerShown: false,
            title: "Product",
          }}
        />
        <Stack.Screen
          name="cart"
          options={{
            title: "Shopping Cart",
            presentation: "modal",
          }}
        />
        <Stack.Screen name="auth" options={{ headerShown: true }} />
      </Stack>
    </ToastProvider>
  );
};

export default RootLayout;
