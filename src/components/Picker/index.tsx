import { Picker } from "@react-native-picker/picker";

type moeda = { key: string; value: string; label: string };

type props = {
  moedas: moeda[];
  moedaSelecionada: string;
  onChange: (moeda: string) => void;
};
export function PickerItem({ moedas, moedaSelecionada, onChange }: props) {
  let moedasItem = moedas.map((item, index) => {
    return <Picker.Item value={item.key} key={index} label={item.key} />;
  });

  return <Picker>{moedasItem}</Picker>;
}
