"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

function EmbedClient({ ownerId }: { ownerId: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [baseUrl] = useState(() =>
    typeof window !== "undefined" ? window.location.origin : "https://shaya-ai.vercel.app"
  );

  const embedCode = `<script 
  src="${baseUrl}/chatBot.js" 
  data-owner-id="${ownerId}" 
  defer>
</script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => router.push("/dashboard")}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic">
              S
            </div>
            <div className="font-bold text-xl tracking-tight">
              SHAYA<span className="text-blue-600">.AI</span>
            </div>
          </div>
          <button 
            onClick={() => router.push("/dashboard")}
            className="text-sm font-medium text-gray-600 hover:text-black transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Side: Setup */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Install Chatbot</h1>
              <p className="text-gray-500 mt-3 text-lg">
                Copy this snippet and add it to your website HTML to go live.
              </p>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Your Script Code</label>
              <div className="relative group">
                <pre className="bg-gray-900 text-blue-100 p-5 rounded-xl overflow-x-auto text-sm leading-relaxed border border-gray-800 shadow-lg">
                  <code>{embedCode}</code>
                </pre>
                <button
                  onClick={copyCode}
                  className={`absolute top-3 right-3 px-4 py-2 rounded-lg text-xs font-bold transition-all duration-300 ${
                    copied ? "bg-green-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {copied ? "COPIED!" : "COPY CODE"}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-blue-900 flex items-center gap-2">
                💡 Quick Guide
              </h3>
              <ul className="space-y-3 text-sm text-blue-800/80">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">01.</span>
                  <span>Paste the code just before the <b>&lt;/body&gt;</b> tag in your HTML.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">02.</span>
                  <span>Save and refresh your website.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-blue-600">03.</span>
                  <span>The chat icon will appear in the bottom right corner.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side: Preview */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-700 uppercase tracking-widest text-center">Live Preview</h2>
            
            {/* Browser Window Mockup */}
            <div className="w-full aspect-square bg-white rounded-3xl border-4 border-gray-200 shadow-2xl overflow-hidden flex flex-col relative">
              <div className="bg-gray-100 border-b border-gray-200 p-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400" />
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded text-[10px] text-gray-400 px-2 py-0.5 border border-gray-200">
                  https://your-business.com
                </div>
              </div>

              {/* Fake Content Area */}
              <div className="flex-1 p-6 space-y-4">
                <div className="w-1/2 h-6 bg-gray-100 rounded-full animate-pulse" />
                <div className="w-full h-32 bg-gray-50 rounded-2xl" />
                <div className="space-y-2">
                   <div className="w-full h-3 bg-gray-100 rounded" />
                   <div className="w-5/6 h-3 bg-gray-100 rounded" />
                </div>
              </div>

              {/* The "Bot" Mockup */}
              <div className="absolute bottom-6 right-6 group">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-gray-100 text-xs mb-3 transform transition-all group-hover:-translate-y-1">
                  Ready to help! 👋
                </div>
                <div className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform cursor-pointer">
                  💬
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmbedClient;