import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PickerItem } from "./src/components/Picker";
import { useEffect, useState } from "react";
import { api } from "./src/services/api";

export default function App() {
  const [moedas, setMoedas] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get("all");

      let arrayMoedas: Array<object> = [];

      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setMoedas(arrayMoedas);
      setLoading(false);
    }

    loadMoedas();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color="#FFF" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.areaMoeda}>
        <Text style={styles.titulo}>Selecione sua moeda</Text>

        <PickerItem />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101215",
    paddingTop: 40,
    alignItems: "center",
  },
  areaMoeda: {
    backgroundColor: "#f9f9f9",
    width: "90%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
  },
  titulo: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    paddingLeft: 5,
    paddingTop: 5,
  },
});
