import './styles.scss'

export type User = {
  name: string
  cpf: string
  phone: string
  email: string
}

interface UserProps {
  user: User
  onEdit: (user: User) => void
  onDelete: (user: User) => void
}

function UserCard({ user, onEdit, onDelete }: UserProps) {
  return (
    <div className="user">
      <div>Nome: {user.name}</div>
      <div>CPF: {user.cpf}</div>
      <div>Telefone: {user.phone}</div>
      <div>E-mail: {user.email}</div>
      <div className="flex">
        <button className="editUser" onClick={() => onEdit(user)}>
          Editar
        </button>
        <button className="deleteUser" onClick={() => onDelete(user)}>
          Deletar
        </button>
      </div>
    </div>
  )
}

export default UserCard
