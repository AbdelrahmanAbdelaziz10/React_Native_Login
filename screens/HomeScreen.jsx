import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PAGE_SIZE = 5;

export default function HomeScreen({ navigation }) {
  /* ================= Data ================= */

  const workOrders = [
    {
      id: "WO-6453",
      status: "ACTIVE",
      createdAt: "2025-05-27 15:38",
      asset: "EXFA-015",
      location: "02-TRAF-F061",
      department: "MECH HVAC",
      description: "مشكله في ماسورة الصرف",
    },
    {
      id: "WO-6454",
      status: "INPROG",
      createdAt: "2025-05-28 10:20",
      asset: "EXFA-022",
      location: "02-TRAF-F070",
      department: "MECH HVAC",
      description: "Mechanical HVAC",
    },
    {
      id: "WO-6455",
      status: "CLOSED",
      createdAt: "2025-05-29 09:00",
      asset: "EXFA-030",
      location: "02-TRAF-F090",
      department: "MECH HVAC",
      description: "Mechanical HVAC",
    },
  ];

  const serviceRequests = [
    {
      id: "SR-1201",
      status: "OPEN",
      createdAt: "2025-05-26 09:15",
      asset: "UPS-01",
      location: "Cluster A",
      department: "ELEC",
      description: "Electrical",
    },
    {
      id: "SR-1202",
      status: "REJECTED",
      createdAt: "2025-05-26 14:30",
      asset: "ELP-L2B",
      location: "Panel Room",
      department: "ELEC",
      description: "Electrical",
    },
  ];

  /* ================= State ================= */

  const [activeTab, setActiveTab] = useState("WO");
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  /* ================= Helpers ================= */

  const statusColors = {
    ACTIVE: "#1e7f5c",
    OPEN: "#0d6efd",
    INPROG: "#ff9800",
    CLOSED: "#6c757d",
    REJECTED: "#dc3545",
  };

  const sourceData =
    activeTab === "WO" ? workOrders : serviceRequests;

  /* ================= Search + Filter ================= */

  const filteredData = useMemo(() => {
    return sourceData.filter((item) => {
      const keyword = searchText.toLowerCase();

      const matchSearch =
        item.id.toLowerCase().includes(keyword) ||
        item.asset.toLowerCase().includes(keyword) ||
        item.location.toLowerCase().includes(keyword);

      const matchStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [sourceData, searchText, statusFilter]);

  /* ================= Pagination ================= */

  const paginatedData = filteredData.slice(
    0,
    page * PAGE_SIZE
  );

  const canLoadMore = paginatedData.length < filteredData.length;

  /* ================= Card ================= */

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.idText}>
          {activeTab} : {item.id}
        </Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[item.status] + "20" },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: statusColors[item.status] },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.reviewText}>
        {activeTab === "WO"
          ? "SR needs review."
          : "Service request details."}
      </Text>

      <InfoRow icon="calendar-today" text={item.createdAt} />
      <InfoRow icon="build" text={`Asset: ${item.asset}`} />
      <InfoRow icon="place" text={`Location: ${item.location}`} />
      <InfoRow icon="engineering" text={`Dept: ${item.department}`} />
      <InfoRow icon="settings" text={item.description} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
      </View>

      {/* ===== Search ===== */}
      <View style={styles.searchBox}>
        <MaterialIcons name="search" size={22} color="#888" />
        <TextInput
          placeholder="Search by ID, Asset, Location"
          value={searchText}
          onChangeText={(t) => {
            setSearchText(t);
            setPage(1);
          }}
          style={styles.searchInput}
        />
      </View>

      {/* ===== Filter ===== */}
      <View style={styles.filterRow}>
        {["ALL", "ACTIVE", "OPEN", "INPROG", "CLOSED", "REJECTED"].map(
          (status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterBtn,
                statusFilter === status && styles.filterBtnActive,
              ]}
              onPress={() => {
                setStatusFilter(status);
                setPage(1);
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  statusFilter === status &&
                    styles.filterTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* ===== Tabs ===== */}
      <View style={styles.partitionContainer}>
        <TouchableOpacity
          style={[
            styles.partition,
            activeTab === "WO" && styles.activePartition,
          ]}
          onPress={() => {
            setActiveTab("WO");
            setPage(1);
          }}
        >
          <Text style={styles.partitionTitle}>Work Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.partition,
            activeTab === "SR" && styles.activePartition,
          ]}
          onPress={() => {
            setActiveTab("SR");
            setPage(1);
          }}
        >
          <Text style={styles.partitionTitle}>Service Requests</Text>
        </TouchableOpacity>
      </View>

      {/* ===== List ===== */}
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListFooterComponent={
          canLoadMore && (
            <TouchableOpacity
              style={styles.loadMoreBtn}
              onPress={() => setPage((p) => p + 1)}
            >
              <Text style={styles.loadMoreText}>Load More</Text>
            </TouchableOpacity>
          )
        }
      />

      {/* ===== Footer ===== */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => {
            setActiveTab("WO");
            setPage(1);
          }}
        >
          <MaterialIcons
            name="settings"
            size={26}
            color={activeTab === "WO" ? "#063776" : "#999"}
          />
          <Text
            style={[
              styles.footerText,
              activeTab === "WO" && styles.footerTextActive,
            ]}
          >
            Work Orders
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowModal(true)}
        >
          <MaterialIcons name="add" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => {
            setActiveTab("SR");
            setPage(1);
          }}
        >
          <MaterialIcons
            name="assignment"
            size={26}
            color={activeTab === "SR" ? "#063776" : "#999"}
          />
          <Text
            style={[
              styles.footerText,
              activeTab === "SR" && styles.footerTextActive,
            ]}
          >
            Service Requests
          </Text>
        </TouchableOpacity>
      </View>

      {/* ===== Modal ===== */}
      <Modal transparent visible={showModal} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Create New</Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={{ color: "red", marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

/* ================= Small Component ================= */

const InfoRow = ({ icon, text }) => (
  <View style={styles.row}>
    <MaterialIcons name={icon} size={16} color="#777" />
    <Text style={styles.rowText}>{text}</Text>
  </View>
);

/* ================= Styles ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },

  header: { padding: 20, backgroundColor: "#063776" },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  searchInput: { flex: 1, padding: 10 },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },

  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },

  filterBtnActive: { backgroundColor: "#063776" },
  filterText: { fontSize: 12 },
  filterTextActive: { color: "#fff", fontWeight: "700" },

  partitionContainer: { flexDirection: "row", padding: 15 },

  partition: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#ddd",
    marginHorizontal: 5,
    alignItems: "center",
  },

  activePartition: { backgroundColor: "#063776" },
  partitionTitle: { color: "#fff", fontWeight: "700" },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    margin: 16,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  idText: { fontWeight: "700", color: "#063776" },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  statusText: { fontSize: 12, fontWeight: "700" },

  reviewText: { color: "#777", marginVertical: 6 },

  row: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  rowText: { marginLeft: 8 },

  button: {
    marginTop: 12,
    backgroundColor: "#063776",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: { color: "#fff", fontWeight: "700" },

  loadMoreBtn: {
    backgroundColor: "#063776",
    padding: 12,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  loadMoreText: { color: "#fff", fontWeight: "700" },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    elevation: 15,
  },

  footerItem: { alignItems: "center" },

  footerText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  footerTextActive: {
    color: "#063776",
    fontWeight: "700",
  },

  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#063776",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -35,
    elevation: 20,
  },

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

  modalTitle: { fontWeight: "700", fontSize: 17 },
});
