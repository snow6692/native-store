import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import React from "react";
// import { PRODUCTS } from "../../../assets/products";
import ProductListItem from "../../components/ProductListItem";
import ListHeader from "../../components/ListHeader";
import { getProductsAndCategories } from "../../api/api";

const Home = () => {
  const { data, error, isLoading } = getProductsAndCategories();
  if (isLoading) return <ActivityIndicator />;
  if (error || !data)
    return (
      <Text>Error fetching data {error?.message || "An error occurred"} </Text>
    );

  return (
    <View>
      <FlatList
        data={data.products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader categories={data.categories} />}
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
