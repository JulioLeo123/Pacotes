import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { currencyBRL } from '../lib/format.js';

export default function Success() {
  const { state } = useLocation();
  const selected = state?.selected;

  return (
    <section>
      <Helmet><title>Compra concluída • Pacotes</title></Helmet>
      <h2 className="section-title">Compra concluída</h2>
      {selected ? (
        <p>Obrigado! Sua compra do pacote <strong>{selected.title}</strong> foi confirmada por {currencyBRL(selected.price)}.</p>
      ) : (
        <p>Obrigado! Seu pagamento foi confirmado.</p>
      )}
      <p style={{ marginTop: '.8rem' }}>
        <Link to="/" className="cta">Voltar para a Home</Link>
      </p>
    </section>
  );
}