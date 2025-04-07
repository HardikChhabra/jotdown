"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";

export default function Home() {
  //@ts-ignore
  const { token } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.push("/dashboard");
    }
  }, [token, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">NoteTaker</h1>
          <p className="mt-2 text-gray-600">Your digital notebook</p>
        </div>
        <AuthForm />
      </div>
    </main>
  );
}
