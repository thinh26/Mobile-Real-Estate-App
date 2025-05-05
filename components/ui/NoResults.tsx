import { View, Text, Image } from "react-native";
import React from "react";
import images from "@/constants/images";
import Rubik from "../font/rubik";

const NoResults = () => {
  return (
    <View className="flex items-center my-5">
      <Image
        source={images.noResult}
        className="w-11/12 h-80"
        resizeMode="contain"
      />
      <Rubik.Bold className="text-2xl text-black-300 mt-5">
        No Results
      </Rubik.Bold>
      <Rubik className="text-base text-black-100 mt-2">
        We could not found any results
      </Rubik>
    </View>
  );
};

export default NoResults;
