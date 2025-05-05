import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Rubik from "@/components/font/rubik";
import icons from "@/constants/icons";
import clsx from "clsx";

const TabBarIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: any;
  title: string;
}): React.ReactNode => {
  const baseFocusedTitleStyle = "text-xs w-full text-center mt-1";

  return (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#0061ff" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      {focused ? (
        <Rubik.Medium
          className={clsx("text-primary-300", baseFocusedTitleStyle)}
        >
          {title}
        </Rubik.Medium>
      ) : (
        <Rubik className={clsx("text-black-200", baseFocusedTitleStyle)}>
          {title}
        </Rubik>
      )}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.search} title="Explore" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
