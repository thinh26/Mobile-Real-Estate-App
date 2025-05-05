import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Models } from "react-native-appwrite";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Rubik from "../font/rubik";

interface Props {
  item?: Models.Document;
  onPress?: () => void;
}

const Card = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative"
    >
      <View className="px-2 flex flex-row items-center absolute top-5 right-5 bg-white/90 p-1 rounded-full z-50">
        <Image source={icons.star} className="size-2.5" />
        <Rubik.Bold className="text-xs text-primary-300 ml-0.5">4.4</Rubik.Bold>
      </View>
      <Image source={{ uri: item?.image }} className="w-full h-40 rounded-lg" />
      <View className="flex flex-col mt-2">
        <Rubik.Bold className="text-xl text-black-300">{item?.name}</Rubik.Bold>
        <Rubik className="text-base text-black-200">{item?.address}</Rubik>
        <View className="flex flex-row items-center justify-between mt-2">
          <Rubik.Bold className="text-base text-primary-300">
            ${item?.price}
          </Rubik.Bold>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191d31"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FeaturedCard = ({ item, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      <Image source={{ uri: item?.image }} className="size-full rounded-2xl" />
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Rubik.Bold className="text-xs text-primary-300 ml-1">
          {item?.rating}
        </Rubik.Bold>
      </View>
      <View className="flex flex-col items-start absolute bottom-5 inset-x-5">
        <Rubik.ExtraBold className="text-xl text-white" numberOfLines={1}>
          {item?.name}
        </Rubik.ExtraBold>
        <Rubik className="text-base text-white">{item?.address}</Rubik>
        <View className="flex flex-row items-center justify-between w-full">
          <Rubik.ExtraBold className="text-xl text-white">
            {`$${item?.price}`}
          </Rubik.ExtraBold>
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

Card.Featured = FeaturedCard;

export default Card;
