import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  Edit, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Trash2,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Mail,
  Globe,
  Target,
  Tag,
  MapPin
} from "lucide-react";
import { ContentItem } from './ContentCalendarTypes';

interface ContentItemCardProps {
  item: ContentItem;
}

export const ContentItemCard: React.FC<ContentItemCardProps> = ({ item }) => {
  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Obtener el icono correspondiente a cada plataforma
  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'blog':
        return <Globe className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
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
  
  // Color de fondo según el estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'scheduled':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'published':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'archived':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  
  // Obtener nombre de la región
  const getRegionName = (regionCode: string) => {
    switch (regionCode) {
      case 'BOG':
        return 'Bogotá';
      case 'MED':
        return 'Medellín';
      case 'CAL':
        return 'Cali';
      case 'BAR':
        return 'Barranquilla';
      case 'NAC':
        return 'Nacional';
      default:
        return regionCode;
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Barra lateral con información de plataforma y tipo */}
          <div className="w-full md:w-16 p-4 flex md:flex-col items-center justify-start md:justify-center gap-2 bg-muted/30">
            <div className="p-2 rounded-full bg-background">
              {getPlatformIcon(item.platform)}
            </div>
            <Badge className={`${getContentTypeColor(item.contentType)}`}>
              {item.contentType === 'post' ? 'Post' :
               item.contentType === 'video' ? 'Video' :
               item.contentType === 'story' ? 'Story' :
               item.contentType === 'reel' ? 'Reel' :
               item.contentType === 'blog' ? 'Blog' :
               item.contentType === 'email' ? 'Email' :
               item.contentType === 'ad' ? 'Anuncio' : item.contentType}
            </Badge>
          </div>
          
          {/* Contenido principal */}
          <div className="flex-1 p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </div>
              <div className="mt-2 md:mt-0 flex flex-wrap gap-2">
                <Badge className={getStatusColor(item.status)}>
                  {item.status === 'draft' ? 'Borrador' :
                   item.status === 'scheduled' ? 'Programado' :
                   item.status === 'published' ? 'Publicado' :
                   item.status === 'archived' ? 'Archivado' : item.status}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {getRegionName(item.region)}
                </Badge>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {item.campaign && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {item.campaign}
                </Badge>
              )}
              
              {item.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(item.scheduledDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Por:</span>
                <span className="font-medium">{item.author}</span>
              </div>
            </div>
            
            {/* Métricas de engagement si están disponibles */}
            {item.engagement && (
              <div className="mt-4 flex flex-wrap gap-4">
                {item.engagement.likes !== undefined && (
                  <div className="flex items-center gap-1 text-sm">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span>{item.engagement.likes}</span>
                  </div>
                )}
                {item.engagement.comments !== undefined && (
                  <div className="flex items-center gap-1 text-sm">
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                    <span>{item.engagement.comments}</span>
                  </div>
                )}
                {item.engagement.shares !== undefined && (
                  <div className="flex items-center gap-1 text-sm">
                    <Share2 className="h-4 w-4 text-green-500" />
                    <span>{item.engagement.shares}</span>
                  </div>
                )}
                {item.engagement.impressions !== undefined && (
                  <div className="flex items-center gap-1 text-sm">
                    <Eye className="h-4 w-4 text-purple-500" />
                    <span>{item.engagement.impressions} impresiones</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-2 bg-muted/10 border-t flex justify-end gap-2">
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          Ver
        </Button>
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4 mr-1" />
          Editar
        </Button>
        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4 mr-1" />
          Eliminar
        </Button>
      </CardFooter>
    </Card>
  );
};
