import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getPropertyById } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import images from "@/constants/images";
import icons from "@/constants/icons";
import Rubik from "@/components/font/rubik";

const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: getPropertyById,
    params: {
      id: id ?? "",
    },
  });

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 bg-white"
      >
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={{ uri: property?.image }}
            className="size-full"
            resizeMode="cover"
          />
          <Image
            source={images.cardGradient}
            className="absolute top-0 w-full z-40"
          />
          <View
            className="z-50 absolute inset-x-7"
            style={{ top: Platform.OS === "android" ? 20 : 70 }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-white rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <View className="flex flex-row items-center gap-3">
                <Image source={icons.heart} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        <View className="px-5 mt-7 flex gap-2">
          <Rubik.ExtraBold className="text-2xl">
            {property?.name}
          </Rubik.ExtraBold>
          <View className="flex flex-row items-center gap-3">
            <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
              <Rubik.Bold className="text-xs text-primary-300">
                {property?.type}
              </Rubik.Bold>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Image source={icons.star} className="size-5" />
              <Rubik.Medium>
                {property?.rating} ({property?.reviews?.length} reviews)
              </Rubik.Medium>
            </View>
          </View>

          <View className="flex flex-row items-center mt-5 gap-7">
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                <Image source={icons.bed} className="size-4" />
              </View>
              <Rubik.Medium>{property?.bedrooms} Beds</Rubik.Medium>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                <Image source={icons.bath} className="size-4" />
              </View>
              <Rubik.Medium>{property?.bathrooms} Baths</Rubik.Medium>
            </View>
            <View className="flex flex-row items-center gap-2">
              <View className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10">
                <Image source={icons.area} className="size-4" />
              </View>
              <Rubik.Medium>{property?.area} sqft</Rubik.Medium>
            </View>
          </View>

          <View className="w-full border-t border-primary-200 pt-7 mt-5">
            <Rubik.Bold className="text-black-300 text-xl">Agent</Rubik.Bold>

            <View className="flex flex-row items-center justify-between mt-4">
              <View className="flex flex-row items-center gap-3">
                <Image
                  source={{ uri: property?.agent.avatar }}
                  className="size-14 rounded-full"
                />

                <View className="flex flex-col items-start justify-center">
                  <Rubik.Bold>{property?.agent.name}</Rubik.Bold>
                  <Rubik.Medium>{property?.agent.email}</Rubik.Medium>
                </View>
              </View>

              <View className="flex flex-row items-center gap-3">
                <Image source={icons.chat} className="size-7" />
                <Image source={icons.phone} className="size-7" />
              </View>
            </View>
          </View>

          <View className="mt-7">
            <Rubik.Bold className="text-black-300 text-xl">Overview</Rubik.Bold>
            <Rubik className="mt-2 text-black-200 text-base">
              {property?.description}
            </Rubik>
          </View>

          <View className="mt-7">
            <Rubik.Bold className="text-black-300 text-xl">
              Facilities
            </Rubik.Bold>

            {property?.facilities.length > 0 && (
              <View className="flex flex-row flex-wrap items-start justify-start mt-2 gap-5">
                {property?.facilities.map((item: string, index: number) => {
                  const facility = property?.facilities.find(
                    (facility: any) => facility.title === item
                  );

                  return (
                    <View
                      key={index}
                      className="flex flex-1 flex-col items-center min-w-16 max-w-20"
                    >
                      <View className="size-14 bg-primary-100 rounded-full flex items-center justify-center">
                        <Image
                          source={facility ? facility.icon : icons.info}
                          className="size-6"
                        />
                      </View>

                      <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        className="text-black-300 text-sm text-center font-rubik mt-1.5 flex-1"
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View className="mt-7">
              <Rubik.Bold className="text-black-300 text-xl">
                Gallery
              </Rubik.Bold>
              <FlatList
                horizontal
                contentContainerStyle={{ paddingRight: 20 }}
                contentContainerClassName="mt-3 flex gap-4"
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    className="size-40 rounded-xl"
                  />
                )}
              />
            </View>
          )}

          <View className="mt-7">
            <Rubik.Bold className="text-xl text-black-300">Location</Rubik.Bold>
            <View className="flex flex-row items-center justify-start mt-4 gap-2">
              <Image source={icons.location} className="size-7" />
              <Rubik.Medium>{property?.address}</Rubik.Medium>
            </View>
            <Image
              source={images.map}
              className="w-full h-52 mt-5 rounded-xl"
            />
          </View>

          {property?.reviews.length > 0 && (
            <View className="mt-7">
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center gap-2">
                  <Image source={icons.star} className="size-6" />
                  <Rubik.Bold className="">
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Rubik.Bold>
                </View>

                <TouchableOpacity>
                  <Rubik.Bold className="text-primary-300 text-base">
                    View All
                  </Rubik.Bold>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-l border-r border-primary-200 p-7">
        <View className="flex flex-row items-center justify-between gap-10">
          <View className="flex flex-col items-start">
            <Rubik.Medium className="text-black-200 text-xs">
              Price
            </Rubik.Medium>
            <Rubik.Bold className="text-primary-300 text-start text-2xl">
              ${property?.price}
            </Rubik.Bold>
          </View>

          <TouchableOpacity className="flex flex-1 flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
            <Rubik.Bold className="text-white text-lg text-center">
              Book Now
            </Rubik.Bold>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
