import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './page/Home'
import Categories from './page/Categories'
import Dealers from './page/Dealers'
import About from './page/About'
import Equipments from './page/Equipments'
import EquipmentDetails from './page/EquipmentDetails'
import Profile from './page/Profile'
import Login from './auth/Login'
import Register from './auth/Register'
import DealerDetails from './page/DealerDetails'
import AddProduct from './page/AddProduct'
import AddDrivable from './page/AddDrivable'
import AddNonDrivable from './page/AddNonDrivable'
import NotFound from './page/NotFound'

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
          <Route path='/dealer/:id' element={<DealerDetails />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/add-drivable' element={<AddDrivable />} />
          <Route path='/add-nondrivable' element={<AddNonDrivable />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
