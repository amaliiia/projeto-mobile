import { useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import styles from '../styles';
import { brl, dataValida, hoje, num } from '../utils';

export default function Lancamentos({ lancamentos, materiais, mes, onAdicionar, onExcluir }) {
  const [materialId, setMaterialId] = useState(null);
  const [valor, setValor] = useState('');
  const [data, setData] = useState(hoje());
  const [fornecedor, setFornecedor] = useState('');
  const [obs, setObs] = useState('');
  const [erro, setErro] = useState('');

  const nomeDe = id => materiais.find(m => m.id === id)?.nome ?? 'Material removido';
  const lista = lancamentos.filter(l => l.data.startsWith(mes)).sort((a, b) => b.data.localeCompare(a.data));

  function salvar() {
    const v = num(valor);
    if (!materialId) return setErro('Escolha um material.');
    if (!(v > 0)) return setErro('Informe um valor maior que zero.');
    if (!dataValida(data)) return setErro('Use a data no formato AAAA-MM-DD.');
    setErro('');
    onAdicionar({ materialId, valor: v, data, fornecedor: fornecedor.trim(), obs: obs.trim() });
    setValor(''); setFornecedor(''); setObs('');
    Keyboard.dismiss();
  }

  const formulario = (
    <View>
      <Text style={styles.label}>Material</Text>
      {materiais.length === 0 && <Text style={styles.rotulo}>Cadastre um material na aba Materiais para começar.</Text>}
      <View style={styles.chips}>
        {materiais.map(m => (
          <Pressable key={m.id} onPress={() => setMaterialId(m.id)} accessibilityRole="button"
            style={[styles.chip, materialId === m.id && styles.chipAtivo]}>
            <Text style={[styles.chipTexto, materialId === m.id && styles.chipTextoAtivo]}>{m.nome}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput style={styles.input} value={valor} onChangeText={setValor} keyboardType="decimal-pad"
        placeholder="Ex.: 149,90" placeholderTextColor="#64748b" accessibilityLabel="Valor" />
      <Text style={styles.label}>Data</Text>
      <TextInput style={styles.input} value={data} onChangeText={setData} maxLength={10}
        placeholder="AAAA-MM-DD" placeholderTextColor="#64748b" accessibilityLabel="Data" />
      <Text style={styles.label}>Fornecedor (opcional)</Text>
      <TextInput style={styles.input} value={fornecedor} onChangeText={setFornecedor} maxLength={60}
        placeholder="Ex.: Casa do Construtor" placeholderTextColor="#64748b" accessibilityLabel="Fornecedor" />
      <Text style={styles.label}>Observação (opcional)</Text>
      <TextInput style={styles.input} value={obs} onChangeText={setObs} maxLength={100}
        onSubmitEditing={salvar} returnKeyType="done" accessibilityLabel="Observação" />
      <Pressable onPress={salvar} accessibilityRole="button"
        style={({ pressed }) => [styles.botao, pressed && styles.botaoOpaco]}>
        <Text style={styles.textoBotao}>Adicionar gasto</Text>
      </Pressable>
      {erro ? <Text style={styles.erro} accessibilityRole="alert">{erro}</Text> : null}
      <Text style={[styles.label, { marginTop: 16 }]}>Gastos do mês</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.corpo}
      contentContainerStyle={styles.conteudo}
      data={lista}
      keyExtractor={i => i.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={formulario}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhum gasto neste mês.</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitulo}>{nomeDe(item.materialId)}</Text>
            <Text style={styles.itemSub}>{[item.data.split('-').reverse().join('/'), item.fornecedor, item.obs].filter(Boolean).join(' • ')}</Text>
          </View>
          <Text style={styles.itemValor}>{brl(item.valor)}</Text>
          <Pressable onPress={() => onExcluir(item.id)} style={styles.acao} accessibilityRole="button" accessibilityLabel="Excluir gasto">
            <Text style={[styles.acaoTexto, styles.acaoExcluir]}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}
