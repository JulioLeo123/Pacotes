import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Ir para a página inicial">
          <span className="logo" aria-hidden />
          <span>Pacotes de Viagens</span>
        </Link>
        <nav className="nav" aria-label="principal">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/pacotes">Pacotes</NavLink>
          <NavLink to="/passagens">Passagens</NavLink>
          <NavLink to="/hoteis">Hotéis</NavLink>
          <NavLink to="/cruzeiros">Cruzeiros</NavLink>
          <NavLink to="/clube">Clube</NavLink>
          <NavLink to="/destinos">Destinos</NavLink>
          <button
            className="btn btn-secondary"
            style={{ marginLeft: 12 }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
          >
            {theme === 'dark' ? '🌙 Escuro' : '☀️ Claro'}
          </button>
          {!currentUser ? (
            <>
              <NavLink to={`/login?from=${encodeURIComponent(location.pathname + location.search)}`}>Entrar</NavLink>
              <Link to={`/cadastro?from=${encodeURIComponent(location.pathname + location.search)}`} className="cta">Criar conta</Link>
            </>
          ) : (
            <ProfileDropdown currentUser={currentUser} logout={logout} navigate={navigate} />
          )}
        </nav>
      </div>
    </header>
  );
}
