import React from "react";
import { View, Text, Button } from "react-native";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}> Welcome Home!</Text>
      <Button title="Logout" onPress={() => navigation.replace("Login")} />
    </View>
  );
}
