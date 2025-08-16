import { Helmet } from 'react-helmet-async';
import HotelCard from '../components/HotelCard.jsx';
import { hotels } from '../data/hotels.js';

export default function Hoteis() {
  return (
    <section>
      <Helmet><title>Hotéis • Pacotes de Viagens</title></Helmet>
      <h2 className="section-title">Hotéis</h2>
      <div className="grid">
        {hotels.map((h, i) => (
          <HotelCard key={i} idx={i} {...h} />
        ))}
      </div>
    </section>
  );
}
