import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  Star,
  Award,
  Zap,
  TrendingUp,
  Target,
  Crown,
  Gift,
  Sparkles,
  Bell,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  completed: boolean;
  points: number;
  category: "marketing" | "content" | "analytics" | "collaboration";
}

interface Level {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  color: string;
}

const achievements: Achievement[] = [
  {
    id: "a1",
    title: "Creador de Contenido",
    description: "Genera 10 piezas de contenido con IA",
    icon: <Sparkles className="w-5 h-5 text-purple-500" />,
    progress: 7,
    maxProgress: 10,
    completed: false,
    points: 100,
    category: "content",
  },
  {
    id: "a2",
    title: "Estratega de Marketing",
    description: "Completa 5 campañas exitosas",
    icon: <Target className="w-5 h-5 text-blue-500" />,
    progress: 3,
    maxProgress: 5,
    completed: false,
    points: 200,
    category: "marketing",
  },
  {
    id: "a3",
    title: "Analista Experto",
    description: "Revisa 20 informes de analíticas",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    progress: 20,
    maxProgress: 20,
    completed: true,
    points: 150,
    category: "analytics",
  },
  {
    id: "a4",
    title: "Colaborador Estrella",
    description: "Participa en 15 sesiones de colaboración",
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    progress: 12,
    maxProgress: 15,
    completed: false,
    points: 120,
    category: "collaboration",
  },
  {
    id: "a5",
    title: "Maestro de la IA",
    description: "Genera 50 imágenes con IA",
    icon: <Zap className="w-5 h-5 text-orange-500" />,
    progress: 32,
    maxProgress: 50,
    completed: false,
    points: 250,
    category: "content",
  },
];

const levels: Level[] = [
  {
    level: 1,
    title: "Novato",
    minPoints: 0,
    maxPoints: 299,
    color: "bg-gray-500",
  },
  {
    level: 2,
    title: "Aprendiz",
    minPoints: 300,
    maxPoints: 799,
    color: "bg-green-500",
  },
  {
    level: 3,
    title: "Profesional",
    minPoints: 800,
    maxPoints: 1499,
    color: "bg-blue-500",
  },
  {
    level: 4,
    title: "Experto",
    minPoints: 1500,
    maxPoints: 2499,
    color: "bg-purple-500",
  },
  {
    level: 5,
    title: "Maestro",
    minPoints: 2500,
    maxPoints: 3999,
    color: "bg-yellow-500",
  },
  {
    level: 6,
    title: "Leyenda",
    minPoints: 4000,
    maxPoints: Infinity,
    color: "bg-red-500",
  },
];

const GamificationSystem = () => {
  const [userPoints, setUserPoints] = useState(620);
  const [userLevel, setUserLevel] = useState<Level>(levels[0]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    // Determinar el nivel del usuario basado en sus puntos
    const level = levels.find(
      (level) => userPoints >= level.minPoints && userPoints <= level.maxPoints,
    );
    if (level) setUserLevel(level);
  }, [userPoints]);

  const completeAchievement = (achievement: Achievement) => {
    if (achievement.completed) return;

    const updatedAchievements = [...achievements];
    const index = updatedAchievements.findIndex((a) => a.id === achievement.id);

    if (index !== -1) {
      updatedAchievements[index] = {
        ...achievement,
        progress: achievement.maxProgress,
        completed: true,
      };

      // Actualizar puntos del usuario
      setUserPoints(userPoints + achievement.points);

      // Mostrar notificación
      setNotificationMessage(
        `¡Logro desbloqueado: ${achievement.title}! +${achievement.points} puntos`,
      );
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const progressToNextLevel = () => {
    if (userLevel.level === levels.length) return 100; // Ya está en el nivel máximo

    const pointsInCurrentLevel = userPoints - userLevel.minPoints;
    const totalPointsInLevel = userLevel.maxPoints - userLevel.minPoints;
    return Math.min(
      Math.round((pointsInCurrentLevel / totalPointsInLevel) * 100),
      100,
    );
  };

  return (
    <div className="space-y-6">
      {/* Notificación de logro */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <Trophy className="w-5 h-5 mr-2" />
            <p>{notificationMessage}</p>
          </div>
        </div>
      )}

      {/* Perfil y nivel */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Crown className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  Nivel {userLevel.level}: {userLevel.title}
                </h2>
                <p className="text-white/80">{userPoints} puntos totales</p>
              </div>
            </div>
            <Badge
              className={`${userLevel.color} text-white px-3 py-1 text-sm`}
            >
              Nivel {userLevel.level}
            </Badge>
          </div>

          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso al siguiente nivel</span>
              <span>{progressToNextLevel()}%</span>
            </div>
            <Progress
              value={progressToNextLevel()}
              className="h-2 bg-white/20"
            />
            <p className="text-xs text-white/70 text-right">
              {userLevel.level < levels.length
                ? `${userPoints - userLevel.minPoints} / ${userLevel.maxPoints - userLevel.minPoints} puntos para Nivel ${userLevel.level + 1}`
                : "¡Nivel máximo alcanzado!"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Logros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Logros y Desafíos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${achievement.completed ? "bg-green-100" : "bg-gray-100"}`}
                    >
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="font-medium flex items-center gap-2">
                        {achievement.title}
                        {achievement.completed && (
                          <Badge className="bg-green-100 text-green-800">
                            Completado
                          </Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                    <p className="text-xs text-gray-500">
                      +{achievement.points} pts
                    </p>
                  </div>
                </div>
                <Progress
                  value={(achievement.progress / achievement.maxProgress) * 100}
                  className={`h-2 ${achievement.completed ? "bg-green-100" : "bg-gray-100"}`}
                />
                {!achievement.completed &&
                  achievement.progress === achievement.maxProgress - 1 && (
                    <div className="flex justify-end mt-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                        onClick={() => completeAchievement(achievement)}
                      >
                        <Gift className="w-3 h-3 mr-1" /> Reclamar
                      </Button>
                    </div>
                  )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recompensas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-500" />
            Recompensas Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <CardContent className="p-4 text-center">
                <Award className="w-10 h-10 mx-auto text-yellow-500 mb-2" />
                <h3 className="font-medium">Plantilla Premium</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Desbloquea una plantilla exclusiva
                </p>
                <Badge>500 puntos</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <CardContent className="p-4 text-center">
                <Zap className="w-10 h-10 mx-auto text-blue-500 mb-2" />
                <h3 className="font-medium">Generación Prioritaria</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Sin límites por 24 horas
                </p>
                <Badge>750 puntos</Badge>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
              <CardContent className="p-4 text-center">
                <Star className="w-10 h-10 mx-auto text-purple-500 mb-2" />
                <h3 className="font-medium">Insignia Exclusiva</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Muestra tu estatus en el perfil
                </p>
                <Badge>1000 puntos</Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;
