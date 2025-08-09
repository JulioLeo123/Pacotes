import { Helmet } from 'react-helmet-async';

export default function Clube() {
  return (
    <section>
      <Helmet><title>Clube • Pacotes de Viagens</title></Helmet>
      <h2 className="section-title">Clube de Vantagens</h2>
      <div className="card" style={{ padding: '1rem' }}>
        <p className="muted">Assine o nosso Clube e ganhe até 20% OFF em pacotes, tarifas exclusivas de passagens e upgrades em hotéis.</p>
        <ul>
          <li>Desconto imediato em reservas</li>
          <li>Acúmulo de pontos que viram diárias</li>
          <li>Atendimento prioritário</li>
          <li>Ofertas secretas toda semana</li>
        </ul>
        <div className="actions" style={{ marginTop: '.8rem' }}>
          <button className="cta">Assinar por R$ 19,90/mês</button>
          <button className="btn">Conhecer benefícios</button>
        </div>
      </div>
    </section>
  );
}
