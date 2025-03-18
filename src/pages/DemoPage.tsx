import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import LiveDemo from "../components/LiveDemo";
import StatsCounter from "../components/StatsCounter";
import BrandAnalysis from "../components/BrandAnalysis";
import TauseProIntegration from "../components/ai/TauseProIntegration";
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
  TrendingUp,
  MapPin,
} from "lucide-react";

const DemoPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Avanzar automáticamente por los pasos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setIsAnimating(false);
        }, 500);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const features = [
    {
      title: "Diseño con IA",
      description: "Crea diseños profesionales en segundos con nuestra tecnología de IA contextualizada para el mercado colombiano.",
      icon: <Sparkles className="h-10 w-10 text-yellow-500" />,
      color: "from-yellow-500 to-orange-500",
      link: "/design"
    },
    {
      title: "Tause Pro: Tu plataforma integral de marketing",
      description: "Recibe recomendaciones personalizadas y optimiza tus campañas con datos locales.",
      icon: <Bot className="h-10 w-10 text-blue-500" />,
      color: "from-blue-500 to-indigo-600",
      link: "/ai-tools"
    },
    {
      title: "Análisis de rendimiento",
      description: "Visualiza el impacto de tus campañas con métricas adaptadas al mercado colombiano.",
      icon: <BarChart className="h-10 w-10 text-green-500" />,
      color: "from-green-500 to-emerald-600",
      link: "/dashboard"
    },
    {
      title: "Colaboración en tiempo real",
      description: "Trabaja con tu equipo de forma sincronizada y eficiente en todos tus proyectos.",
      icon: <Users className="h-10 w-10 text-purple-500" />,
      color: "from-purple-500 to-pink-600",
      link: "/collaboration"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-900/10 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-900 p-3 rounded-full">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            >
              tause Pro
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            >
              Marketing con IA para Colombia: Soluciones tecnológicas avanzadas para tu mercado local
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              <Link to="/design">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-950 text-white"             >
                  Ver Demo de Diseño <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/ai-tools">
                <Button size="lg" variant="outline">
                  Explorar Tause Pro <Bot className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Sección de características principales */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Potencia tu agencia con IA contextualizada
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herramientas diseñadas específicamente para el mercado colombiano
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 * index }}
            >
              <Link to={feature.link} className="block h-full">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                  <div className={`bg-gradient-to-r ${feature.color} p-6`}>
                    <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sección de demostración en vivo */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Demostración interactiva
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experimenta el poder de tause Pro en tiempo real
            </p>
          </motion.div>
          
          <LiveDemo />
        </div>
      </div>

      {/* Sección de estadísticas */}
      <div className="py-16 bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Impacto medible
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resultados comprobados para empresas colombianas
            </p>
          </motion.div>
          
          <StatsCounter />
        </div>
      </div>
      
      {/* Sección de Tause Pro: Plataforma Integral */}
      <div className="py-24 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tause Pro: Plataforma Integral
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Asistente de IA contextualizado al mercado colombiano que anticipa necesidades y ofrece análisis de datos en tiempo real
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-blue-100"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Brain className="h-6 w-6 text-white mr-2" />
                  <h3 className="text-xl font-semibold text-white">Tause Pro</h3>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Análisis en vivo
                  </Badge>
                  <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                    <MapPin className="h-3 w-3 mr-1" />
                    Colombia
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <TauseProIntegration />
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Sección de análisis de marca */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Análisis de Marca Inteligente
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Evalúa y optimiza tu presencia de marca en el mercado colombiano
            </p>
          </motion.div>
          
          <BrandAnalysis />
        </div>
      </div>
      
      {/* Sección de demostración interactiva */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-800 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Descubre el poder de tause Pro
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Una plataforma diseñada para transformar tu estrategia digital
            </p>
          </motion.div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex justify-between mb-8">
              {[0, 1, 2, 3].map((step) => (
                <motion.div 
                  key={step}
                  className={`w-20 h-1 rounded-full ${currentStep >= step ? 'bg-blue-500' : 'bg-gray-600'}`}
                  animate={{ 
                    backgroundColor: currentStep >= step ? '#3B82F6' : '#4B5563',
                    scale: currentStep === step ? [1, 1.1, 1] : 1
                  }}
                  transition={{ duration: 0.5, repeat: currentStep === step ? Infinity : 0, repeatType: "reverse" }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="min-h-[300px] flex items-center"
              >
                {currentStep === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Diseño con IA</h3>
                      <p className="text-gray-300 mb-6">
                        Genera diseños profesionales en segundos con nuestra IA entrenada para el mercado colombiano.
                      </p>
                      <Link to="/design">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-fit">
                          Probar ahora <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 flex items-center justify-center">
                      <ImageIcon className="h-24 w-24 text-white/80" />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Tause Pro: Asistente IA</h3>
                      <p className="text-gray-300 mb-6">
                        Tu asistente personal de marketing que te guía con recomendaciones basadas en datos locales.
                      </p>
                      <Link to="/ai-tools">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-fit">
                          Conocer Tause Pro <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-6 flex items-center justify-center">
                      <Bot className="h-24 w-24 text-white/80" />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Análisis Inteligente</h3>
                      <p className="text-gray-300 mb-6">
                        Visualiza el rendimiento de tus campañas con métricas relevantes para el mercado colombiano.
                      </p>
                      <Link to="/dashboard">
                        <Button className="bg-green-600 hover:bg-green-700 text-white w-fit">
                          Ver dashboard <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-6 flex items-center justify-center">
                      <BarChart className="h-24 w-24 text-white/80" />
                    </div>
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-white mb-4">Colaboración en Tiempo Real</h3>
                      <p className="text-gray-300 mb-6">
                        Trabaja con tu equipo de forma sincronizada en todos tus proyectos de marketing.
                      </p>
                      <Link to="/collaboration">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white w-fit">
                          Explorar <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg p-6 flex items-center justify-center">
                      <Users className="h-24 w-24 text-white/80" />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Listo para revolucionar tu estrategia digital?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Únete a las agencias colombianas que ya están aprovechando el poder de la IA contextualizada
          </p>
          <Link to="/design">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-900 hover:from-blue-700 hover:to-blue-950 text-white"
            >
              Comenzar Demostración <Rocket className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoPage;
