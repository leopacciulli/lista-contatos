import Router from './routes'
import Header from './components/Header'
import { ToastContainer } from 'react-toastify'

import './App.scss'

function App() {
  return (
    <div data-test-id="app">
      <Header />
      <Router />
      <ToastContainer />
    </div>
  )
}

export default App
