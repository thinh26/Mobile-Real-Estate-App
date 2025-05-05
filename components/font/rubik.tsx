import { Text, TextProps } from "react-native";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";

const Rubik = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-rubik", props.className)}>
      {props.children}
    </Text>
  );
};

const RubikBold = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-rubik-bold", props.className)}>
      {props.children}
    </Text>
  );
};

const RubikExtraBold = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-rubik-extrabold", props.className)}>
      {props.children}
    </Text>
  );
};

const RubikMedium = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-rubik-medium", props.className)}>
      {props.children}
    </Text>
  );
};

const RubikSemiBold = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-rubik-semibold", props.className)}>
      {props.children}
    </Text>
  );
};

const RubikLight = (props: PropsWithChildren<TextProps>) => {
  return (
    <Text {...props} className={clsx("font-rubik-light", props.className)}>
      {props.children}
    </Text>
  );
};

Rubik.Light = RubikLight;
Rubik.Medium = RubikMedium;
Rubik.SemiBold = RubikSemiBold;
Rubik.Bold = RubikBold;
Rubik.ExtraBold = RubikExtraBold;

export default Rubik;
