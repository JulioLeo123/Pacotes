import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <section>
      <Helmet><title>Página não encontrada • Pacotes</title></Helmet>
      <h2 className="section-title">404 • Página não encontrada</h2>
      <p className="muted">Verifique o endereço ou volte para a página inicial.</p>
      <p style={{ marginTop: '.8rem' }}>
        <Link to="/" className="cta">Ir para Home</Link>
      </p>
    </section>
  );
}