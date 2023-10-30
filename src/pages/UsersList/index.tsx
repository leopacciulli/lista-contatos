import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { USERS_LIST_URL } from '../../server/api'
import UserCard, { User } from '../../components/UserCard'
import ModalEditUser from '../../components/ModalEditUser'
import ModalDeleteUser from '../../components/ModalDeleteUser'

import './styles.scss'

function UsersList() {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const usersLocalStorage = localStorage.getItem('users')
    const users: User[] = JSON.parse(usersLocalStorage || '{}')
    if (!users) {
      const response = await axios.get(USERS_LIST_URL)
      const usersList = response.data
      localStorage.setItem('users', JSON.stringify(usersList))
      setUsers(usersList)
    } else {
      setUsers(users)
    }
  }

  const deleteUser = useCallback(
    (userToDelete: User) => {
      const newUsersList = users.filter(
        (user) => user.name !== userToDelete.name
      )
      setUsers(newUsersList)
      localStorage.setItem('users', JSON.stringify(newUsersList))
    },
    [users]
  )

  const editUser = useCallback((user: User) => {
    localStorage.setItem('userToEdit', JSON.stringify(user))
    setIsEditUserModalOpen(true)
  }, [])

  const openModalDeleteUser = useCallback((user: User) => {
    localStorage.setItem('userToDelete', JSON.stringify(user))
    setIsDeleteUserModalOpen(true)
  }, [])

  return (
    <div className="usersList">
      {users.length ? (
        <div className="gridList">
          {users.map((user, index) => (
            <UserCard
              key={index}
              user={user}
              onEdit={editUser}
              onDelete={openModalDeleteUser}
            />
          ))}
        </div>
      ) : (
        <div className="nonUser">Nenhum usuário cadastrado.</div>
      )}

      <ModalEditUser
        isEditUserModalOpen={isEditUserModalOpen}
        setIsEditUserModalOpen={setIsEditUserModalOpen}
        onUserEdit={getUsers}
      />

      <ModalDeleteUser
        isDeleteUserModalOpen={isDeleteUserModalOpen}
        setIsDeleteUserModalOpen={setIsDeleteUserModalOpen}
        onDeleteUser={deleteUser}
      />
    </div>
  )
}

export default UsersList
