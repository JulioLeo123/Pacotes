import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KEY_USERS = 'pv_users';
const KEY_SESSION = 'pv_session';

function loadUsers() {
  try { return JSON.parse(localStorage.getItem(KEY_USERS)) || []; } catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(KEY_USERS, JSON.stringify(users));
}
function loadSession() {
  try { return JSON.parse(localStorage.getItem(KEY_SESSION)) || null; } catch { return null; }
}
function saveSession(user) {
  if (user) localStorage.setItem(KEY_SESSION, JSON.stringify(user));
  else localStorage.removeItem(KEY_SESSION);
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => loadUsers());
  const [currentUser, setCurrentUser] = useState(() => loadSession());

  useEffect(() => { saveUsers(users); }, [users]);
  useEffect(() => { saveSession(currentUser); }, [currentUser]);

  const register = async ({ name, email, password }) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Email já cadastrado');
    const user = { id: crypto.randomUUID(), name, email, password }; // para demo, sem hash
    setUsers((prev) => [...prev, user]);
    setCurrentUser({ id: user.id, name: user.name, email: user.email });
    return user;
  };

  const login = async ({ email, password }) => {
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found || found.password !== password) throw new Error('Credenciais inválidas');
    setCurrentUser({ id: found.id, name: found.name, email: found.email });
    return found;
  };

  const logout = () => setCurrentUser(null);

  const updateProfile = async ({ name }) => {
    if (!currentUser) throw new Error('Não autenticado');
    if (!name || name.trim().length < 3) throw new Error('Nome inválido');
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, name } : u)));
    setCurrentUser((prev) => ({ ...prev, name }));
  };

  const changePassword = async ({ currentPassword, newPassword }) => {
    if (!currentUser) throw new Error('Não autenticado');
    const user = users.find((u) => u.id === currentUser.id);
    if (!user) throw new Error('Usuário não encontrado');
    if (!currentPassword || user.password !== currentPassword) throw new Error('Senha atual incorreta');
    if (!newPassword || newPassword.length < 6) throw new Error('Nova senha muito curta');
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, password: newPassword } : u)));
  };

  const value = useMemo(() => ({ users, currentUser, register, login, logout, updateProfile, changePassword }), [users, currentUser]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  return ctx;
}
