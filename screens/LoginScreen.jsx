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
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); //  Error message state

<<<<<<< HEAD
  const handleLogin = async () => {
    //  Check if empty fields
    if (!userName.trim() || !passWord.trim()) {
      setErrorMessage(" Please enter your userName and passWord");
      return;
    }

    setErrorMessage(""); // clear previous errors
    setLoading(true);

    try {
      const apiUrl = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALUSER?lean=1&oslc.select=*&oslc.where=user.LOGINID="${userName}"&_lid=${userName}&_lpwd=${passWord}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login response:", data);

      if (data && data.member && data.member.length > 0) {
        setErrorMessage(""); // clear error
        navigation.replace("Home");
      } else {
        setErrorMessage(" Username or password is incorrect.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(" Username or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

// const handleLogin2 =()=>{
//           navigation.replace("Home");
// }
=======
  // const handleLogin = async () => {
  //   //  Check if empty fields
  //   if (!userName.trim() || !passWord.trim()) {
  //     setErrorMessage(" Please enter your userName and passWord");
  //     return;
  //   }

  //   setErrorMessage(""); // clear previous errors
  //   setLoading(true);

  //   try {
  //     const apiUrl = `http://192.168.0.73:9080/maxrest/oslc/os/PORTALUSER?lean=1&oslc.select=*&oslc.where=user.LOGINID="${userName}"&_lid=${userName}&_lpwd=${passWord}`;

  //     const response = await fetch(apiUrl, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Server error: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Login response:", data);

  //     if (data && data.member && data.member.length > 0) {
  //       setErrorMessage(""); // clear error
  //       navigation.replace("Home");
  //     } else {
  //       setErrorMessage(" Username or password is incorrect.");
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //     setErrorMessage(" Username or password is incorrect.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const handleLogin2 = () => {
      navigation.replace("Home");
};


>>>>>>> 52dcedd ( Make Edit in the home page design)
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
      {/* 🟥 Error message (Dynamic) */}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

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
            onChangeText={(text) => {
              setUserName(text);
              setErrorMessage("");
            }}
            autoCapitalize="none"
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
            onChangeText={(text) => {
              setPassWord(text);
              setErrorMessage("");
            }}
            autoCapitalize="none"
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
        <TouchableOpacity
<<<<<<< HEAD
          onPress={handleLogin}
=======
          onPress={handleLogin2}
>>>>>>> 52dcedd ( Make Edit in the home page design)
          activeOpacity={0.8}
          disabled={loading}
        >
          <LinearGradient colors={["#063776", "#0958b1"]} style={styles.button}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        {/* Sign Up */}
        <Text style={styles.bottomText}>
          Don’t have an account? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

// ===== Styles =====
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
    boxShadowColor: "#000",
    boxShadowOpacity: 0.05,
    boxShadowOffset: { width: 0, height: 2 },
    boxShadowRadius: 3,
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop:20,
    textAlign: "center",
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
    boxShadowColor: "#000",
    boxShadowOpacity: 0.2,
    boxShadowOffset: { width: 0, height: 4 },
    boxShadowRadius: 5,
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
