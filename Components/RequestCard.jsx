import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function RequestCard({ item }) {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.blueBg} />

      <View style={styles.card}>
        {/* ==== Title + Days Left ==== */}
        <View style={styles.rowBetween}>
          <Text style={styles.title}>{item.SR_ID}</Text>

          <View style={styles.rowCenter}>
            <MaterialIcons name="timer" size={16} color="#777" />
            <Text style={styles.days}> 5 days left</Text>
          </View>
        </View>

        {/* ==== Summary ==== */}
        <Text style={styles.summary} numberOfLines={2}>
          {item.summary}
        </Text>

        {/* ==== Progress + Amount ==== */}
{/* ==== Status + Department ==== */}

<View style={styles.rowBetween}>
   <Text style={styles.departmentText}>
    <Text style={styles.departmentValue}>{item.Department}</Text>
  </Text>

  <Text style={styles.statusText}>
    <Text style={styles.statusValue}>{item.status}</Text>
  </Text>

 
</View>


        {/* ==== Blue Progress Bar ==== */}
        {/* <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "60%" }]} />
        </View> */}
        {/* ==== Button to navigate ==== */}
<TouchableOpacity
  style={styles.detailsButton}
  onPress={() => navigation.navigate("RequestDetails", { id: item.id })}
>

  <Text style={styles.detailsText}>View Details</Text>
    <MaterialIcons name="arrow-forward" size={20} color="#fff" />
</TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 15,
    marginBottom: 25,
  },

  blueBg: {
    position: "absolute",
    left: 0,
    top: 28,
    width: 80,
    height: 30,
    backgroundColor: "#063776",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#063776",
  },

  days: {
    color: "#777",
    fontSize: 13,
  },

  summary: {
    marginVertical: 10,
    color: "#444",
    fontSize: 14,
    lineHeight: 18,
  },

  progressText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#063776",
  },

  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#063776",
  },

  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "#d7ddeb",
    borderRadius: 5,
    marginTop: 8,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#063776",
  },
  statusText: {
  fontSize: 14,
  color: "#555",
  fontWeight: "600",
},

statusValue: {
  color: "#063776",
  fontWeight: "700",
},

departmentText: {
  fontSize: 14,
  color: "#555",
  fontWeight: "600",
},

departmentValue: {
  color: "#063776",
  fontWeight: "700",
},
detailsButton: {
  marginTop: 15,
  backgroundColor: "#063776",
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 10,
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "flex-end",
},

detailsText: {
  color: "#fff",
  fontSize: 14,
  marginLeft: 5,
  fontWeight: "600",
},

});
