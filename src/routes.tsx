import { RouterProvider as ReactAriaRouterProvider } from 'react-aria-components'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import ScrambleTextExample from './labs/scramble-text'
import UnderConstruction from './under-construction'

export const routes = {
  home: {
    path: '/',
    label: 'Home',
  },
  scramble_text: {
    path: '/scramble-text',
    label: 'Scramble Text',
  },
  wip: {
    path: '/wip',
    label: 'WIP',
  },
} as const

export default function Routers() {
  const navigate = useNavigate()
  return (
    <ReactAriaRouterProvider navigate={navigate}>
      <Routes>
        <Route path={routes.home.path} element={<ScrambleTextExample />} />
        <Route
          path={routes.scramble_text.path}
          element={<ScrambleTextExample />}
        />
        <Route path={routes.wip.path} element={<UnderConstruction />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ReactAriaRouterProvider>
  )
}
