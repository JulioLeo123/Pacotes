import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { packages } from '../data/packages.js';
import { currencyBRL } from '../lib/format.js';

function buildDetails(pkg) {
  const lines = [];
  if (pkg.location) lines.push(`Destino: ${pkg.location}`);
  if (pkg.nights) lines.push(`${pkg.nights} noite${pkg.nights > 1 ? 's' : ''} de hospedagem`);
  if (pkg.price && pkg.price > 0) lines.push(`Preço a partir de ${currencyBRL(pkg.price)}`);
  // Conteúdo adicional genérico
  const inclusions = [
    'Passagens aéreas ida e volta (quando aplicável)',
    'Traslado aeroporto ↔ hotel',
    'Café da manhã incluso',
    'Assistência viagem básica',
  ];
  const policies = [
    'Valores e disponibilidade sujeitos a alteração sem aviso prévio',
    'Tarifas válidas para datas selecionadas',
    'Consulte regras de cancelamento e remarcação',
  ];
  return { lines, inclusions, policies };
}

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = packages.find((p) => String(p.id) === String(id));

  if (!pkg) {
    return (
      <section>
        <Helmet><title>Pacote não encontrado • Pacotes</title></Helmet>
        <h2 className="section-title">Pacote não encontrado</h2>
        <p className="muted">Verifique o endereço ou navegue pelos pacotes disponíveis.</p>
        <p style={{ marginTop: '.8rem' }}>
          <Link to="/pacotes" className="btn">Ver todos os pacotes</Link>
        </p>
      </section>
    );
  }

  const { lines, inclusions, policies } = buildDetails(pkg);

  // Dados simulados para voo/hotel/previsão/comentários
  const flight = {
    from: 'São Paulo (GRU)', to: (pkg.location || 'Destino'), airline: 'LATAM', when: 'próxima janela',
    price: Math.max(790, Math.round((pkg.price || 2000) * 0.35))
  };
  const hotel = {
    name: 'Hotel Selecionado', city: pkg.location || '—', nights: pkg.nights || 3,
    pricePerNight: Math.max(320, Math.round((pkg.price || 2000) / ((pkg.nights || 3) * 4)))
  };
  const weather = {
    summary: 'Parcialmente nublado', tempMin: 18, tempMax: 27, rainChance: 20
  };
  const reviews = [
    { user: 'Ana', rating: 5, text: 'Experiência incrível! Tudo muito organizado.' },
    { user: 'Bruno', rating: 4, text: 'Valeu muito o custo-benefício. Recomendo.' },
    { user: 'Carol', rating: 4, text: 'Hotel excelente e voo pontual.' },
  ];

  return (
    <section>
      <Helmet><title>{pkg.title} • Detalhes do pacote</title></Helmet>
      <nav aria-label="breadcrumb" style={{ marginBottom: '.6rem' }}>
        <Link className="btn" to="/pacotes">← Voltar</Link>
      </nav>

      <div className="card" style={{ overflow: 'hidden' }}>
        {pkg.image && <img src={pkg.image} alt={pkg.title} loading="eager" style={{ height: 260, objectFit: 'cover', width: '100%' }} />}
        <div className="body">
          <h2 className="title" style={{ fontSize: '1.4rem' }}>{pkg.title}</h2>
          <p className="muted" style={{ margin: '.2rem 0 .8rem' }}>{[pkg.location, pkg.nights ? `${pkg.nights} noites` : null].filter(Boolean).join(' • ')}</p>

          {lines.length > 0 && (
            <ul style={{ margin: '0 0 .8rem 1rem' }}>
              {lines.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          )}

          {/* Blocos detalhados */}
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Voo</h3>
              <p className="muted">{flight.from} → {flight.to}</p>
              <p className="muted">{flight.airline} • {flight.when}</p>
              <p><strong>{currencyBRL(flight.price)}</strong></p>
            </div>

            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Hotel</h3>
              <p className="muted">{hotel.name}</p>
              <p className="muted">{hotel.city} • {hotel.nights} noites</p>
              <p><strong>{currencyBRL(hotel.pricePerNight)}/noite</strong></p>
            </div>

            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Previsão do tempo</h3>
              <p className="muted">{weather.summary}</p>
              <p className="muted">{weather.tempMin}°C ~ {weather.tempMax}°C • {weather.rainChance}% chuva</p>
            </div>
          </div>

          <div className="card" style={{ padding: '.9rem', marginTop: '.9rem' }}>
            <h3 className="title">Avaliações</h3>
            <ul style={{ margin: '.4rem 0 0 1rem' }}>
              {reviews.map((r, i) => (
                <li key={i}>
                  <strong>{r.user}</strong> — {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  <div className="muted">{r.text}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', marginTop: '.9rem' }}>
            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">O que inclui</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>
                {inclusions.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>

            <div className="card" style={{ padding: '.9rem' }}>
              <h3 className="title">Políticas</h3>
              <ul style={{ margin: '.4rem 0 0 1rem' }}>
                {policies.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>

          <div className="actions" style={{ marginTop: '.9rem' }}>
            <Link className="cta" to={`/pagamento?id=${pkg.id}`}>Comprar agora</Link>
            <Link className="btn" to="/pacotes">Explorar mais pacotes</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
