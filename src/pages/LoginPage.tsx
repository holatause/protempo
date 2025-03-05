import React from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useLocation } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-8">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">StellarEngage</h1>
          <p className="mt-2 text-gray-600">Plataforma de Marketing con IA</p>
        </div>

        {message && (
          <Alert className="mb-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
