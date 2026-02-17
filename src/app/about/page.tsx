"use client";

import { Heart, Code2, BookOpen, ExternalLink, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-de-gray pb-20">
      {/* Header */}
      <div className="bg-de-black text-white p-6 pb-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-black mb-3">de-learn-de 🇩🇪</h1>
          <p className="text-de-gold text-lg font-medium italic">
            &ldquo;Dek, ayo learn Deutsch dek.&rdquo;
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-6 -mt-6">
        {/* Attribution Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-de-red/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-de-red" />
            </div>
            <h2 className="text-lg font-bold text-de-black">About This App</h2>
          </div>
          
          <p className="text-gray-600 leading-relaxed">
            Special developed by{" "}
            <Link 
              href="https://ardha.xyz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-de-red font-semibold hover:underline inline-flex items-center gap-1"
            >
              ardhaxyz
              <ExternalLink className="w-3 h-3" />
            </Link>{" "}
            with love for Ine Maria 💕
          </p>
        </div>

        {/* Why This Was Made */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-de-gold/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-de-gold" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Why This Was Made</h2>
          </div>
          
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <strong>de-learn-de</strong> is a 14-day German A1 course dashboard designed for mobile-first learning.
            </p>
            
            <p>
              The name comes from:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-de-red font-bold">de</span>
                <span>= affectionate address (dek/dik)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-de-red font-bold">learn</span>
                <span>= to learn</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-de-red font-bold">de</span>
                <span>= Deutschland (Germany)</span>
              </li>
            </ul>
            
            <p className="text-de-gold font-medium italic text-center mt-4 p-4 bg-de-gold/10 rounded-xl">
              &ldquo;de-learn-de&rdquo; = Learn German with someone you love
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Features</h2>
          </div>
          
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>14-Day A1 Curriculum with interactive quiz</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Text-to-Speech for listening exercises</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Hearts system (3 lives per day)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Progressive difficulty (Easy → Medium → Hard)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Streak counter to track consistency</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold">✓</span>
              <span>Mobile-first design optimized for learning on-the-go</span>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Code2 className="w-5 h-5 text-gray-700" />
            </div>
            <h2 className="text-lg font-bold text-de-black">Built With</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-black">Next.js 16</p>
              <p className="text-xs text-gray-500">React Framework</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-black">TypeScript</p>
              <p className="text-xs text-gray-500">Type Safety</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-black">Tailwind CSS 4</p>
              <p className="text-xs text-gray-500">Styling</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl text-center">
              <p className="font-bold text-de-red">Love 💕</p>
              <p className="text-xs text-gray-500">For Ine Maria</p>
            </div>
          </div>
        </div>

        {/* Version */}
        <div className="text-center text-gray-400 text-sm pb-6">
          <p>Version 1.0.0</p>
          <p className="mt-1">Made with ❤️ in München</p>
        </div>
      </div>
    </div>
  );
}
