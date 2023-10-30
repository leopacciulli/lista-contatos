import React, { useState } from 'react'
import { schema } from '../../utils/formValidator'
import InputMask from 'react-input-mask'
import { ValidationError } from 'yup'
import { TailSpin } from 'react-loader-spinner'
import Input from '../../components/Input'
import { User } from '../../components/UserCard'
import { toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import './styles.scss'

interface UserFormProps {
  isEditing?: boolean
  closeModal?: () => void
}

function UserForm({ closeModal, isEditing = false }: UserFormProps) {
  const userLocalStorage = localStorage.getItem('userToEdit')
  const userToEdit: User = JSON.parse(userLocalStorage || '{}')
  const usersLocalStorage = localStorage.getItem('users')
  const users: User[] = JSON.parse(usersLocalStorage || '{}')

  const [formData, setFormData] = useState({
    name: userToEdit?.name || '',
    cpf: userToEdit?.cpf || '',
    phone: userToEdit?.phone || '',
    email: userToEdit?.email || '',
  })
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    cpf: '',
    phone: '',
    email: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      // Validação do formulário
      await schema.validate(formData, { abortEarly: false })

      // Validação passou e o usuário será adicionado na lista (storage) ou editado
      if (isEditing) {
        const user = users.find((user) => user.cpf === userToEdit.cpf)
        if (user) {
          user.name = formData.name
          user.email = formData.email
          user.phone = formData.phone
          localStorage.setItem('users', JSON.stringify(users))
          toast('Usuário editado com sucesso.', {
            type: 'success',
            autoClose: 3000,
          })
          if (closeModal) {
            closeModal()
          }
        }
      } else {
        toast('Usuário cadastrado com sucesso.', {
          type: 'success',
          autoClose: 3000,
        })
        const newUsersList = [...users, formData]
        localStorage.setItem('users', JSON.stringify(newUsersList))
      }

      setFormData({ name: '', cpf: '', phone: '', email: '' })
      setFieldErrors({ name: '', cpf: '', phone: '', email: '' })
      setIsLoading(false)
    } catch (error: unknown) {
      // Gerenciamento dos erros encontrados no formulário
      const validationErrors: any = {}
      if (error instanceof ValidationError && error.inner) {
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message
        })
      }
      setFieldErrors(validationErrors)
      setIsLoading(false)
    }
  }

  const loadingComponent = () => {
    return (
      <TailSpin
        height="30"
        width="30"
        color="#FFF"
        ariaLabel="tail-spin-loading"
        radius="1"
        strokeWidth={2}
      />
    )
  }

  const isButtonDisabled =
    !formData.name || !formData.cpf || !formData.email || !formData.phone

  const buttonTitle = isEditing ? 'Editar' : 'Cadastrar'

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="inputField">
          <Input
            label="Nome completo (sem abreviações)"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            error={Boolean(fieldErrors.name)}
            errorMessage={fieldErrors.name}
          />
        </div>
        <div className="inputField">
          <Input
            label="E-mail"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
            error={Boolean(fieldErrors.email)}
            errorMessage={fieldErrors.email}
          />
        </div>
        <div className="inputField">
          <InputMask
            mask="999.999.999-99"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
            disabled={isEditing}
          >
            <Input
              label="CPF"
              error={Boolean(fieldErrors.cpf)}
              errorMessage={fieldErrors.cpf}
            />
          </InputMask>
        </div>
        <div className="inputField">
          <InputMask
            mask="(99) 99999-9999"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          >
            <Input
              label="Telefone"
              error={Boolean(fieldErrors.phone)}
              errorMessage={fieldErrors.phone}
            />
          </InputMask>
        </div>

        <button type="submit" disabled={isButtonDisabled}>
          {isLoading ? loadingComponent() : buttonTitle}
        </button>
      </form>
    </div>
  )
}

export default UserForm
