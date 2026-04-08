"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";

function DashboardClient({ ownerId }: { ownerId: string }) {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fetch details on mount
  useEffect(() => {
    if (!ownerId) return;
    
    const fetchDetails = async () => {
      try {
        const result = await axios.post("/api/settings", { ownerId });
        if (result.data.settings) {
          setBusinessName(result.data.settings.businessName || "");
          setSupportEmail(result.data.settings.supportEmail || "");
          setKnowledge(result.data.settings.knowledge || "");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchDetails();
  }, [ownerId]);

  const handleSettings = async () => {
    setLoading(true);
    try {
      await axios.post("/api/settings", { 
        ownerId, 
        businessName, 
        supportEmail, 
        knowledge 
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      alert("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => router.push("/")}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">
              S
            </div>
            <div className="font-bold text-xl tracking-tight">
              SHAYA<span className="text-blue-600">.AI</span>
            </div>
          </div>
          <button 
            className="px-4 py-2 rounded-lg border border-zinc-200 text-sm font-medium hover:bg-zinc-50 transition shadow-sm"
            onClick={() => router.push("/embed")}
          >
            Embed Chatbot
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto pt-32 pb-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8 md:p-12"
        >
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Chatbot Settings</h1>
            <p className="text-zinc-500 mt-2">
              Train your AI by providing business context and contact details.
            </p>
          </header>

          <div className="space-y-8">
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-zinc-400">Business Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">Business Name</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. Acme Corp"
                    onChange={(e) => setBusinessName(e.target.value)}
                    value={businessName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">Support Email</label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                    placeholder="support@acme.com"
                    onChange={(e) => setSupportEmail(e.target.value)}
                    value={supportEmail}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-2">
              <div className="flex justify-between items-end">
                <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Knowledge Base</h2>
                <span className="text-[10px] text-zinc-400 font-mono">{knowledge.length} chars</span>
              </div>
              <textarea
                className="w-full h-64 rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Paste your FAQ, refund policies, and delivery info here..."
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
              />
            </section>

            <div className="pt-6 border-t border-zinc-100 flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSettings}
                disabled={loading}
                className="relative bg-blue-600 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-70 shadow-lg shadow-blue-200 flex items-center gap-3"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>{loading ? "Saving Changes..." : "Save Configuration"}</span>
              </motion.button>
              
              <AnimatePresence>
                {saved && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-600 font-bold text-sm"
                  >
                    <div className="bg-green-100 p-1 rounded-full">
                       <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                    </div>
                    Updated Successfully
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default DashboardClient;