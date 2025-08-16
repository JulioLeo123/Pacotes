import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { flights } from '../data/flights.js';
import { currencyBRL } from '../lib/format.js';

export default function FlightDetail() {
  const { idx } = useParams();
  const i = Number(idx);
  const f = Number.isFinite(i) ? flights[i] : undefined;

  if (!f) {
    return (
      <section>
        <Helmet><title>Voo não encontrado • Pacotes</title></Helmet>
        <h2 className="section-title">Voo não encontrado</h2>
        <p className="muted">Verifique o endereço ou escolha outra passagem.</p>
        <p style={{ marginTop: '.8rem' }}><Link to="/passagens" className="btn">Voltar para Passagens</Link></p>
      </section>
    );
  }

  const fareRules = [
    '1 bagagem de mão até 10kg inclusa',
    'Remarcação com taxa conforme tarifa',
    'Cancelamento com multa após 24h da compra',
  ];
  const flightInfo = [
    'Assentos padrão inclusos; marcação antecipada opcional',
    'Possibilidade de 1 escala dependendo da data',
    'Check-in online disponível 48h antes do voo',
  ];

  return (
    <section>
      <Helmet><title>{f.from} → {f.to} • Detalhes do voo</title></Helmet>
      <nav aria-label="breadcrumb" style={{ marginBottom: '.6rem' }}>
        <Link className="btn" to="/passagens">← Voltar</Link>
      </nav>
      <div className="card" style={{ overflow: 'hidden' }}>
        {f.image && <img src={f.image} alt={`${f.from} → ${f.to}`} loading="eager" style={{ height: 260, objectFit: 'cover', width: '100%' }} />}
        <div className="body">
          <h2 className="title" style={{ fontSize: '1.4rem' }}>{f.from} → {f.to}</h2>
          <p className="muted">{f.airline} • {f.when}</p>
          <p style={{ margin: '.6rem 0' }}><strong>{currencyBRL(f.price)}</strong></p>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Informações do voo</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>{flightInfo.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Regras tarifárias</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>{fareRules.map((t, i) => <li key={i}>{t}</li>)}</ul>
            </div>
          </div>

          <div className="actions" style={{ marginTop: '.9rem' }}>
            <Link className="cta" to="/pagamento">Reservar agora</Link>
            <Link className="btn" to="/passagens">Ver outras opções</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
