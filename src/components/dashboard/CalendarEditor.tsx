import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar as CalendarIcon,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Plus,
  Trash2,
  Save,
  CheckCircle,
  AlertCircle,
  Repeat,
  Users,
  Image as ImageIcon,
} from "lucide-react";

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  platforms: string[];
  status: "draft" | "scheduled" | "published" | "failed";
  recurring: boolean;
  assignedTo?: string;
  imageUrl?: string;
}

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Lanzamiento de nueva funcionalidad",
    description: "Anuncio de la integración con IA para automatizar campañas",
    date: new Date(2024, 6, 15),
    time: "10:00",
    platforms: ["instagram", "facebook", "linkedin"],
    status: "scheduled",
    recurring: false,
    assignedTo: "Ana García",
    imageUrl:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80",
  },
  {
    id: "2",
    title: "Publicación semanal de tips",
    description: "Tips de marketing digital para pequeñas empresas",
    date: new Date(2024, 6, 18),
    time: "15:30",
    platforms: ["instagram", "facebook"],
    status: "draft",
    recurring: true,
    assignedTo: "Carlos Ruiz",
  },
  {
    id: "3",
    title: "Webinar de estrategias de marketing",
    description: "Presentación de casos de éxito y nuevas tendencias",
    date: new Date(2024, 6, 22),
    time: "17:00",
    platforms: ["linkedin"],
    status: "scheduled",
    recurring: false,
    assignedTo: "Elena Díaz",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    id: "4",
    title: "Promoción de fin de mes",
    description: "Descuentos especiales en planes anuales",
    date: new Date(2024, 6, 30),
    time: "09:00",
    platforms: ["instagram", "facebook", "twitter", "linkedin"],
    status: "draft",
    recurring: false,
    assignedTo: "Ana García",
    imageUrl:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&q=80",
  },
];

const CalendarEditor = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null,
  );
  const [isEditing, setIsEditing] = useState(false);

  const eventsForSelectedDate = date
    ? events.filter(
        (event) =>
          event.date.getDate() === date.getDate() &&
          event.date.getMonth() === date.getMonth() &&
          event.date.getFullYear() === date.getFullYear(),
      )
    : [];

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEditing(false);
  };

  const handleEditEvent = () => {
    setIsEditing(true);
  };

  const handleSaveEvent = () => {
    if (!selectedEvent) return;

    setEvents(
      events.map((event) =>
        event.id === selectedEvent.id ? selectedEvent : event,
      ),
    );
    setIsEditing(false);
  };

  const handleDeleteEvent = () => {
    if (!selectedEvent) return;

    setEvents(events.filter((event) => event.id !== selectedEvent.id));
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleCreateEvent = () => {
    if (!date) return;

    const newEvent: CalendarEvent = {
      id: Date.now().toString(),
      title: "Nuevo evento",
      description: "",
      date: date,
      time: "12:00",
      platforms: ["instagram"],
      status: "draft",
      recurring: false,
    };

    setEvents([...events, newEvent]);
    setSelectedEvent(newEvent);
    setIsEditing(true);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "facebook":
        return <Facebook className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline">Borrador</Badge>;
      case "scheduled":
        return <Badge variant="secondary">Programado</Badge>;
      case "published":
        return (
          <Badge variant="success" className="bg-green-100 text-green-800">
            Publicado
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return null;
    }
  };

  const togglePlatform = (platform: string) => {
    if (!selectedEvent) return;

    const platforms = selectedEvent.platforms.includes(platform)
      ? selectedEvent.platforms.filter((p) => p !== platform)
      : [...selectedEvent.platforms, platform];

    setSelectedEvent({ ...selectedEvent, platforms });
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          Calendario Editorial
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[800px]">
          {/* Calendar */}
          <div className="p-6 border-r">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              components={{
                DayContent: (props) => {
                  const day = props.date;
                  const hasEvents = events.some(
                    (event) =>
                      event.date.getDate() === day.getDate() &&
                      event.date.getMonth() === day.getMonth() &&
                      event.date.getFullYear() === day.getFullYear(),
                  );

                  return (
                    <div className="relative">
                      {props.day}
                      {hasEvents && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                      )}
                    </div>
                  );
                },
              }}
            />

            <div className="mt-6">
              <Button
                onClick={handleCreateEvent}
                className="w-full"
                disabled={!date}
              >
                <Plus className="w-4 h-4 mr-2" />
                Crear Publicación
              </Button>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Próximas publicaciones</h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {events
                    .filter((event) => new Date(event.date) >= new Date())
                    .sort((a, b) => a.date.getTime() - b.date.getTime())
                    .slice(0, 5)
                    .map((event) => (
                      <div
                        key={event.id}
                        className="flex items-center justify-between p-2 text-sm hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => {
                          setDate(event.date);
                          handleSelectEvent(event);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="font-medium truncate max-w-[120px]">
                            {event.title}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {event.date.toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Events for selected date */}
          <div className="border-r">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">
                {date?.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>

            <ScrollArea className="h-[calc(800px-73px)]">
              <div className="p-6 space-y-4">
                {eventsForSelectedDate.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay publicaciones programadas para este día
                  </div>
                ) : (
                  eventsForSelectedDate.map((event) => (
                    <Card
                      key={event.id}
                      className={`overflow-hidden cursor-pointer hover:shadow-md transition-shadow ${selectedEvent?.id === event.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleSelectEvent(event)}
                    >
                      {event.imageUrl && (
                        <div className="h-32 overflow-hidden">
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold">{event.title}</h3>
                          {getStatusBadge(event.status)}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                          {event.description}
                        </p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {event.platforms.map((platform) => (
                              <div key={platform} className="text-gray-500">
                                {getPlatformIcon(platform)}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Event details/editor */}
          <div>
            {selectedEvent ? (
              <div className="h-full flex flex-col">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-semibold">
                    {isEditing
                      ? "Editar publicación"
                      : "Detalles de publicación"}
                  </h3>
                  <div className="flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancelar
                        </Button>
                        <Button size="sm" onClick={handleSaveEvent}>
                          <Save className="w-4 h-4 mr-2" />
                          Guardar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleEditEvent}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={handleDeleteEvent}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-6">
                    {isEditing ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="title">Título</Label>
                          <Input
                            id="title"
                            value={selectedEvent.title}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                title: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Descripción</Label>
                          <Textarea
                            id="description"
                            value={selectedEvent.description}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                description: e.target.value,
                              })
                            }
                            className="min-h-[100px]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date">Fecha</Label>
                            <Input
                              id="date"
                              type="date"
                              value={
                                selectedEvent.date.toISOString().split("T")[0]
                              }
                              onChange={(e) =>
                                setSelectedEvent({
                                  ...selectedEvent,
                                  date: new Date(e.target.value),
                                })
                              }
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="time">Hora</Label>
                            <Input
                              id="time"
                              type="time"
                              value={selectedEvent.time}
                              onChange={(e) =>
                                setSelectedEvent({
                                  ...selectedEvent,
                                  time: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Plataformas</Label>
                          <div className="flex flex-wrap gap-2">
                            {[
                              "instagram",
                              "facebook",
                              "twitter",
                              "linkedin",
                            ].map((platform) => (
                              <Button
                                key={platform}
                                variant={
                                  selectedEvent.platforms.includes(platform)
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => togglePlatform(platform)}
                                className="flex items-center gap-2"
                              >
                                {getPlatformIcon(platform)}
                                <span className="capitalize">{platform}</span>
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Estado</Label>
                          <div className="flex flex-wrap gap-2">
                            {["draft", "scheduled", "published", "failed"].map(
                              (status) => (
                                <Button
                                  key={status}
                                  variant={
                                    selectedEvent.status === status
                                      ? "default"
                                      : "outline"
                                  }
                                  size="sm"
                                  onClick={() =>
                                    setSelectedEvent({
                                      ...selectedEvent,
                                      status: status as any,
                                    })
                                  }
                                >
                                  <span className="capitalize">{status}</span>
                                </Button>
                              ),
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Label htmlFor="recurring" className="flex-1">
                            Publicación recurrente
                          </Label>
                          <Button
                            variant={
                              selectedEvent.recurring ? "default" : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              setSelectedEvent({
                                ...selectedEvent,
                                recurring: !selectedEvent.recurring,
                              })
                            }
                            className="flex items-center gap-2"
                          >
                            <Repeat className="w-4 h-4" />
                            {selectedEvent.recurring
                              ? "Activado"
                              : "Desactivado"}
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="assignedTo">Asignado a</Label>
                          <Input
                            id="assignedTo"
                            value={selectedEvent.assignedTo || ""}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                assignedTo: e.target.value,
                              })
                            }
                            placeholder="Nombre del responsable"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="imageUrl">URL de imagen</Label>
                          <Input
                            id="imageUrl"
                            value={selectedEvent.imageUrl || ""}
                            onChange={(e) =>
                              setSelectedEvent({
                                ...selectedEvent,
                                imageUrl: e.target.value,
                              })
                            }
                            placeholder="https://ejemplo.com/imagen.jpg"
                          />
                          {selectedEvent.imageUrl && (
                            <div className="mt-2 aspect-video relative rounded-md overflow-hidden">
                              <img
                                src={selectedEvent.imageUrl}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h2 className="text-xl font-semibold">
                            {selectedEvent.title}
                          </h2>
                          <div className="flex items-center gap-2 mt-1">
                            {getStatusBadge(selectedEvent.status)}
                            {selectedEvent.recurring && (
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1"
                              >
                                <Repeat className="w-3 h-3" /> Recurrente
                              </Badge>
                            )}
                          </div>
                        </div>

                        {selectedEvent.imageUrl && (
                          <div className="aspect-video relative rounded-md overflow-hidden">
                            <img
                              src={selectedEvent.imageUrl}
                              alt={selectedEvent.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="space-y-1">
                          <Label className="text-sm text-gray-500">
                            Descripción
                          </Label>
                          <p className="text-gray-700">
                            {selectedEvent.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label className="text-sm text-gray-500">
                              Fecha y hora
                            </Label>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4 h-4 text-gray-500" />
                              <span>
                                {selectedEvent.date.toLocaleDateString(
                                  undefined,
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span>{selectedEvent.time}</span>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-sm text-gray-500">
                              Plataformas
                            </Label>
                            <div className="flex flex-wrap gap-2">
                              {selectedEvent.platforms.map((platform) => (
                                <Badge
                                  key={platform}
                                  variant="outline"
                                  className="flex items-center gap-1"
                                >
                                  {getPlatformIcon(platform)}
                                  <span className="capitalize">{platform}</span>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {selectedEvent.assignedTo && (
                          <div className="space-y-1">
                            <Label className="text-sm text-gray-500">
                              Asignado a
                            </Label>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-500" />
                              <span>{selectedEvent.assignedTo}</span>
                            </div>
                          </div>
                        )}

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="font-medium">Estado de publicación</h3>
                          <div className="flex items-center gap-2">
                            {selectedEvent.status === "published" ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : selectedEvent.status === "failed" ? (
                              <AlertCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <Clock className="w-5 h-5 text-blue-500" />
                            )}
                            <span>
                              {selectedEvent.status === "published"
                                ? "Publicado correctamente"
                                : selectedEvent.status === "failed"
                                  ? "Error en la publicación"
                                  : selectedEvent.status === "scheduled"
                                    ? "Programado para publicación automática"
                                    : "Borrador pendiente de programar"}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 flex gap-2">
                          {selectedEvent.status === "draft" && (
                            <Button className="flex-1">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              Programar
                            </Button>
                          )}
                          {selectedEvent.status === "scheduled" && (
                            <Button className="flex-1">
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Publicar ahora
                            </Button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </ScrollArea>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-6 text-center">
                <div className="space-y-4">
                  <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium">
                    Selecciona una publicación
                  </h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    Selecciona una publicación existente para ver sus detalles o
                    crea una nueva publicación para este día.
                  </p>
                  <Button onClick={handleCreateEvent} disabled={!date}>
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Publicación
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarEditor;
