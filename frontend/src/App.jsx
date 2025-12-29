import { Routes, Route } from "react-router";
import ChatPage from "./pages/ChatPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ChatPage />}></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
    </>
  )
};

export default App;
