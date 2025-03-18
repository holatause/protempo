import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  X, 
  Plus 
} from "lucide-react";
import { ContentItem } from './ContentCalendarTypes';
import { v4 as uuidv4 } from 'uuid';

interface ContentItemFormProps {
  onSubmit: (item: ContentItem) => void;
  onCancel: () => void;
  initialDate?: Date;
  editItem?: ContentItem;
}

export const ContentItemForm: React.FC<ContentItemFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialDate,
  editItem 
}) => {
  // Estado inicial para el formulario
  const [formData, setFormData] = useState<Partial<ContentItem>>(
    editItem || {
      id: uuidv4(),
      title: '',
      description: '',
      platform: '',
      contentType: 'post',
      status: 'draft',
      scheduledDate: initialDate 
        ? new Date(
            initialDate.getFullYear(), 
            initialDate.getMonth(), 
            initialDate.getDate(), 
            10, 0, 0
          ).toISOString() 
        : new Date().toISOString(),
      author: 'Marketing Team',
      tags: [],
      region: 'BOG'
    }
  );
  
  // Estado para el campo de etiquetas
  const [tagInput, setTagInput] = useState('');
  
  // Manejar cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Manejar cambios en los selects
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Manejar la adición de etiquetas
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };
  
  // Manejar la eliminación de etiquetas
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };
  
  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.title || !formData.platform || !formData.scheduledDate) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }
    
    // Enviar el formulario
    onSubmit(formData as ContentItem);
  };
  
  // Formatear fecha para mostrar en el formulario
  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:MM
  };
  
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>
          {editItem ? 'Editar Contenido' : 'Nuevo Contenido'}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título del contenido"
                required
              />
            </div>
            
            {/* Plataforma */}
            <div className="space-y-2">
              <Label htmlFor="platform">Plataforma *</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => handleSelectChange('platform', value)}
              >
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Selecciona una plataforma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="Email">Email</SelectItem>
                  <SelectItem value="Blog">Blog</SelectItem>
                  <SelectItem value="Google Ads">Google Ads</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Descripción */}
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el contenido que vas a publicar"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tipo de contenido */}
            <div className="space-y-2">
              <Label htmlFor="contentType">Tipo de contenido</Label>
              <Select
                value={formData.contentType}
                onValueChange={(value) => handleSelectChange('contentType', value as any)}
              >
                <SelectTrigger id="contentType">
                  <SelectValue placeholder="Selecciona un tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">Post</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="story">Story</SelectItem>
                  <SelectItem value="reel">Reel</SelectItem>
                  <SelectItem value="blog">Blog</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="ad">Anuncio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Estado */}
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value as any)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Selecciona un estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="scheduled">Programado</SelectItem>
                  <SelectItem value="published">Publicado</SelectItem>
                  <SelectItem value="archived">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Región */}
            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Select
                value={formData.region}
                onValueChange={(value) => handleSelectChange('region', value)}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Selecciona una región" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BOG">Bogotá</SelectItem>
                  <SelectItem value="MED">Medellín</SelectItem>
                  <SelectItem value="CAL">Cali</SelectItem>
                  <SelectItem value="BAR">Barranquilla</SelectItem>
                  <SelectItem value="NAC">Nacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha programada */}
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Fecha y hora programada *</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="scheduledDate"
                  name="scheduledDate"
                  type="datetime-local"
                  className="pl-8"
                  value={formatDateForInput(formData.scheduledDate || '')}
                  onChange={(e) => handleSelectChange('scheduledDate', new Date(e.target.value).toISOString())}
                  required
                />
              </div>
            </div>
            
            {/* Campaña */}
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaña</Label>
              <Select
                value={formData.campaign || ''}
                onValueChange={(value) => handleSelectChange('campaign', value)}
              >
                <SelectTrigger id="campaign">
                  <SelectValue placeholder="Asociar a una campaña" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sin campaña</SelectItem>
                  <SelectItem value="Lanzamiento Colección Verano">Lanzamiento Colección Verano</SelectItem>
                  <SelectItem value="Promoción Día sin IVA">Promoción Día sin IVA</SelectItem>
                  <SelectItem value="Webinar Tendencias 2024">Webinar Tendencias 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Autor */}
          <div className="space-y-2">
            <Label htmlFor="author">Autor</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Nombre del autor o equipo"
            />
          </div>
          
          {/* Etiquetas */}
          <div className="space-y-2">
            <Label htmlFor="tags">Etiquetas</Label>
            <div className="flex gap-2">
              <Input
                id="tagInput"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Añadir etiqueta"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddTag}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Lista de etiquetas */}
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                  >
                    <span>{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-secondary-foreground/70 hover:text-secondary-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button type="submit">
            {editItem ? 'Guardar cambios' : 'Crear contenido'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
