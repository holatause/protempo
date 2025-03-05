import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabase";

const SuperAdminSetup = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSuperAdmin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Crear perfil de usuario directamente sin autenticación
      const { data: userData, error: userError } = await supabase
        .from("user_profiles")
        .insert({
          full_name: "Super Admin",
          avatar_url:
            "https://api.dicebear.com/7.x/avataaars/svg?seed=superadmin",
        })
        .select()
        .single();

      if (userError) throw userError;

      setSuccess(true);
    } catch (err: any) {
      console.error("Error creating superadmin:", err);
      setError(err.message || "Error al crear el superadmin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Configuración de SuperAdmin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                SuperAdmin creado exitosamente. Ahora puedes continuar con la
                configuración del sistema.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full"
            >
              Ir al Dashboard
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Esto creará un usuario SuperAdmin con acceso completo a la
              plataforma.
            </p>

            <Button
              onClick={createSuperAdmin}
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear SuperAdmin"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SuperAdminSetup;
