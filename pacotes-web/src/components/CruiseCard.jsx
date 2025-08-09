import { currencyBRL } from '../lib/format.js';

export default function CruiseCard({ route, ship, nights, price, image }) {
  return (
    <article className="card">
      {image ? <img src={image} alt={route} loading="lazy" /> : <div style={{height:160, background:'#0f172a'}} />}
      <div className="body">
        <h3 className="title">{route}</h3>
        <p className="muted">Navio {ship} • {nights} noites</p>
        <div className="row">
          <span className="price">{currencyBRL(price)}</span>
          <button className="btn" onClick={() => alert('Simulação: escolher cruzeiro')}>Escolher</button>
        </div>
      </div>
    </article>
  );
}
