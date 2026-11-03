import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dashboard from './components/Dashboard';
import Lancamentos from './components/Lancamentos';
import Materiais from './components/Materiais';
import { iniciarPWA } from './pwa';
import { hoje, moveMes, nomeMes } from './utils';
import styles from './styles';

const CHAVE = '@gastos-materiais:dados';
const ABAS = [['dashboard', 'Dashboard'], ['lancamentos', 'Lançamentos'], ['materiais', 'Materiais']];

export default function App() {
  const [aba, setAba] = useState('dashboard');
  const [mes, setMes] = useState(hoje().slice(0, 7));
  const [materiais, setMateriais] = useState([]);
  const [lancamentos, setLancamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [podeSalvar, setPodeSalvar] = useState(false);
  const [erro, setErro] = useState('');
  const proximoId = useRef(0);
  const filaDeSalvamento = useRef(Promise.resolve());

  useEffect(() => { iniciarPWA(); }, []);

  // Carrega os dados uma vez, antes de permitir alterações.
  useEffect(() => {
    let ativo = true;
    async function carregar() {
      try {
        const salvo = await AsyncStorage.getItem(CHAVE);
        const dados = salvo ? JSON.parse(salvo) : {};
        const mats = Array.isArray(dados.materiais) ? dados.materiais : [];
        const lans = Array.isArray(dados.lancamentos) ? dados.lancamentos : [];
        const matsOk = mats.filter(m => m && typeof m.id === 'string' && typeof m.nome === 'string');
        const lansOk = lans.filter(l =>
          l && typeof l.id === 'string' && typeof l.materialId === 'string' &&
          typeof l.valor === 'number' && typeof l.data === 'string'
        );
        if (ativo) {
          setMateriais(matsOk.map(m => ({ ...m, unidade: m.unidade || '' })));
          setLancamentos(lansOk.map(l => ({ ...l, fornecedor: l.fornecedor || '', obs: l.obs || '' })));
          setPodeSalvar(true);
        }
      } catch {
        if (ativo) setErro('Não foi possível ler os dados. Os dados ficarão temporários nesta sessão.');
      } finally {
        if (ativo) setCarregando(false);
      }
    }
    carregar();
    return () => { ativo = false; };
  }, []);

  // Espera o carregamento; salva alterações na ordem em que ocorreram.
  useEffect(() => {
    if (carregando || !podeSalvar) return;
    const dados = JSON.stringify({ materiais, lancamentos });
    filaDeSalvamento.current = filaDeSalvamento.current
      .then(() => AsyncStorage.setItem(CHAVE, dados))
      .catch(() => setErro('Não foi possível salvar a última alteração.'));
  }, [materiais, lancamentos, carregando, podeSalvar]);

  const novoId = () => `${Date.now()}-${proximoId.current++}`;

  function adicionarLancamento(l) {
    if (carregando) return;
    setLancamentos(lista => [...lista, { ...l, id: novoId() }]);
    setMes(l.data.slice(0, 7)); // mostra o mês do gasto recém-lançado
  }

  function excluirLancamento(id) {
    setLancamentos(lista => lista.filter(l => l.id !== id));
  }

  function salvarMaterial({ id, nome, unidade }) {
    if (carregando) return;
    if (id) setMateriais(lista => lista.map(m => (m.id === id ? { ...m, nome, unidade } : m)));
    else setMateriais(lista => [...lista, { id: novoId(), nome, unidade }]);
  }

  // Retorna uma mensagem de erro quando não pode excluir.
  function excluirMaterial(id) {
    if (lancamentos.some(l => l.materialId === id))
      return 'Este material tem gastos lançados. Exclua os gastos antes de remover o material.';
    setMateriais(lista => lista.filter(m => m.id !== id));
    return '';
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <Text style={styles.titulo}>Gastos com Materiais</Text>
            <Text style={styles.subtitulo}>Acompanhe quanto você gasta por mês e por material.</Text>

            {aba !== 'materiais' && (
              <View style={styles.filtro}>
                <Pressable style={styles.setaMes} onPress={() => setMes(m => moveMes(m, -1))}
                  accessibilityRole="button" accessibilityLabel="Mês anterior">
                  <Text style={styles.setaTexto}>‹</Text>
                </Pressable>
                <Text style={styles.mesTexto}>{nomeMes(mes)}</Text>
                <Pressable style={styles.setaMes} onPress={() => setMes(m => moveMes(m, 1))}
                  accessibilityRole="button" accessibilityLabel="Próximo mês">
                  <Text style={styles.setaTexto}>›</Text>
                </Pressable>
              </View>
            )}

            {erro ? <Text style={styles.erro} accessibilityRole="alert">{erro}</Text> : null}
            {carregando ? <Text style={styles.vazio}>Carregando...</Text> : null}

            {!carregando && aba === 'dashboard' && (
              <Dashboard lancamentos={lancamentos} materiais={materiais} mes={mes} />
            )}
            {!carregando && aba === 'lancamentos' && (
              <Lancamentos lancamentos={lancamentos} materiais={materiais} mes={mes}
                onAdicionar={adicionarLancamento} onExcluir={excluirLancamento} />
            )}
            {!carregando && aba === 'materiais' && (
              <Materiais materiais={materiais} onSalvar={salvarMaterial} onExcluir={excluirMaterial} />
            )}
          </View>
        </KeyboardAvoidingView>

        <View style={styles.abas}>
          {ABAS.map(([id, rotulo]) => (
            <Pressable key={id} onPress={() => setAba(id)} accessibilityRole="tab"
              accessibilityState={{ selected: aba === id }}
              style={[styles.aba, aba === id && styles.abaAtiva]}>
              <Text style={[styles.abaTexto, aba === id && styles.abaTextoAtivo]}>{rotulo}</Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
