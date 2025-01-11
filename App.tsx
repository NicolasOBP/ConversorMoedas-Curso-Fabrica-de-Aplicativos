import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { PickerItem } from "./src/components/Picker";
import { useEffect, useState } from "react";
import { api } from "./src/services/api";

type moeda = { key: string; value: string; label: string };

export default function App() {
  const [loading, setLoading] = useState(true);
  const [moedas, setMoedas] = useState<moeda[]>();
  const [moedaSelecionada, setMoedaSelecionada] = useState("");

  useEffect(() => {
    async function loadMoedas() {
      const response = await api.get("all");

      let arrayMoedas: moeda[] = [];

      Object.keys(response.data).map((key) => {
        arrayMoedas.push({
          key: key,
          label: key,
          value: key,
        });
      });

      setMoedas(arrayMoedas);
      setLoading(false);
      setMoedaSelecionada(arrayMoedas[0].key);
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

        <PickerItem
          moedas={moedas!}
          moedaSelecionada={moedaSelecionada}
          onChange={(moeda: string) => {
            setMoedaSelecionada(moeda);
            console.log(moeda);
          }}
        />
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
