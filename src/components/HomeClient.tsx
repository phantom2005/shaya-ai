"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { useRouter } from "next/navigation";

function HomeClient({ email }: { email?: string }) {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleLogin = () => (window.location.href = "/api/auth/login");
  
  const handelLogOut = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

const navigate = useRouter();




  const features = [
    { title: "Enterprise Brain", desc: "Train AI on your specific business logic and documentation in minutes." },
    { title: "Omnichannel Sync", desc: "Deploy seamlessly across Web, WhatsApp, and Slack with one API." },
    { title: "Insight Engine", desc: "Advanced sentiment analysis to understand what your customers truly need." },
  ];

  const firstLetter = email?.[0]?.toUpperCase() || "";

  return (
    <div className="min-h-screen bg-[#F8F9FB] text-slate-900 selection:bg-blue-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">S</div>
            <span className="font-bold text-xl tracking-tight">SHAYA<span className="text-blue-600">.AI</span></span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Solutions</a>
            </div>
            {email ? (
              <div className="relative" ref={popupRef}>
                <button 
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gradient-to-tr from-slate-800 to-slate-600 text-white flex items-center justify-center font-bold"
                >
                  {firstLetter}
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2"
                    >
                      <div className="px-4 py-3 border-b border-slate-50 mb-2">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold truncate">{email}</p>
                      </div>
                      <button className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors"
                         onClick={() => navigate.push("/dashboard")}>Dashboard</button>
                      <button onClick={handelLogOut} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium">Logout</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button onClick={handleLogin} className="px-6 py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
                Join the Waitlist
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-44 pb-32 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              NOW POWERING 500+ BUSINESSES
            </div>
            <h1 className="text-6xl font-extrabold leading-[1.05] tracking-tight mb-8">
              The AI Core for <span className="text-blue-600">Modern Business.</span>
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-lg">
              Empower your brand with custom-trained AI assistance. Scalable, secure, and ready to deploy in seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={email ? () => navigate.push("/dashboard") : handleLogin} className="px-8 py-4 rounded-xl bg-slate-900 text-white font-bold hover:shadow-2xl transition-all active:scale-95">
                {email ? "Go to dashboard" : "Deploy Your Agent"}
              </button>
              <button className="px-8 py-4 rounded-xl bg-white border border-slate-200 font-bold hover:bg-slate-50 transition-all">View Docs</button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Abstract Decorative Element */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -z-10" />
            
            <div className="bg-white rounded-[2rem] p-8 shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 tracking-widest">SHAYA ENGINE v2.0</div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex-shrink-0" />
                  <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-sm text-slate-600">
                    How does SHAYA handle my proprietary business data?
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none text-sm text-white shadow-lg shadow-blue-100 max-w-[80%]">
                    We use isolated vector environments. Your data is encrypted and used only to train your specific assistant. 🛡️
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold">S</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">Built for every industry.</h2>
            <p className="text-slate-500">From E-commerce to Fintech, SHAYA adapts to your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="text-blue-600 font-bold text-4xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-slate-400">SHAYA<span className="text-slate-300">.AI</span></div>
          <div className="text-slate-400 text-sm italic font-medium">“Transforming noise into intelligence.”</div>
          <div className="text-slate-400 text-xs tracking-widest">&copy; 2026 SHAYA TECHNOLOGIES</div>
        </div>
      </footer>
    </div>
  );
}

export default HomeClient;