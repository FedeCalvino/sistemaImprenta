import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CrearVenta } from './Route/CrearVenta'
import { NavBar } from './Route/NavBar'
import { Ventas } from './Route/Ventas'
import { Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavBar/>
    <Routes>
            <Route path='/' element={<CrearVenta/>}/>
            <Route path="/CrearVenta" element={<CrearVenta/>}/>
            <Route path="/Ventas" element={<Ventas/>}/>
            <Route path="/Clientes" element={<Ventas/>}/>
        </Routes>
    </>
  )
}

export default App
