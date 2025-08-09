import { currencyBRL } from '../lib/format.js';

export default function FlightCard({ from, to, airline, when, price, image }) {
  return (
    <article className="card">
      {image ? <img src={image} alt={`${from} → ${to}`} loading="lazy" /> : <div style={{height:160, background:'#0f172a'}} />}
      <div className="body">
        <h3 className="title">{from} → {to}</h3>
        <p className="muted">{airline} • {when}</p>
        <div className="row">
          <span className="price">{currencyBRL(price)}</span>
          <button className="btn" onClick={() => alert('Simulação: selecionar voo')}>Selecionar</button>
        </div>
      </div>
    </article>
  );
}
