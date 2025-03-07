import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Rocket,
  Target,
  BarChart,
  Users,
  Bot,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Zap,
  Brain,
  Image as ImageIcon,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-6">
              StellarEngage
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8">
              Plataforma de marketing con IA para agencias que revoluciona la
              forma de crear, gestionar y optimizar campañas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Comenzar Gratis <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Iniciar Sesión <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-1/4 left-10 animate-float hidden lg:block">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Sparkles className="h-8 w-8 text-purple-500" />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-10 animate-float-delayed hidden lg:block">
          <div className="bg-white p-3 rounded-full shadow-lg">
            <Bot className="h-8 w-8 text-pink-500" />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Potencia tu Marketing con IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas avanzadas impulsadas por inteligencia artificial para
              optimizar cada aspecto de tus campañas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-200">
              <div className="p-3 bg-purple-100 rounded-full w-fit mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Asistente de Marketing IA
              </h3>
              <p className="text-gray-600">
                Recibe recomendaciones personalizadas y genera contenido
                optimizado para tu audiencia específica
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-200">
              <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Planificador de Campañas
              </h3>
              <p className="text-gray-600">
                Crea, organiza y ejecuta campañas multicanal con un flujo de
                trabajo intuitivo y colaborativo
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-200">
              <div className="p-3 bg-pink-100 rounded-full w-fit mb-4">
                <ImageIcon className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Generador de Imágenes
              </h3>
              <p className="text-gray-600">
                Crea imágenes impactantes para tus campañas con solo describir
                lo que necesitas
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-200">
              <div className="p-3 bg-green-100 rounded-full w-fit mb-4">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Analíticas Avanzadas
              </h3>
              <p className="text-gray-600">
                Visualiza y analiza el rendimiento de tus campañas con métricas
                detalladas y reportes personalizables
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-200">
              <div className="p-3 bg-amber-100 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Colaboración en Tiempo Real
              </h3>
              <p className="text-gray-600">
                Trabaja con tu equipo simultáneamente en proyectos, con
                comentarios y aprobaciones integradas
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow border border-gray-100 hover:border-purple-200">
              <div className="p-3 bg-indigo-100 rounded-full w-fit mb-4">
                <Trophy className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sistema de Gamificación
              </h3>
              <p className="text-gray-600">
                Mantén a tu equipo motivado con desafíos, logros y recompensas
                que hacen del marketing una experiencia divertida
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "StellarEngage ha transformado nuestra estrategia de marketing.
                La IA nos ayuda a crear contenido que realmente resuena con
                nuestra audiencia."
              </p>
              <div className="flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">María González</p>
                  <p className="text-sm text-gray-500">
                    Directora de Marketing, TechCorp
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "El planificador de campañas y las analíticas en tiempo real nos
                han permitido optimizar nuestro ROI como nunca antes."
              </p>
              <div className="flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">Carlos Rodríguez</p>
                  <p className="text-sm text-gray-500">
                    CEO, Agencia Digital Impulso
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "La gamificación ha aumentado la productividad de nuestro equipo
                en un 40%. Ahora todos compiten por completar más campañas."
              </p>
              <div className="flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
                  alt="Avatar"
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium">Ana Martínez</p>
                  <p className="text-sm text-gray-500">
                    Gerente de Equipo, MarketPro
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Planes que se adaptan a tu negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elige el plan perfecto para tus necesidades de marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 border border-gray-200 relative">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Básico</h3>
                <p className="text-gray-600 mb-4">
                  Ideal para emprendedores y pequeños negocios
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">$29.900</span>
                  <span className="text-gray-500 mb-1">/mes</span>
                </div>
                <Button className="w-full mb-6">Comenzar Gratis</Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>1 usuario</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>3 proyectos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>5GB almacenamiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>50 generaciones de contenido IA</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border-2 border-purple-500 relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <div className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Profesional</h3>
                <p className="text-gray-600 mb-4">
                  Para equipos y agencias en crecimiento
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">$79.900</span>
                  <span className="text-gray-500 mb-1">/mes</span>
                </div>
                <Button className="w-full mb-6 bg-purple-600 hover:bg-purple-700">
                  Elegir Plan
                </Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>5 usuarios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>10 proyectos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>20GB almacenamiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>200 generaciones de contenido IA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>100 generaciones de imágenes IA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Analíticas avanzadas</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="p-6 border border-gray-200 relative">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Empresarial</h3>
                <p className="text-gray-600 mb-4">
                  Solución completa para empresas establecidas
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">$199.900</span>
                  <span className="text-gray-500 mb-1">/mes</span>
                </div>
                <Button className="w-full mb-6">Contactar Ventas</Button>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>20 usuarios</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>50 proyectos</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>100GB almacenamiento</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Generaciones ilimitadas de IA</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>API Access</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Soporte prioritario 24/7</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Revoluciona tu estrategia de marketing hoy
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Únete a más de 10,000 profesionales que ya están transformando su
            marketing con IA
          </p>
          <Link to="/register">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Comenzar Gratis <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StellarEngage</h3>
              <p className="text-gray-400">
                Plataforma de marketing con IA para agencias que revoluciona la
                forma de crear, gestionar y optimizar campañas
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Precios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Integraciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Recursos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Sobre nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Clientes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Términos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Seguridad
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} StellarEngage. Todos los derechos
            reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
