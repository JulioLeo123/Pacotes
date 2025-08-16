import { currencyBRL } from '../lib/format.js';
import { Link } from 'react-router-dom';

export default function HotelCard({ idx, name, city, nights, pricePerNight, image }) {
  return (
    <article className="card">
      {image ? <img src={image} alt={name} loading="lazy" /> : <div style={{height:160, background:'#0f172a'}} />}
      <div className="body">
        <h3 className="title">{name}</h3>
        <p className="muted">{city} • {nights} noites</p>
        <div className="row">
          <span className="price">{currencyBRL(pricePerNight)}/noite</span>
          <Link className="btn" to={`/hoteis/${idx}`}>Reservar</Link>
        </div>
      </div>
    </article>
  );
}
