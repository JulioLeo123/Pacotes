import { Helmet } from 'react-helmet-async';
import CruiseCard from '../components/CruiseCard.jsx';
import { cruises } from '../data/cruises.js';

export default function Cruzeiros() {
  return (
    <section>
      <Helmet><title>Cruzeiros • Pacotes de Viagens</title></Helmet>
      <h2 className="section-title">Cruzeiros</h2>
      <div className="grid">
        {cruises.map((c, i) => (
          <CruiseCard key={i} idx={i} {...c} />
        ))}
      </div>
    </section>
  );
}
