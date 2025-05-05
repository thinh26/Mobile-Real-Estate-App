import {
  SafeAreaView,
  Text,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  type GestureResponderEvent,
  Alert,
} from "react-native";
import React from "react";
import images from "@/constants/images";
import Rubik from "@/components/font/rubik";
import icons from "@/constants/icons";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/globalProvider";
import { Redirect } from "expo-router";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/" />;

  async function handleLogin() {
    const result = await login();

    if (result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login");
    }
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Rubik className="text-base text-center uppercase text-black-200">
            Welcome to ReState
          </Rubik>
          <Rubik.Bold className="text-3xl text-black-300 text-center mt-2">
            Let's Get You Closer to{" "}
            <Rubik.Bold className="text-primary-300">
              Your Ideal Home
            </Rubik.Bold>
          </Rubik.Bold>
          <Rubik className="text-lg text-black-200 text-center mt-12">
            Login to ReState with Google
          </Rubik>
          <TouchableOpacity
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
            onPress={handleLogin}
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Rubik.Medium className="text-lg text-black-300 ml-2">
                Continue with Google
              </Rubik.Medium>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
