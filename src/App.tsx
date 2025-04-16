import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Login';
import Register from './assets/pages/Auth/Register';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
