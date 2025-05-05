import {
  View,
  Image,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Rubik from "@/components/font/rubik";
import Card from "@/components/ui/Card";
import Filters from "@/components/ui/Filters";
import NoResults from "@/components/ui/NoResults";
import Search from "@/components/ui/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/globalProvider";
import { useAppwrite } from "@/lib/useAppwrite";
import { useLocalSearchParams, router } from "expo-router";

const Explore = () => {
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const {
    data: allProperties,
    loading: allPropertiesLoading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter ?? "",
      query: params.query ?? "",
      limit: 6,
    },
    skip: true,
  });

  const handleCardPress = (id: string) => router.push(`/properties/${id}`);

  useEffect(() => {
    refetch({
      filter: params.filter ?? "",
      query: params.query ?? "",
      limit: 20,
    });
  }, [params.filter, params.query]);

  return (
    <SafeAreaView>
      <FlatList
        data={allProperties}
        renderItem={({ item }) => (
          <Card item={item} onPress={() => handleCardPress(item.$id)} />
        )}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          allPropertiesLoading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Rubik.Medium className="text-base text-black-300">
                Search for your ideal home
              </Rubik.Medium>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Rubik.Bold className="text-xl text-black-300 mt-5">
                Found {allProperties?.length} properties
              </Rubik.Bold>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
