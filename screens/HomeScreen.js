import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("WO");
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleSignOut = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      {/* ===== Top Header + Menu ===== */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>

        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <MaterialIcons name="account-circle" size={35} color="#fff" />
        </TouchableOpacity>

        {showMenu && (
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate("Profile");
              }}
            >
              <MaterialIcons name="person" size={22} color="#063776" />
              <Text style={styles.menuText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                navigation.navigate("Options");
              }}
            >
              <MaterialIcons name="settings" size={22} color="#063776" />
              <Text style={styles.menuText}>Options</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setShowMenu(false);
                handleSignOut();
              }}
            >
              <MaterialIcons name="logout" size={22} color="red" />
              <Text style={[styles.menuText, { color: "red" }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* ===== Top Partitions ===== */}
      <View style={styles.partitionContainer}>
        <TouchableOpacity
          style={[
            styles.partition,
            activeTab === "WO" && styles.activePartition,
          ]}
          onPress={() => setActiveTab("WO")}
        >
          <Text style={styles.partitionTitle}>Work Orders</Text>
          <Text style={styles.partitionNumber}>24</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.partition,
            activeTab === "SR" && styles.activePartition,
          ]}
          onPress={() => setActiveTab("SR")}
        >
          <Text style={styles.partitionTitle}>Service Requests</Text>
          <Text style={styles.partitionNumber}>18</Text>
        </TouchableOpacity>
      </View>

      {/* ===== Content ===== */}
      <View style={styles.content}>
        {activeTab === "WO" ? (
          <Text style={styles.contentText}>Work Orders Content Here</Text>
        ) : (
          <Text style={styles.contentText}>Service Requests Content Here</Text>
        )}
      </View>

      {/* ===== Bottom Navigation ===== */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => setActiveTab("WO")}>
          <MaterialIcons
            name="build"
            size={28}
            color={activeTab === "WO" ? "#063776" : "#999"}
          />
          <Text style={[styles.navText, activeTab === "WO" && styles.navTextActive]}>
            Work Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => setShowModal(true)}
        >
          <MaterialIcons name="add" size={34} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => setActiveTab("SR")}>
          <MaterialIcons
            name="assignment"
            size={28}
            color={activeTab === "SR" ? "#063776" : "#999"}
          />
          <Text style={[styles.navText, activeTab === "SR" && styles.navTextActive]}>
            Service Requests
          </Text>
        </TouchableOpacity>
      </View>

      {/* ===== Modal Create ===== */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Create New</Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("CreateSR");
              }}
            >
              <Text style={styles.modalButtonText}>Create Service Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                navigation.navigate("CreateWO");
              }}
            >
              <Text style={styles.modalButtonText}>Create Work Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* ==================== Styles ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },

  /* Header */
header: {
  paddingTop: 25,
  paddingHorizontal: 20,
  paddingBottom: 15,
  backgroundColor: "#063776",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  elevation: 0,      // ❗ عطل تأثير الرفع
  zIndex: 1, 
  marginBottom:30,        // ❗ خلّيه تحت المنيو
},


  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    // color: "#063776",
    color:"#fff",
  },

  /* Dropdown Menu */
menuBox: {
  position: "absolute",
  right: 20,
  top: 80,
  width: 180,
  backgroundColor: "#fff",   // غامق مودرن
  borderRadius: 12,
  paddingVertical: 8,
  zIndex: 99999,                // أعلى من أي شيء
  elevation: 50,                // أعلى Priority على أندرويد
  boxShadowColor: "#000",
  boxShadowOpacity: 0.35,
  boxShadowRadius: 10,
  boxShadowOffset: { width: 0, height: 4 },
},
  menuItem: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
  },

  menuText: {
    marginLeft: 10,
    fontSize: 15,
    color: "#063776",
  },

  /* Partitions */
  partitionContainer: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },

  partition: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    alignItems: "center",
    elevation: 3,
  },

  activePartition: {
    borderColor: "#063776",
    borderWidth: 2,
  },

  partitionTitle: { fontSize: 16, fontWeight: "600", color: "#063776" },
  partitionNumber: { marginTop: 6, fontSize: 22, fontWeight: "700" },

  /* Content */
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contentText: { fontSize: 18, color: "#444" },

  /* Bottom Nav */
  bottomNav: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
    elevation: 10,
  },

  navButton: { alignItems: "center" },
  navText: { fontSize: 12, color: "#888", marginTop: 4 },
  navTextActive: { color: "#063776", fontWeight: "700" },

  /* Floating Create Button */
  floatingButton: {
    width: 65,
    height: 65,
    backgroundColor: "#063776",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
    elevation: 8,
  },

  /* Modal */
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: 280,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },

  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 15 },

  modalButton: {
    width: "100%",
    padding: 12,
    backgroundColor: "#063776",
    borderRadius: 10,
    marginVertical: 6,
  },

  modalButtonText: { color: "#fff", fontSize: 16, textAlign: "center" },

  cancelButton: { marginTop: 10 },
  cancelText: { color: "#333", fontSize: 14 },
});
