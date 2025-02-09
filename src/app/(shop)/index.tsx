import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import { PRODUCTS } from "../../../assets/products";
import ProductListItem from "../../components/ProductListItem";
import ListHeader from "../../components/ListHeader";

const Home = () => {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.flatLIstColumn}
        style={{ paddingHorizontal: 10, paddingVertical: 5 }}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  flatListContent: {
    paddingBottom: 20,
  },
  flatLIstColumn: {
    justifyContent: "space-between",
  },
});
