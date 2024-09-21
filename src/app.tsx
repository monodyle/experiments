import './app.css'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout'
import Routers from './routes'

export default function App() {
  return (
    <BrowserRouter>
      <Layout className="flex">
        <Routers />
      </Layout>
    </BrowserRouter>
  )
}
