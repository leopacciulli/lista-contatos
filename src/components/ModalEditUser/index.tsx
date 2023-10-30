import ReactModal from 'react-modal'
import UserForm from '../../pages/UserForm'
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

interface ModalEditUserProps {
  isEditUserModalOpen: boolean
  setIsEditUserModalOpen: (value: boolean) => void
  onUserEdit: () => void
}

function ModalEditUser({
  isEditUserModalOpen,
  setIsEditUserModalOpen,
  onUserEdit,
}: ModalEditUserProps) {
  const closeModal = () => {
    localStorage.removeItem('userToEdit')
    setIsEditUserModalOpen(false)
    onUserEdit()
  }

  return (
    <ReactModal
      onRequestClose={closeModal}
      isOpen={isEditUserModalOpen}
      style={customModalStyle}
      overlayClassName="overlayModal"
    >
      <div className="modalEdit">
        <div className="flexModal">
          <div className="title">Editar usuário</div>
          <button className="closeModal" onClick={closeModal}>
            X
          </button>
        </div>
        <UserForm isEditing closeModal={closeModal} />
      </div>
    </ReactModal>
  )
}

export default ModalEditUser
