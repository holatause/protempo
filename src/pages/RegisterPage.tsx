import React from "react";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-8">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">StellarEngage</h1>
          <p className="mt-2 text-gray-600">
            Crea tu cuenta en nuestra plataforma de Marketing con IA
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
