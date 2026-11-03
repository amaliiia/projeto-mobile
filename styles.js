import { StyleSheet } from 'react-native';

export const cor = {
  fundo: '#f3f5f4', tinta: '#1b2a2f', suave: '#5b6b70', linha: '#d7dfdd',
  card: '#ffffff', marca: '#0f766e', marcaClara: '#d5ece8', alta: '#b45309', baixa: '#15803d', erro: '#b91c1c',
};

export default StyleSheet.create({
  safe: { flex: 1, backgroundColor: cor.fundo },
  container: { flex: 1, width: '100%', maxWidth: 720, alignSelf: 'center', paddingHorizontal: 16 },
  titulo: { fontSize: 24, fontWeight: '700', color: cor.tinta, marginTop: 12 },
  subtitulo: { fontSize: 14, color: cor.suave, marginBottom: 8 },
  corpo: { flex: 1 },
  conteudo: { paddingBottom: 24 },

  // filtro de mês
  filtro: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 8 },
  setaMes: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: cor.card, borderWidth: 1, borderColor: cor.linha },
  setaTexto: { fontSize: 22, color: cor.marca },
  mesTexto: { fontSize: 17, fontWeight: '600', color: cor.tinta, textTransform: 'capitalize' },

  // cartões e textos
  card: { backgroundColor: cor.card, borderRadius: 10, borderWidth: 1, borderColor: cor.linha, padding: 14, marginBottom: 12 },
  cardTitulo: { fontSize: 15, fontWeight: '600', color: cor.tinta, marginBottom: 10 },
  total: { fontSize: 34, fontWeight: '700', color: cor.tinta },
  rotulo: { fontSize: 13, color: cor.suave },
  variacao: { fontSize: 14, fontWeight: '600', marginTop: 4 },

  // gráficos
  linhaBarra: { marginBottom: 10 },
  linhaBarraTopo: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  trilho: { height: 12, borderRadius: 6, backgroundColor: cor.marcaClara, overflow: 'hidden' },
  barra: { height: 12, borderRadius: 6, backgroundColor: cor.marca },
  meses: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 130 },
  colunaMes: { flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  colunaBarra: { width: '60%', borderTopLeftRadius: 4, borderTopRightRadius: 4, backgroundColor: cor.marcaClara },
  colunaAtual: { backgroundColor: cor.marca },
  colunaRotulo: { fontSize: 11, color: cor.suave, marginTop: 4 },

  // formulários
  label: { fontSize: 14, fontWeight: '600', color: cor.tinta, marginTop: 8, marginBottom: 4 },
  input: { backgroundColor: cor.card, borderWidth: 1, borderColor: cor.linha, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 16, color: cor.tinta },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 4 },
  chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: cor.linha, backgroundColor: cor.card },
  chipAtivo: { backgroundColor: cor.marca, borderColor: cor.marca },
  chipTexto: { color: cor.tinta, fontSize: 14 },
  chipTextoAtivo: { color: '#fff' },
  botao: { backgroundColor: cor.marca, borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 12 },
  botaoOpaco: { opacity: 0.5 },
  textoBotao: { color: '#fff', fontWeight: '600', fontSize: 16 },
  botaoLink: { paddingVertical: 10, alignItems: 'center' },
  textoLink: { color: cor.marca, fontWeight: '600' },
  erro: { color: cor.erro, marginTop: 8 },
  vazio: { textAlign: 'center', color: cor.suave, marginTop: 24 },

  // itens de lista
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: cor.card, borderRadius: 10, borderWidth: 1, borderColor: cor.linha, padding: 12, marginBottom: 8 },
  itemInfo: { flex: 1 },
  itemTitulo: { fontSize: 16, color: cor.tinta, fontWeight: '600' },
  itemSub: { fontSize: 13, color: cor.suave, marginTop: 2 },
  itemValor: { fontSize: 16, fontWeight: '700', color: cor.tinta, marginRight: 12 },
  acao: { paddingHorizontal: 10, paddingVertical: 8 },
  acaoTexto: { color: cor.marca, fontWeight: '600' },
  acaoExcluir: { color: cor.erro },

  // abas
  abas: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: cor.linha, backgroundColor: cor.card },
  aba: { flex: 1, paddingVertical: 14, alignItems: 'center', borderTopWidth: 3, borderTopColor: 'transparent' },
  abaAtiva: { borderTopColor: cor.marca },
  abaTexto: { color: cor.suave, fontWeight: '600' },
  abaTextoAtivo: { color: cor.marca },
});
