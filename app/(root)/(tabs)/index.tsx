import Rubik from "@/components/font/rubik";
import Card from "@/components/ui/Card";
import Filters from "@/components/ui/Filters";
import NoResults from "@/components/ui/NoResults";
import Search from "@/components/ui/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/globalProvider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } =
    useAppwrite({
      fn: getLatestProperties,
    });

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
      limit: 6,
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
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Rubik className="text-xs text-black-100">Good Morning</Rubik>
                  <Rubik.Medium className="text-black-300">
                    {user?.name}
                  </Rubik.Medium>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Rubik.Bold className="text-xl text-black-300">
                  Featured
                </Rubik.Bold>
                <TouchableOpacity>
                  <Rubik.Bold className="text-base text-primary-300">
                    See all
                  </Rubik.Bold>
                </TouchableOpacity>
              </View>
              {latestPropertiesLoading ? (
                <ActivityIndicator size="large" className="text-primary-300" />
              ) : !latestProperties || latestProperties.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  horizontal
                  data={latestProperties}
                  renderItem={({ item }) => (
                    <Card.Featured
                      item={item}
                      onPress={() => handleCardPress(item.$id)}
                    />
                  )}
                  keyExtractor={(item) => item.$id}
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="mt-5 flex flex-row gap-5"
                />
              )}
            </View>
            <View className="flex flex-row items-center justify-between">
              <Rubik.Bold className="text-xl text-black-300">
                Our Recommendation
              </Rubik.Bold>
              <TouchableOpacity>
                <Rubik.Bold className="text-base text-primary-300">
                  See all
                </Rubik.Bold>
              </TouchableOpacity>
            </View>
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
}
