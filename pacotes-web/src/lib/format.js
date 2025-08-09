export const currencyBRL = (v) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

export function maskCardNumber(value = '') {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim();
}

export function maskExp(value = '') {
  const v = value.replace(/\D/g, '').slice(0, 4);
  if (v.length <= 2) return v;
  return `${v.slice(0, 2)}/${v.slice(2)}`;
}

export function maskCVC(value = '') {
  return value.replace(/\D/g, '').slice(0, 4);
}