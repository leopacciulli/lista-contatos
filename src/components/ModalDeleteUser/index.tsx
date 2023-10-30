import ReactModal from 'react-modal'
import { User } from '../UserCard'

import './styles.scss'

const customModalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '450px',
  },
}

interface ModalDeleteUserProps {
  isDeleteUserModalOpen: boolean
  setIsDeleteUserModalOpen: (value: boolean) => void
  onDeleteUser: (user: User) => void
}

function ModalDeleteUser({
  isDeleteUserModalOpen,
  setIsDeleteUserModalOpen,
  onDeleteUser,
}: ModalDeleteUserProps) {
  const userLocalStorage = localStorage.getItem('userToDelete')
  const userToDelete: User = JSON.parse(userLocalStorage || '{}')

  const closeModal = () => {
    setIsDeleteUserModalOpen(false)
  }

  const deleteUser = () => {
    onDeleteUser(userToDelete)
    setIsDeleteUserModalOpen(false)
  }

  return (
    <ReactModal
      onRequestClose={closeModal}
      isOpen={isDeleteUserModalOpen}
      style={customModalStyle}
      overlayClassName="overlayModal"
    >
      <div className="modalDelete">
        <div className="title">Deseja deletar o usuário?</div>
        <div className="flexButtons">
          <button className="cancel" onClick={closeModal}>
            Cancelar
          </button>
          <button className="deleteUser" onClick={deleteUser}>
            Deletar
          </button>
        </div>
      </div>
    </ReactModal>
  )
}

export default ModalDeleteUser
