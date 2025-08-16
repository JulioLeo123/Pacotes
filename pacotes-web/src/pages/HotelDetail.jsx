import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { hotels } from '../data/hotels.js';
import { currencyBRL } from '../lib/format.js';

export default function HotelDetail() {
  const { idx } = useParams();
  const i = Number(idx);
  const h = Number.isFinite(i) ? hotels[i] : undefined;

  if (!h) {
    return (
      <section>
        <Helmet><title>Hotel não encontrado • Pacotes</title></Helmet>
        <h2 className="section-title">Hotel não encontrado</h2>
        <p className="muted">Verifique o endereço ou escolha outro hotel.</p>
        <p style={{ marginTop: '.8rem' }}><Link to="/hoteis" className="btn">Voltar para Hotéis</Link></p>
      </section>
    );
  }

  const amenities = [
    'Wi-Fi gratuito',
    'Piscina e academia',
    'Café da manhã incluso',
    'Recepção 24h',
  ];
  const policies = [
    'Check-in a partir das 14h e check-out até 12h',
    'Cancelamento grátis até 48h antes',
    'Impostos e taxas podem variar por cidade',
  ];

  return (
    <section>
      <Helmet><title>{h.name} • Detalhes do hotel</title></Helmet>
      <nav aria-label="breadcrumb" style={{ marginBottom: '.6rem' }}>
        <Link className="btn" to="/hoteis">← Voltar</Link>
      </nav>
      <div className="card" style={{ overflow: 'hidden' }}>
        {h.image && <img src={h.image} alt={h.name} loading="eager" style={{ height: 260, objectFit: 'cover', width: '100%' }} />}
        <div className="body">
          <h2 className="title" style={{ fontSize: '1.4rem' }}>{h.name}</h2>
          <p className="muted">{h.city} • {h.nights} noites</p>
          <p style={{ margin: '.6rem 0' }}><strong>{currencyBRL(h.pricePerNight)}/noite</strong></p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Comodidades</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>{amenities.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Políticas</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>{policies.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          </div>

          <div className="actions" style={{ marginTop: '.9rem' }}>
            <Link className="cta" to="/pagamento">Reservar agora</Link>
            <Link className="btn" to="/hoteis">Ver outros hotéis</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
