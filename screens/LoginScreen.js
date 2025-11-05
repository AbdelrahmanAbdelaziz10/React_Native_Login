import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.replace("Home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.screen}
    >
      <StatusBar barStyle="light-content" backgroundColor="#063776" />

      {/* ===== Header Section ===== */}
      <LinearGradient
        colors={["#063776", "#0958b1"]}
        style={styles.headerContainer}
      >
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>Welcome to Maximo 👋</Text>
        <Text style={styles.subHeaderText}>Sign in to continue</Text>
      </LinearGradient>

      {/* ===== Form Section ===== */}
      <View style={styles.formContainer}>
        {/* Username */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="person-outline"
            size={22}
            color="#063776"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#888"
          />
        </View>

        {/* Password */}
        <View style={styles.inputContainer}>
          <MaterialIcons
            name="lock-outline"
            size={22}
            color="#063776"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
          <LinearGradient
            colors={["#063776", "#0958b1"]}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign Up */}
        <Text style={styles.bottomText}>
          Don’t have an account?{" "}
          <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  subHeaderText: {
    color: "#e1e1e1",
    fontSize: 15,
  },
  formContainer: {
    flex: 0.5,
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: "#063776",
    fontSize: 16,
  },
  forgotText: {
    color: "#0958b1",
    fontSize: 14,
    textAlign: "right",
    marginBottom: 25,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  bottomText: {
    textAlign: "center",
    marginTop: 25,
    color: "#777",
    fontSize: 14,
  },
  signUpText: {
    color: "#063776",
    fontWeight: "bold",
  },
});
