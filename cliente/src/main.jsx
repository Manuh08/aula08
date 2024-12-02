import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
<<<<<<< HEAD
import Registrar from './pages/Registro'
=======
import Lista from './pages/Registro'
>>>>>>> 6ca085b7d00140c3104c5a9dc21d84b024eb0fc5

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
       <Routes>
            <Route path="/" element={<Home/>}/>
<<<<<<< HEAD
            <Route path="/registro" element={<Registrar/>}/>
=======
            <Route path="/m" element={<Lista/>}/>
          
>>>>>>> 6ca085b7d00140c3104c5a9dc21d84b024eb0fc5
       </Routes>
    </BrowserRouter>
  </StrictMode>,
)
