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

          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
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
