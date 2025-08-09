import { Link } from 'react-router-dom';
import { currencyBRL } from '../lib/format.js';

export default function PackageCard({ id, title, location, nights, price, image }) {
  const subtitle = [location, nights ? `${nights} noites` : null].filter(Boolean).join(' • ');
  const hasPrice = typeof price === 'number' && price > 0;

  return (
    <article className="card">
      {image ? <img src={image} alt={title} loading="lazy" /> : <div style={{height:160, background:'#0f172a'}} />}
      <div className="body">
        <h3 className="title">{title}</h3>
        {subtitle && <p className="muted">{subtitle}</p>}
        <div className="row">
          <span className="price">{hasPrice ? currencyBRL(price) : 'Preço sob consulta'}</span>
          <Link className="btn" to={`/pagamento?id=${id}`} aria-label={`Comprar ${title}`}>
            Comprar
          </Link>
        </div>
      </div>
    </article>
  );
}