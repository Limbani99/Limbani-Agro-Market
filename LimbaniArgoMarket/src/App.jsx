import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './page/Home'
import Categories from './page/Categories'
import Dealers from './page/Dealers'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/dealers' element={<Dealers />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
