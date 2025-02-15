import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { useCartStore } from "../store/cartStore";
import { supabase } from "../lib/supabase";
import { Tables } from "../types/database.types";
const ListHeader = ({ categories }: { categories: Tables<"category">[] }) => {
  const { getItemCount } = useCartStore();

  const handleSignout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View style={[styles.headerContainer]}>
      <View style={styles.headerTop}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: "https://placehold.co/400" }}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>Hello Ahmed</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Link style={styles.cartContainer} href={"/cart"} asChild>
            <Pressable>
              {({ pressed }) => (
                <View>
                  <FontAwesome
                    name="shopping-cart"
                    size={25}
                    color={"gray"}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                  <Text style={styles.badgeContainer}>{getItemCount()}</Text>
                </View>
              )}
            </Pressable>
          </Link>
          <TouchableOpacity
            onPress={handleSignout}
            style={styles.signOutButton}
          >
            <FontAwesome name="sign-out" size={25} color={"red"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.heroContainer}>
        <Image
          source={require("../../assets/images/hero.png")}
          style={styles.heroImage}
        />
      </View>
      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(category) => category.slug}
          renderItem={({ item }) => (
            <Link href={`categories/${item.slug}`} asChild>
              <Pressable style={styles.category}>
                <Image
                  source={{ uri: item.imageUrl }}
                  alt={item.name}
                  style={styles.categoryImage}
                />
                <Text style={styles.categoryText}> {item.name}</Text>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headerContainer: {
    gap: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  cartContainer: {
    padding: 10,
  },
  signOutButton: {
    padding: 10,
  },
  heroContainer: {
    width: "100%",
    height: 200,
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  categoriesContainer: {},
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    width: 100,
    alignItems: "center",
    marginBottom: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryText: {},
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: 8,
    backgroundColor: "#1BC464",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});
