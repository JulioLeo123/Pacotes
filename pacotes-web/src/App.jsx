import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Cadastro from './pages/Cadastro.jsx';
import Payment from './pages/Payment.jsx';
import Success from './pages/Success.jsx';
import NotFound from './pages/NotFound.jsx';
import Pacotes from './pages/Pacotes.jsx';
import Passagens from './pages/Passagens.jsx';
import Hoteis from './pages/Hoteis.jsx';
import Cruzeiros from './pages/Cruzeiros.jsx';
import Clube from './pages/Clube.jsx';
import Destinos from './pages/Destinos.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pacotes" element={<Pacotes />} />
          <Route path="/passagens" element={<Passagens />} />
          <Route path="/hoteis" element={<Hoteis />} />
          <Route path="/cruzeiros" element={<Cruzeiros />} />
          <Route path="/clube" element={<Clube />} />
          <Route path="/destinos" element={<Destinos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/pagamento" element={<Payment />} />
          <Route path="/finalizacao" element={<Success />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Pacotes de Viagens</footer>
    </>
  );
}
