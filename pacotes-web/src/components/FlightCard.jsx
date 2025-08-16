import { currencyBRL } from '../lib/format.js';
import { Link } from 'react-router-dom';

export default function FlightCard({ idx, from, to, airline, when, price, image }) {
  return (
    <article className="card">
      {image ? <img src={image} alt={`${from} → ${to}`} loading="lazy" /> : <div style={{height:160, background:'#0f172a'}} />}
      <div className="body">
        <h3 className="title">{from} → {to}</h3>
        <p className="muted">{airline} • {when}</p>
        <div className="row">
          <span className="price">{currencyBRL(price)}</span>
          <Link className="btn" to={`/passagens/${idx}`}>Selecionar</Link>
        </div>
      </div>
    </article>
  );
}
