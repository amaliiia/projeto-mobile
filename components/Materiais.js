import { useState } from 'react';
import { FlatList, Keyboard, Pressable, Text, TextInput, View } from 'react-native';
import styles from '../styles';

export default function Materiais({ materiais, onSalvar, onExcluir }) {
  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [unidade, setUnidade] = useState('');
  const [erro, setErro] = useState('');

  function limpar() { setEditandoId(null); setNome(''); setUnidade(''); setErro(''); }

  function salvar() {
    const n = nome.trim();
    if (!n) return setErro('Informe o nome do material.');
    if (materiais.some(m => m.id !== editandoId && m.nome.toLowerCase() === n.toLowerCase()))
      return setErro('Já existe um material com esse nome.');
    onSalvar({ id: editandoId, nome: n, unidade: unidade.trim() });
    limpar();
    Keyboard.dismiss();
  }

  function editar(m) { setEditandoId(m.id); setNome(m.nome); setUnidade(m.unidade); setErro(''); }

  function excluir(m) { const msg = onExcluir(m.id); if (msg) setErro(msg); }

  const formulario = (
    <View>
      <Text style={styles.label}>{editandoId ? 'Editar material' : 'Novo material'}</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} maxLength={60}
        placeholder="Ex.: Cimento" placeholderTextColor="#64748b" accessibilityLabel="Nome do material" />
      <Text style={styles.label}>Unidade (opcional)</Text>
      <TextInput style={styles.input} value={unidade} onChangeText={setUnidade} maxLength={10}
        onSubmitEditing={salvar} returnKeyType="done"
        placeholder="Ex.: saco, m³, kg" placeholderTextColor="#64748b" accessibilityLabel="Unidade" />
      <Pressable onPress={salvar} accessibilityRole="button"
        style={({ pressed }) => [styles.botao, pressed && styles.botaoOpaco]}>
        <Text style={styles.textoBotao}>{editandoId ? 'Salvar alteração' : 'Adicionar material'}</Text>
      </Pressable>
      {editandoId ? (
        <Pressable onPress={limpar} style={styles.botaoLink} accessibilityRole="button">
          <Text style={styles.textoLink}>Cancelar edição</Text>
        </Pressable>
      ) : null}
      {erro ? <Text style={styles.erro} accessibilityRole="alert">{erro}</Text> : null}
      <Text style={[styles.label, { marginTop: 16 }]}>Materiais cadastrados</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.corpo}
      contentContainerStyle={styles.conteudo}
      data={materiais}
      keyExtractor={i => i.id}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={formulario}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhum material cadastrado.</Text>}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitulo}>{item.nome}</Text>
            {item.unidade ? <Text style={styles.itemSub}>{item.unidade}</Text> : null}
          </View>
          <Pressable onPress={() => editar(item)} style={styles.acao} accessibilityRole="button">
            <Text style={styles.acaoTexto}>Editar</Text>
          </Pressable>
          <Pressable onPress={() => excluir(item)} style={styles.acao} accessibilityRole="button">
            <Text style={[styles.acaoTexto, styles.acaoExcluir]}>Excluir</Text>
          </Pressable>
        </View>
      )}
    />
  );
}
