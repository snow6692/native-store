import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
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
          headerShown: true,
          title: "Categories",
        }}
      />
      <Stack.Screen
        name="product"
        options={{
          headerShown: true,
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
  );
};

export default RootLayout;
