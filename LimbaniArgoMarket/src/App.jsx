import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './page/Home'
import Categories from './page/Categories'
import Dealers from './page/Dealers'
import About from './page/About'
import Equipments from './page/Equipments'
import EquipmentDetails from './page/EquipmentDetails'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/equipments' element={<Equipments />} />
          <Route path='/equipment/:id' element={<EquipmentDetails />} />
          <Route path='/dealers' element={<Dealers />} />
          <Route path='/about' element={<About />} />
        </Route>
        <Route path='*' element={<div className="text-center py-stack-lg text-headline-lg text-on-surface">404 Page Not Found</div>} />
      </Routes>
    </>
  )
}

export default App
