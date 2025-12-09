import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CreateRecipe from './pages/CreateRecipe'
import MyRecipes from './pages/MyRecipes'
import MyAccount from './pages/MyAccount'


export function App() {

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path='/my-recipes' element={<MyRecipes />} />
        <Route path='/my-account' element={<MyAccount />} />
      </Routes>
      
      </div>

      <Footer />
      </div>
    </BrowserRouter>
  )
}



export default App
