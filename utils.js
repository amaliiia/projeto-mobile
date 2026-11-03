const p = n => String(n).padStart(2, '0');
export const brl = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export const hoje = () => { const d = new Date(); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`; };
export const moveMes = (m, delta) => {
  const [a, b] = m.split('-').map(Number);
  const d = new Date(a, b - 1 + delta, 1);
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}`;
};
export const nomeMes = (m, curto) => {
  const [a, b] = m.split('-').map(Number);
  return new Date(a, b - 1, 1).toLocaleDateString('pt-BR', curto ? { month: 'short' } : { month: 'long', year: 'numeric' });
};
export const num = s => parseFloat(String(s).replace(',', '.'));
export const dataValida = s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(`${s}T00:00:00`));
export const totalDoMes = (lista, mes) =>
  lista.filter(l => l.data.startsWith(mes)).reduce((s, l) => s + l.valor, 0);
