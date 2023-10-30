import { Route, Routes } from 'react-router-dom'
import UsersList from '../pages/UsersList'
import UserForm from '../pages/UserForm'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<UsersList />} />
      <Route path="user-form" element={<UserForm />} />
    </Routes>
  )
}
