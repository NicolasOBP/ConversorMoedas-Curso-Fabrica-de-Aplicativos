import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
          onChange={(moeda: string) => setMoedaSelecionada(moeda)}
        />
      </View>

      <View style={styles.areaValor}>
        <Text style={styles.titulo}>
          Digite um valor para converter em Real
        </Text>

        <TextInput
          keyboardType="numeric"
          placeholder="Exemplo"
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.btnArea}>
        <Text style={styles.btnText}>Converter</Text>
      </TouchableOpacity>
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
    marginBottom: 1,
  },
  titulo: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "500",
    paddingLeft: 5,
    paddingTop: 5,
  },
  areaValor: {
    width: "90%",
    backgroundColor: "#f9f9f9",
    padding: 8,
  },
  input: {
    width: "100%",
    padding: 8,
    fontSize: 18,
    color: "#000",
  },
  btnArea: {
    width: "90%",
    backgroundColor: "#fb4b57",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  btnText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
