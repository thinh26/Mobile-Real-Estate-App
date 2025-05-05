import { View, Text, SafeAreaView, ActivityIndicator } from "react-native";
import React from "react";
import { useGlobalContext } from "@/lib/globalProvider";
import { Redirect, Slot } from "expo-router";

const AppLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }
  if (!isLogged) return <Redirect href="/signIn" />;
  return <Slot />;
};

export default AppLayout;
