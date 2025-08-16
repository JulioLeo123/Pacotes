import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { cruises } from '../data/cruises.js';
import { currencyBRL } from '../lib/format.js';

export default function CruiseDetail() {
  const { idx } = useParams();
  const i = Number(idx);
  const c = Number.isFinite(i) ? cruises[i] : undefined;

  if (!c) {
    return (
      <section>
        <Helmet><title>Cruzeiro não encontrado • Pacotes</title></Helmet>
        <h2 className="section-title">Cruzeiro não encontrado</h2>
        <p className="muted">Verifique o endereço ou escolha outro cruzeiro.</p>
        <p style={{ marginTop: '.8rem' }}><Link to="/cruzeiros" className="btn">Voltar para Cruzeiros</Link></p>
      </section>
    );
  }

  const itinerary = [
    'Dia 1: Embarque e navegação',
    'Dia 2: Parada 1 (city tour)',
    'Dia 3: Parada 2 (praias)',
    'Dia 4: Navegação com atividades a bordo',
  ];
  const shipInfo = [
    'Piscinas, spa, academia, teatro e restaurantes',
    'Entretenimento diário incluso',
    'Cabines internas/externas/suíte (varia conforme tarifa)',
  ];

  return (
    <section>
      <Helmet><title>{c.route} • Detalhes do cruzeiro</title></Helmet>
      <nav aria-label="breadcrumb" style={{ marginBottom: '.6rem' }}>
        <Link className="btn" to="/cruzeiros">← Voltar</Link>
      </nav>
      <div className="card" style={{ overflow: 'hidden' }}>
        {c.image && <img src={c.image} alt={c.route} loading="eager" style={{ height: 260, objectFit: 'cover', width: '100%' }} />}
        <div className="body">
          <h2 className="title" style={{ fontSize: '1.4rem' }}>{c.route}</h2>
          <p className="muted">Navio {c.ship} • {c.nights} noites</p>
          <p style={{ margin: '.6rem 0' }}><strong>{currencyBRL(c.price)}</strong></p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Roteiro</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>{itinerary.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Sobre o navio</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>{shipInfo.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          </div>

          <div className="actions" style={{ marginTop: '.9rem' }}>
            <Link className="cta" to="/pagamento">Reservar agora</Link>
            <Link className="btn" to="/cruzeiros">Ver outros cruzeiros</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
