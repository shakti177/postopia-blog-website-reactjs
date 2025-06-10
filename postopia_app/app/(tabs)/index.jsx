import { Link } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Expo Router</Text>
      <Link href="/profile" asChild>
        <Button title="Go to About Page" />
      </Link>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
