import { Route,Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Paginaquiz from "./pages/Paginaquiz/Paginaquiz";

function App() {
  return (
    <div>

      <Navbar/>
      <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/registro" element={<Registro/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/quiz/:categoriaId/:categoria" element={<Paginaquiz />} />
      </Routes>
      
    </div>
  );
}

export default App;
