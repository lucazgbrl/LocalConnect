import { SearchBar } from "@/components/SearchBar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
      {/* 3 buttons to order search results: by distance, by rating, by category */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
        <TouchableOpacity style={styles.order_btn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>By Distance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.order_btn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>By Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.order_btn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>By Category</Text>
        </TouchableOpacity>
      </View>
      {/* List of search results (placeholder) */}
      <View style={{ marginTop: 20 }}>
        <Text>Search results will be displayed here.</Text>
        {/* Placeholder for search results */}
        <View style={{ marginTop: 10 }}>
          <Text>No results found.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
    paddingTop: 50,
  },
  order_btn: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#000",
  },
});
