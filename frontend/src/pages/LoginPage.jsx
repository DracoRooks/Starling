import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageCircleIcon, LockIcon, MailIcon, LoaderIcon } from "lucide-react";
import { Link } from 'react-router';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="relative w-full max-w-5xl md:h-175 h-140 rounded-lg">
        <div className="w-full h-full flex flex-col md:flex-row">
          
          {/* RIGHT PANEL */}
          <div className="hidden md:w-1/2 md:max-h-full md:flex items-center justify-center p-6 bg-slate-800/70">
            <div className="bg-[url('../../assets/login.png')] bg-cover min-w-full min-h-full"></div>
          </div>
          
          {/* LEFT PANEL */}
          <div 
            className="flex md:w-1/2 min-h-full max-h-full items-center justify-center p-10 rounded-l 
              md:border-r bg-slate-800/70 md:border-slate-500/50
              "
          >
            <div className="w-full max-w-md">

              {/* LOGIN LEFT HEADER */}
              <div className="text-center mb-8 space-y-2">
                <MessageCircleIcon className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                <h2 className="text-3xl font-bold text-slate-200">Welcome Back!</h2>
                <p className="text-slate-200">Login to access your account</p>
              </div>

              {/* LOGIN FORM */}
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="auth-input-label" htmlFor="txtLoginEmail">Email</label>
                  <div className="relative">
                    <MailIcon
                      className="auth-input-icon"
                    />
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      id="txtLoginEmail"
                      autoComplete="email webauthn"
                      className="auth-input"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label className="auth-input-label" htmlFor="txtLoginPassword">Password</label>
                  <div className="relative">
                    <LockIcon
                      className="auth-input-icon"
                    />
                    <input 
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      id="txtLoginPassword"
                      autoComplete="current-password webauthn"
                      className="auth-input"
                    />
                  </div>
                </div>

                {/* SIGNUP BUTTON */}
                <button type="submit"
                  disabled={isLoggingIn} 
                  className="auth-input-btn"
                >{
                    isLoggingIn
                    ?  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    : "Login"
                }</button>
              </form>

              {/* LINK TO SIGNUP */}
              <div className="mt-6 text-center">
                <Link to={"/signup"} className="auth-link">Don't have an account? Register instead!</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;