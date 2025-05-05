import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import Rubik from "@/components/font/rubik";
import icons from "@/constants/icons";
import images from "@/constants/images";
import clsx from "clsx";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/globalProvider";
import { logout } from "@/lib/appwrite";

const settingsItemsArray = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
];

interface SettingsItemProp {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: string;
  showArrow?: boolean;
}

const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProp) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    <View className="flex flex-row items-center gap-3">
      <Image source={icon} className="size-6" />
      <Rubik.Medium className={clsx("text-lg", "text-black-300", textStyle)}>
        {title}
      </Rubik.Medium>
    </View>
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();

    if (!result) {
      Alert.alert("Error", "An error occurred while logging out !");
      return;
    }

    Alert.alert("Success", "You have been logout successfully !");
    refetch();
  };
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Rubik.Bold className="text-xl">Profile</Rubik.Bold>
          <Image source={icons.bell} className="size-5" />
        </View>
        <View className="flex flex-row justify-center mt-5">
          <View className="flex flex-col items-center relative mt-5">
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Rubik.Bold className="text-2xl mt-2">{user?.name}</Rubik.Bold>
          </View>
        </View>
        <View className="flex flex-col mt-10">
          {settingsItemsArray.map((item, index) => (
            <SettingsItem key={index} title={item.title} icon={item.icon} />
          ))}
        </View>
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            title="Logout"
            icon={icons.logout}
            showArrow={false}
            textStyle="text-danger"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
