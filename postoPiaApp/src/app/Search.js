import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomSheet from "./BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Search = () => {
  const ref = useRef(null);

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    console.log("onPress called, isActive:", isActive);
    if (isActive) {
      console.log("Attempting to close sheet (scrollTo 0)");
      ref?.current?.scrollTo(0);
    } else {
      console.log("Attempting to open sheet (scrollTo -200)");
      ref?.current?.scrollTo(-200);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ height: "100%" }}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Text
              onPress={onPress}
              style={{
                textAlign: "right",
                borderLeftWidth: 1,
                padding: 4,
                paddingLeft: 10,
              }}
            >
              Filter
            </Text>
          </View>
        </ScrollView>
        <BottomSheet ref={ref}>
          <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <Text>hello</Text>
          </View>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Search;
