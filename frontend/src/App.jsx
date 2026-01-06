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
    <div className="min-h-screen bg-slate-900 flex relative items-center justify-center overflow-hidden p-4">

      {/* BACKGROUND DECOR */}
      <div className="absolute inset-0 bg-size-[14px_24px]
        bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]"
      />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

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
