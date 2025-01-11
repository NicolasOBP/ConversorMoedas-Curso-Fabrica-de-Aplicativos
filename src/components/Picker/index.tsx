import { Picker } from "@react-native-picker/picker";

type props = {
  moedas: Array<object>;
  moedaSelecionada: string;
  onChange: (moeda: string) => void;
};
export function PickerItem({ moedas, moedaSelecionada }: props) {
  return (
    <Picker>
      <Picker.Item value="BTC" key={0} label="Bitcoin" />
    </Picker>
  );
}
