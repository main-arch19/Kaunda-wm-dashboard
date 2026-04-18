"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard/revenue");
    router.refresh();
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#0A1F4E" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, #F0C646 2px, transparent 0)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative bg-white rounded-[12px] shadow-[0_4px_20px_rgba(10,31,78,0.08)] p-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="Kaunda Waste Management"
            width={140}
            height={140}
            priority
            className="object-contain"
          />
        </div>

        <h1
          className="text-2xl font-bold text-center mb-1"
          style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
        >
          Staff Portal
        </h1>
        <p className="text-sm text-center text-gray-500 mb-8" style={{ fontFamily: "var(--font-open-sans)" }}>
          Sign in to access the Revenue Tracker
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@kaundawm.co.zm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 border-gray-200 focus:border-[#1B5DE5] focus:ring-[#1B5DE5]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
              Password
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 border-gray-200 focus:border-[#1B5DE5] focus:ring-[#1B5DE5]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 font-semibold rounded-[8px] text-white"
            style={{
              backgroundColor: loading ? "#0D3A9E" : "#1B5DE5",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-8">
          Kaunda Waste Management LTD · Internal Use Only
        </p>
      </div>
    </main>
  );
}
