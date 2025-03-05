import React from "react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Monitor, Palette } from "lucide-react";

const ACCENT_COLORS = [
  { name: "Púrpura", value: "#7c3aed" },
  { name: "Azul", value: "#2563eb" },
  { name: "Verde", value: "#16a34a" },
  { name: "Rojo", value: "#dc2626" },
  { name: "Naranja", value: "#ea580c" },
  { name: "Rosa", value: "#db2777" },
];

const ThemeSelector = () => {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Personalización
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="theme">Tema</TabsTrigger>
            <TabsTrigger value="colors">Colores</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="flex flex-col items-center justify-center gap-2 h-24"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-8 w-8" />
                <span>Claro</span>
              </Button>

              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="flex flex-col items-center justify-center gap-2 h-24"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-8 w-8" />
                <span>Oscuro</span>
              </Button>

              <Button
                variant={theme === "system" ? "default" : "outline"}
                className="flex flex-col items-center justify-center gap-2 h-24"
                onClick={() => setTheme("system")}
              >
                <Monitor className="h-8 w-8" />
                <span>Sistema</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Color de Acento</h3>
              <div className="grid grid-cols-3 gap-3">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    className={`h-12 rounded-md flex items-center justify-center ${accentColor === color.value ? "ring-2 ring-offset-2 ring-offset-background" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setAccentColor(color.value)}
                  >
                    {accentColor === color.value && (
                      <span className="text-white text-xs font-medium">
                        {color.name}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Vista Previa</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Button>Botón Primario</Button>
                  <Button variant="outline">Botón Secundario</Button>
                </div>
                <div
                  className="p-4 rounded-md"
                  style={{ backgroundColor: accentColor + "10" }}
                >
                  <p className="text-sm" style={{ color: accentColor }}>
                    Este es un ejemplo de texto con el color de acento
                    seleccionado.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ThemeSelector;
