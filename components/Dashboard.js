import { ScrollView, Text, View } from 'react-native';
import styles, { cor } from '../styles';
import { brl, moveMes, nomeMes, totalDoMes } from '../utils';

export default function Dashboard({ lancamentos, materiais, mes }) {
  const doMes = lancamentos.filter(l => l.data.startsWith(mes));
  const total = totalDoMes(lancamentos, mes);
  const anterior = totalDoMes(lancamentos, moveMes(mes, -1));
  const variacao = anterior > 0 ? ((total - anterior) / anterior) * 100 : null;

  const porMaterial = materiais
    .map(m => ({ nome: m.nome, valor: doMes.filter(l => l.materialId === m.id).reduce((s, l) => s + l.valor, 0) }))
    .filter(x => x.valor > 0)
    .sort((a, b) => b.valor - a.valor);
  const maior = porMaterial[0]?.valor || 1;

  const serie = [-5, -4, -3, -2, -1, 0].map(d => {
    const m = moveMes(mes, d);
    return { mes: m, valor: totalDoMes(lancamentos, m) };
  });
  const maiorMes = Math.max(...serie.map(s => s.valor), 1);

  const textoVar = variacao === null
    ? 'Sem dados do mês anterior para comparar'
    : `${variacao > 0 ? '▲' : variacao < 0 ? '▼' : '='} ${Math.abs(variacao).toFixed(1).replace('.', ',')}% em relação ao mês anterior`;
  const corVar = variacao === null || variacao === 0 ? cor.suave : variacao > 0 ? cor.alta : cor.baixa;

  return (
    <ScrollView style={styles.corpo} contentContainerStyle={styles.conteudo}>
      <View style={styles.card}>
        <Text style={styles.rotulo}>Total gasto em {nomeMes(mes)}</Text>
        <Text style={styles.total}>{brl(total)}</Text>
        <Text style={[styles.variacao, { color: corVar }]}>{textoVar}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Gasto por material</Text>
        {porMaterial.length === 0 && <Text style={styles.rotulo}>Nenhum lançamento neste mês.</Text>}
        {porMaterial.map(x => (
          <View key={x.nome} style={styles.linhaBarra}>
            <View style={styles.linhaBarraTopo}>
              <Text style={styles.itemSub}>{x.nome}</Text>
              <Text style={styles.itemSub}>{brl(x.valor)}</Text>
            </View>
            <View style={styles.trilho}>
              <View style={[styles.barra, { width: `${(x.valor / maior) * 100}%` }]} />
            </View>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Variação mensal (6 meses)</Text>
        <View style={styles.meses}>
          {serie.map((s, i) => (
            <View key={s.mes} style={styles.colunaMes}>
              <View style={[
                styles.colunaBarra,
                i === serie.length - 1 && styles.colunaAtual,
                { height: `${Math.max((s.valor / maiorMes) * 100, s.valor > 0 ? 4 : 1)}%` },
              ]} />
              <Text style={styles.colunaRotulo}>{nomeMes(s.mes, true)}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
