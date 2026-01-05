import { Routes, Route, Navigate } from "react-router";
import ChatPage from "./pages/ChatPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js"
import { useEffect } from "react";
import PageLoader from "./components/PageLoader.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <PageLoader />;

  return (
    <div className="min-h-screen flex relative items-center justify-center overflow-hidden p-4 
    bg-slate-900 bg-[url('../../assets/background.png')] bg-cover">
      <Routes>
        <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}></Route>
        <Route path="/signup" element={authUser ? <Navigate to={"/"} /> : <SignUpPage />}></Route>
        <Route path="/login" element={authUser ? <Navigate to={"/"} /> : <LoginPage />}></Route>
      </Routes>

      <Toaster />
    </div>
  )
};

export default App;
