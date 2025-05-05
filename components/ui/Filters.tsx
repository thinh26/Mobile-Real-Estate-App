import { ScrollView, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants/data";
import Rubik from "../font/rubik";
import clsx from "clsx";

const Filters = () => {
  const params = useLocalSearchParams<{ filter?: string }>();
  const [selectedCategory, setSelectedCategory] = useState(
    params.filter || "All"
  );

  const handleCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
    >
      {categories.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategory(item.category)}
          className={clsx(
            "flex flex-col items-start mr-4 px-4 py-2 rounded-full",
            selectedCategory === item.category
              ? "bg-primary-300"
              : "bg-primary-100 border border-primary-200"
          )}
        >
          {selectedCategory === item.category ? (
            <Rubik.Bold className="text-sm text-white mt-0.5">
              {item.title}
            </Rubik.Bold>
          ) : (
            <Rubik className="text-sm text-black-300">{item.title}</Rubik>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Filters;
