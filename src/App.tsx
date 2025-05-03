// App.jsx
import { Routes, Route } from 'react-router-dom';
import Register from './assets/pages/Auth/Register';
import PrivateRoute from './assets/pages/Private/Config/Privateroute'; 
import Login from './assets/pages/Auth/Login';
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path='/login' element={<Login/>}></Route>
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <h1>Dashboard</h1>
            <p>Bem-vindo ao painel de controle!</p>
          </PrivateRoute>
        } 
      />
    </Routes>
  );
}

export default App;
