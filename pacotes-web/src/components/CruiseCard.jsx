import { currencyBRL } from '../lib/format.js';
import { Link } from 'react-router-dom';

export default function CruiseCard({ idx, route, ship, nights, price, image }) {
  return (
    <article className="card">
      {image ? <img src={image} alt={route} loading="lazy" /> : <div style={{height:160, background:'#0f172a'}} />}
      <div className="body">
        <h3 className="title">{route}</h3>
        <p className="muted">Navio {ship} • {nights} noites</p>
        <div className="row">
          <span className="price">{currencyBRL(price)}</span>
          <Link className="btn" to={`/cruzeiros/${idx}`}>Escolher</Link>
        </div>
      </div>
    </article>
  );
}
