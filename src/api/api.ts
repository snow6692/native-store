import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/auth-providers";

//All products and categories for home screen
export const getProductsAndCategories = () => {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        supabase.from("product").select("*"),
        supabase.from("category").select("*"),
      ]);

      if (products.error || categories.error) {
        throw new Error("An error occurred while fetching data");
      }

      return { products: products.data, categories: categories.data };
    },
  });
};

// Product page
export const useGetProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        throw new Error(
          "An error occurred while fetching data: " + error?.message
        );
      }

      return data;
    },
  });
};

// category and his own products
export const getCategoryAndProducts = (categorySlug: string) => {
  return useQuery({
    queryKey: ["categoryAndProducts", categorySlug],
    queryFn: async () => {
      const { data: category, error: categoryError } = await (await supabase)
        .from("category")
        .select("*")
        .eq("slug", categorySlug)
        .single();

      if (categoryError || !category) {
        throw new Error("An error occurred while fetching category data");
      }

      const { data: products, error: productsError } = await (await supabase)
        .from("product")
        .select("*")
        .eq("category", category.id);

      if (productsError) {
        throw new Error("An error occurred while fetching products data");
      }

      return { category, products };
    },
  });
};

export const getMyOrders = () => {
  const {
    user: { id },
  } = useAuth();
  return useQuery({
    queryKey: ["orders", id],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("order")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user", id);
      if (error)
        throw new Error(
          "An error occurred while fetching orders " + error.message
        );

      return data;
    },
  });
};
