import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from 'react-router';
import AnimatedBorder from '../components/AnimatedBorder.jsx';

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="relative w-full max-w-5xl md:h-175 h-140 rounded-lg">
        <AnimatedBorder>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* LEFT PANEL */}
            <div 
              className="flex md:w-1/2 min-h-full max-h-full items-center justify-center p-10
                md:border-r bg-slate-800/70 md:border-slate-500/50"
            >
              <div className="w-full max-w-md">

                {/* SIGNUP LEFT HEADER */}
                <div className="text-center mb-8 space-y-2">
                  <MessageCircleIcon className="w-12 h-12 mx-auto mb-4 text-slate-400" />
                  <h2 className="text-3xl font-bold text-slate-200">Create Account</h2>
                  <p className="text-slate-200">Sign up for a new account!</p>
                </div>

                {/* SIGNUP FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* USERNAME */}
                  <div>
                    <label className="auth-input-label" htmlFor="txtSignupUsername">Username</label>
                    <div className="relative">
                      <UserIcon
                        className="auth-input-icon"
                      />
                      <input 
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Enter your username"
                        id="txtSignupUsername"
                        autoComplete="username"
                        className="auth-input"
                      />
                    </div>
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="auth-input-label" htmlFor="txtSignupEmail">Email</label>
                    <div className="relative">
                      <MailIcon
                        className="auth-input-icon"
                      />
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@gmail.com"
                        id="txtSignupEmail"
                        autoComplete="email"
                        className="auth-input"
                      />
                    </div>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="auth-input-label" htmlFor="txtSignupPassword">Password</label>
                    <div className="relative">
                      <LockIcon
                        className="auth-input-icon"
                      />
                      <input 
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Enter your password"
                        id="txtSignupPassword"
                        autoComplete="new-password"
                        className="auth-input"
                      />
                    </div>
                  </div>

                  {/* SIGNUP BUTTON */}
                  <button type="submit"
                    disabled={isSigningUp} 
                    className="auth-input-btn"
                  >{
                      isSigningUp
                      ?  <LoaderIcon className="w-full h-5 animate-spin text-center" />
                      : "Create Account"
                  }</button>
                </form>

                {/* LINK TO LOGIN */}
                <div className="mt-6 text-center">
                  <Link to={"/login"} className="auth-link">Already have an account? Login instead!</Link>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="hidden md:w-1/2 md:max-h-full md:flex items-center justify-center p-6 bg-slate-800/70">
              <div className="bg-[url('../../assets/signup.png')] bg-cover min-w-full min-h-full"></div>
            </div>
          </div>
        </AnimatedBorder>
      </div>
    </div>
  );
};

export default SignUpPage;