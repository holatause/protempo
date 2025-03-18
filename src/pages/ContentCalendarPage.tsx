import React from 'react';
import { ContentCalendar } from '@/components/content/ContentCalendar';
import TauseProAssistant from '@/components/ai/TauseProAssistant';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Home, 
  Calendar as CalendarIcon,
  Target,
  BarChart,
  Users,
  Settings,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ContentCalendarPage: React.FC = () => {
  // Contexto inicial para el asistente
  const initialContext = {
    module: 'calendario_contenido',
    userIntent: {
      action: 'view',
      entity: 'content_calendar',
      region: 'BOG'
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Barra lateral de navegación */}
      <div className="hidden md:flex w-16 flex-col border-r bg-muted/40 items-center py-4">
        <Link to="/tausepro" className="mb-8">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            TP
          </div>
        </Link>
        
        <div className="flex flex-col items-center gap-4 mt-4">
          <Link to="/tausepro">
            <Button variant="ghost" size="icon" className="rounded-full" title="Inicio">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/campanas">
            <Button variant="ghost" size="icon" className="rounded-full" title="Campañas">
              <Target className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/calendario">
            <Button variant="secondary" size="icon" className="rounded-full" title="Calendario de Contenido">
              <CalendarIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full" title="Análisis">
            <BarChart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" title="Audiencia">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full" title="Configuración">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-auto">
          <Button variant="ghost" size="icon" className="rounded-full" title="Ayuda">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <header className="h-14 border-b flex items-center px-4 sticky top-0 bg-background/95 backdrop-blur z-10">
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/tausepro">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-medium">Calendario de Contenido</h1>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-medium">Calendario de Contenido</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/tausepro">
              <Button variant="outline" className="hidden md:flex">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
            </Link>
          </div>
        </header>
        
        {/* Contenido */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4 md:px-6 lg:px-8 max-w-7xl">
            <ContentCalendar />
          </div>
        </main>
      </div>
      
      {/* Panel lateral de asistente */}
      <div className="hidden lg:block w-80 border-l overflow-y-auto">
        <TauseProAssistant initialContext={initialContext} />
      </div>
    </div>
  );
};

export default ContentCalendarPage;
