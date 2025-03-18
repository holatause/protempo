import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Calendar as CalendarIcon,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  Globe,
  MessageSquare
} from "lucide-react";
import { 
  ContentItem, 
  CalendarDay, 
  CalendarWeek, 
  CalendarMonth,
  sampleContentItems 
} from './ContentCalendarTypes';
import { ContentItemCard } from './ContentItemCard';
import { ContentItemForm } from './ContentItemForm';

// Función para generar el calendario del mes
const generateCalendar = (year: number, month: number, contentItems: ContentItem[]): CalendarMonth => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  
  // Obtener el primer día de la semana (0 = Domingo, 1 = Lunes, etc.)
  let firstDayOfWeek = firstDay.getDay();
  // Ajustar para que la semana comience en lunes (0 = Lunes, 6 = Domingo)
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  const today = new Date();
  const weeks: CalendarWeek[] = [];
  let days: CalendarDay[] = [];
  
  // Días del mes anterior
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
  
  for (let i = 0; i < firstDayOfWeek; i++) {
    const date = new Date(prevYear, prevMonth, daysInPrevMonth - firstDayOfWeek + i + 1);
    days.push({
      date,
      items: contentItems.filter(item => {
        const itemDate = new Date(item.scheduledDate);
        return itemDate.getDate() === date.getDate() && 
               itemDate.getMonth() === date.getMonth() && 
               itemDate.getFullYear() === date.getFullYear();
      }),
      isCurrentMonth: false,
      isToday: false
    });
  }
  
  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const isToday = today.getDate() === i && 
                    today.getMonth() === month && 
                    today.getFullYear() === year;
    
    days.push({
      date,
      items: contentItems.filter(item => {
        const itemDate = new Date(item.scheduledDate);
        return itemDate.getDate() === i && 
               itemDate.getMonth() === month && 
               itemDate.getFullYear() === year;
      }),
      isCurrentMonth: true,
      isToday
    });
    
    // Si completamos una semana o llegamos al final del mes
    if ((firstDayOfWeek + i) % 7 === 0 || i === daysInMonth) {
      // Si no completamos la última semana, añadir días del mes siguiente
      if (i === daysInMonth && days.length % 7 !== 0) {
        const remainingDays = 7 - (days.length % 7);
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;
        
        for (let j = 1; j <= remainingDays; j++) {
          const date = new Date(nextYear, nextMonth, j);
          days.push({
            date,
            items: contentItems.filter(item => {
              const itemDate = new Date(item.scheduledDate);
              return itemDate.getDate() === j && 
                     itemDate.getMonth() === nextMonth && 
                     itemDate.getFullYear() === nextYear;
            }),
            isCurrentMonth: false,
            isToday: false
          });
        }
      }
      
      weeks.push({ days: [...days] });
      days = [];
    }
  }
  
  return {
    month,
    year,
    weeks
  };
};

// Componente para renderizar un día del calendario
const CalendarDayCell: React.FC<{ day: CalendarDay, onDayClick: (day: CalendarDay) => void }> = ({ day, onDayClick }) => {
  const dayClasses = `
    h-28 p-1 border border-border hover:bg-accent/20 transition-colors
    ${day.isCurrentMonth ? 'bg-background' : 'bg-muted/30 text-muted-foreground'}
    ${day.isToday ? 'ring-2 ring-primary ring-inset' : ''}
  `;
  
  // Obtener el icono correspondiente a cada plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-3 w-3" />;
      case 'facebook':
        return <Facebook className="h-3 w-3" />;
      case 'youtube':
        return <Youtube className="h-3 w-3" />;
      case 'linkedin':
        return <Linkedin className="h-3 w-3" />;
      case 'email':
        return <Mail className="h-3 w-3" />;
      case 'blog':
        return <Globe className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };
  
  // Color de fondo según el tipo de contenido
  const getContentTypeColor = (contentType: string) => {
    switch (contentType) {
      case 'post':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'video':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'story':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'reel':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400';
      case 'blog':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'email':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'ad':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  return (
    <div className={dayClasses} onClick={() => onDayClick(day)}>
      <div className="text-xs font-medium mb-1">{day.date.getDate()}</div>
      <div className="space-y-1 overflow-y-auto max-h-20">
        {day.items.slice(0, 3).map((item) => (
          <div 
            key={item.id} 
            className={`text-xs px-1 py-0.5 rounded flex items-center gap-1 truncate ${getContentTypeColor(item.contentType)}`}
            title={item.title}
          >
            {getPlatformIcon(item.platform)}
            <span className="truncate">{item.title}</span>
          </div>
        ))}
        {day.items.length > 3 && (
          <div className="text-xs text-muted-foreground text-center">
            +{day.items.length - 3} más
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal del Calendario de Contenido
export const ContentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendar, setCalendar] = useState<CalendarMonth | null>(null);
  const [contentItems, setContentItems] = useState<ContentItem[]>(sampleContentItems);
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlatform, setFilterPlatform] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');
  
  // Generar el calendario cuando cambia la fecha o los elementos de contenido
  useEffect(() => {
    const newCalendar = generateCalendar(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      contentItems
    );
    setCalendar(newCalendar);
  }, [currentDate, contentItems]);
  
  // Manejar el cambio de mes
  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setCurrentDate(newDate);
  };
  
  // Manejar el clic en un día
  const handleDayClick = (day: CalendarDay) => {
    setSelectedDay(day);
  };
  
  // Manejar la creación de un nuevo elemento de contenido
  const handleCreateContent = (newItem: ContentItem) => {
    setContentItems([...contentItems, newItem]);
    setShowForm(false);
  };
  
  // Filtrar elementos de contenido para la vista de lista
  const filteredItems = contentItems.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesPlatform = filterPlatform === 'all' || item.platform.toLowerCase() === filterPlatform.toLowerCase();
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesRegion = filterRegion === 'all' || item.region === filterRegion;
    
    return matchesSearch && matchesPlatform && matchesStatus && matchesRegion;
  });
  
  // Nombres de los meses en español
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Nombres de los días de la semana en español
  const weekdayNames = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Calendario de Contenido</h2>
          <p className="text-muted-foreground">
            Planifica y gestiona todo tu contenido en un solo lugar
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-auto">
            <TabsList>
              <TabsTrigger value="calendar">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendario
              </TabsTrigger>
              <TabsTrigger value="list">
                <MessageSquare className="h-4 w-4 mr-2" />
                Lista
              </TabsTrigger>
            </TabsList>
          </div>
          
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Contenido
          </Button>
        </div>
      </div>
      
      {/* Filtros para la vista de lista */}
      {view === 'list' && (
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar contenido..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select 
                value={filterPlatform} 
                onValueChange={setFilterPlatform}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las plataformas</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="google ads">Google Ads</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={filterStatus} 
                onValueChange={setFilterStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="scheduled">Programado</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={filterRegion} 
                onValueChange={setFilterRegion}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las regiones</SelectItem>
                  <SelectItem value="BOG">Bogotá</SelectItem>
                  <SelectItem value="MED">Medellín</SelectItem>
                  <SelectItem value="CAL">Cali</SelectItem>
                  <SelectItem value="BAR">Barranquilla</SelectItem>
                  <SelectItem value="NAC">Nacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Contenido principal con pestañas */}
      <Tabs value={view} onValueChange={(value) => setView(value as 'calendar' | 'list')}>
        {/* Vista de Calendario */}
        <TabsContent value="calendar" className="m-0">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleMonthChange(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-xl font-medium">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h3>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleMonthChange(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentDate(new Date())}
                >
                  Hoy
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {calendar && (
                <div>
                  {/* Encabezados de días de la semana */}
                  <div className="grid grid-cols-7 gap-px mb-px">
                    {weekdayNames.map((day, index) => (
                      <div 
                        key={index} 
                        className="p-2 text-center text-sm font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Días del calendario */}
                  <div className="border border-border rounded-md overflow-hidden">
                    {calendar.weeks.map((week, weekIndex) => (
                      <div key={weekIndex} className="grid grid-cols-7 gap-px">
                        {week.days.map((day, dayIndex) => (
                          <CalendarDayCell 
                            key={dayIndex} 
                            day={day} 
                            onDayClick={handleDayClick} 
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Detalles del día seleccionado */}
          {selectedDay && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>
                  {selectedDay.date.getDate()} de {monthNames[selectedDay.date.getMonth()]} de {selectedDay.date.getFullYear()}
                </CardTitle>
                <CardDescription>
                  {selectedDay.items.length} elementos de contenido programados
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedDay.items.length > 0 ? (
                    selectedDay.items.map(item => (
                      <ContentItemCard key={item.id} item={item} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No hay contenido programado para este día</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setShowForm(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Añadir contenido
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Vista de Lista */}
        <TabsContent value="list" className="m-0">
          <div className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <ContentItemCard key={item.id} item={item} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">No se encontraron elementos de contenido con los filtros actuales</p>
                  <Button onClick={() => setShowForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Crear nuevo contenido
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Formulario para crear/editar contenido */}
      {showForm && (
        <ContentItemForm 
          onSubmit={handleCreateContent}
          onCancel={() => setShowForm(false)}
          initialDate={selectedDay?.date}
        />
      )}
    </div>
  );
};
