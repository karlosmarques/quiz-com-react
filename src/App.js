import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registro from "./pages/Registro/Registro";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Paginaquiz from "./pages/Paginaquiz/Paginaquiz";
import Perfil from "./pages/perfil/perfil";
import CriarQuiz from "./pages/CriarQuiz/Criar";
import Esqueci_senha from "./pages/Esqueci_minha_senha/Esqueci_minha_senha";
import RedefinirSenha from "./pages/Redefinir_senha/RedefinirSenha";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/quiz/:id" element={<Paginaquiz />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/criarquiz" element={<CriarQuiz />} />
        <Route path="/esqueci_minha_senha" element={<Esqueci_senha/>} />
        <Route path="/redefinir-senha/:token" element={<RedefinirSenha/>} />
      </Routes>
    </div>
  );
}

export default App;
