import { Helmet } from 'react-helmet-async';
import FlightCard from '../components/FlightCard.jsx';
import { flights } from '../data/flights.js';

export default function Passagens() {
  return (
    <section>
      <Helmet><title>Passagens • Pacotes de Viagens</title></Helmet>
      <h2 className="section-title">Passagens aéreas</h2>
      <div className="grid">
        {flights.map((f, i) => (
          <FlightCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}
