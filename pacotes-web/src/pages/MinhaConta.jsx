import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function MinhaConta() {
  const { currentUser, updateProfile, changePassword, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!currentUser) {
      const from = encodeURIComponent(location.pathname + location.search)
      navigate(`/login?from=${from}`, { replace: true })
    }
  }, [currentUser, location.pathname, location.search, navigate])

  if (!currentUser) return null

  const profileSchema = z.object({ name: z.string().min(3, 'Informe seu nome completo') })
  const passwordSchema = z.object({
    currentPassword: z.string().min(6, 'Mínimo de 6 caracteres'),
    newPassword: z.string().min(6, 'Mínimo de 6 caracteres'),
  })

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: currentUser.name },
  })
  const pwdForm = useForm({ resolver: zodResolver(passwordSchema) })

  const onUpdateProfile = async (data) => {
    try {
      await updateProfile(data)
      alert('Perfil atualizado!')
    } catch (e) {
      alert(e.message || 'Erro ao atualizar perfil')
    }
  }
  const onChangePwd = async (data) => {
    try {
      await changePassword(data)
      alert('Senha alterada!')
      pwdForm.reset()
    } catch (e) {
      alert(e.message || 'Erro ao alterar senha')
    }
  }

  return (
    <section>
      <Helmet><title>Minha conta • Pacotes</title></Helmet>
      <h2 className="section-title">Minha conta</h2>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <p><strong>Nome:</strong> {currentUser.name}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
      </div>

      <div className="grid" style={{ gap: '1rem' }}>
        <form className="form card" onSubmit={profileForm.handleSubmit(onUpdateProfile)} noValidate>
          <h3>Atualizar perfil</h3>
          <label>
            Nome completo
            <input type="text" {...profileForm.register('name')} />
            {profileForm.formState.errors.name && <span className="muted">{profileForm.formState.errors.name.message}</span>}
          </label>
          <div className="actions">
            <button type="submit" className="cta" disabled={profileForm.formState.isSubmitting}>
              {profileForm.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>

        <form className="form card" onSubmit={pwdForm.handleSubmit(onChangePwd)} noValidate>
          <h3>Trocar senha</h3>
          <label>
            Senha atual
            <input type="password" {...pwdForm.register('currentPassword')} />
            {pwdForm.formState.errors.currentPassword && <span className="muted">{pwdForm.formState.errors.currentPassword.message}</span>}
          </label>
          <label>
            Nova senha
            <input type="password" {...pwdForm.register('newPassword')} />
            {pwdForm.formState.errors.newPassword && <span className="muted">{pwdForm.formState.errors.newPassword.message}</span>}
          </label>
          <div className="actions">
            <button type="submit" className="cta" disabled={pwdForm.formState.isSubmitting}>
              {pwdForm.formState.isSubmitting ? 'Atualizando...' : 'Atualizar senha'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <button className="btn" onClick={() => { logout(); navigate('/'); }}>Sair da conta</button>
      </div>
    </section>
  )
}
