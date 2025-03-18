# Documentación de Servicios de taussepro

Esta documentación describe los servicios implementados para la plataforma taussepro, siguiendo la arquitectura de "Monolito Modular con Servicios Estratégicos".

## Índice de Servicios

Todos los servicios están disponibles a través de un único punto de entrada en `src/lib/services/index.ts`:

```typescript
import { aiService, marketingService, collaborationService, gamificationService, profileService } from '@/lib/services';
```

## Servicio de IA (AIService)

El servicio de IA gestiona todas las interacciones con los modelos de IA, incluyendo solicitudes, respuestas, contenido guardado e imágenes generadas.

### Métodos Principales

```typescript
// Crear una solicitud de IA
const request = await aiService.createRequest(userId, prompt, model, context);

// Guardar una respuesta de IA
const response = await aiService.saveResponse(requestId, content, model, tokensUsed);

// Actualizar el estado de una solicitud
await aiService.updateRequestStatus(requestId, 'completed');

// Obtener historial de solicitudes
const history = await aiService.getUserRequestHistory(userId);

// Guardar contenido generado
const savedContent = await aiService.saveContent(userId, title, content, 'article', tags);

// Obtener contenido guardado
const content = await aiService.getUserSavedContent(userId, 'article');

// Guardar imagen generada
const image = await aiService.saveGeneratedImage(userId, prompt, imageUrl, 'dalle3');

// Obtener imágenes generadas
const images = await aiService.getUserGeneratedImages(userId);
```

## Servicio de Marketing (MarketingService)

El servicio de Marketing gestiona campañas, métricas y enlaces UTM.

### Métodos Principales

```typescript
// Crear una campaña
const campaign = await marketingService.createCampaign(
  userId, 
  'Campaña Navidad', 
  'Promoción especial de fin de año', 
  '2025-12-01', 
  '2025-12-31', 
  5000,
  { age: '25-45', interests: ['tecnología', 'marketing'] },
  { conversions: 500, revenue: 50000 }
);

// Actualizar una campaña
await marketingService.updateCampaign(campaignId, { status: 'active' });

// Obtener campañas de un usuario
const campaigns = await marketingService.getUserCampaigns(userId);

// Obtener campaña con métricas
const campaignWithMetrics = await marketingService.getCampaignWithMetrics(campaignId);

// Registrar una métrica
await marketingService.recordCampaignMetric(
  campaignId, 
  'clicks', 
  150, 
  new Date().toISOString(), 
  'facebook'
);

// Crear enlace UTM
const utmLink = await marketingService.createUtmLink(
  campaignId,
  userId,
  'https://taussepro.com',
  'facebook',
  'cpc',
  'navidad2025',
  'marketing',
  'banner01'
);

// Obtener enlaces UTM de una campaña
const utmLinks = await marketingService.getCampaignUtmLinks(campaignId);

// Registrar clic en enlace UTM
await marketingService.recordUtmClick(utmLinkId);

// Obtener resumen de métricas
const metricsSummary = await marketingService.getUserCampaignsMetricsSummary(userId);
```

## Servicio de Colaboración (CollaborationService)

El servicio de Colaboración gestiona salas de chat y mensajes entre usuarios.

### Métodos Principales

```typescript
// Crear sala de chat
const chatRoom = await collaborationService.createChatRoom(
  'Equipo de Marketing',
  creatorUserId,
  [creatorUserId, user2Id, user3Id],
  false, // No es chat directo
  { icon: 'marketing-team.png' }
);

// Obtener salas de chat
const chatRooms = await collaborationService.getUserChatRooms(userId);

// Enviar mensaje
const message = await collaborationService.sendChatMessage(
  userId,
  roomId,
  'Hola equipo, ¿cómo va la campaña?',
  [{ type: 'image', url: 'https://example.com/image.jpg' }]
);

// Obtener mensajes
const messages = await collaborationService.getChatMessages(roomId);

// Marcar mensaje como leído
await collaborationService.markMessageAsRead(messageId, userId);

// Obtener mensajes no leídos
const unreadMessages = await collaborationService.getUnreadMessages(userId);

// Añadir miembro a sala
await collaborationService.addMemberToChatRoom(roomId, newUserId);

// Eliminar miembro de sala
await collaborationService.removeMemberFromChatRoom(roomId, userId);
```

## Servicio de Gamificación (GamificationService)

El servicio de Gamificación gestiona logros, premios y tablas de clasificación.

### Métodos Principales

```typescript
// Obtener todos los logros
const achievements = await gamificationService.getAllAchievements();

// Obtener logros de un usuario
const userAchievements = await gamificationService.getUserAchievements(userId);

// Otorgar un logro
await gamificationService.awardAchievement(
  userId,
  achievementId,
  { campaign_id: campaignId }
);

// Verificar elegibilidad para un logro
const eligibility = await gamificationService.checkAchievementEligibility(userId, achievementId);

// Obtener tabla de clasificación
const leaderboard = await gamificationService.getUsersLeaderboard(10);

// Crear un nuevo logro (admin)
const newAchievement = await gamificationService.createAchievement(
  'Maestro del Marketing',
  'Crear 10 campañas exitosas',
  500,
  { campaigns_created: 10, min_success_rate: 0.8 },
  'marketing',
  'https://taussepro.com/icons/master-marketer.png'
);
```

## Servicio de Perfiles (ProfileService)

El servicio de Perfiles gestiona perfiles de usuario y organizaciones.

### Métodos Principales

```typescript
// Obtener perfil de usuario
const profile = await profileService.getUserProfile(userId);

// Crear o actualizar perfil
await profileService.upsertProfile(
  userId,
  'Juan Pérez',
  'https://taussepro.com/avatars/juan.jpg',
  'admin',
  organizationId,
  { theme: 'dark', language: 'es' }
);

// Actualizar preferencias
await profileService.updateUserPreferences(userId, { notifications: { email: true, push: false } });

// Obtener organización del usuario
const organization = await profileService.getUserOrganization(userId);

// Crear organización
const newOrg = await profileService.createOrganization(
  'Agencia Digital XYZ',
  ownerId,
  'https://taussepro.com/logos/xyz.png',
  { billing_email: 'facturacion@xyz.com' },
  'premium',
  'active'
);

// Actualizar organización
await profileService.updateOrganization(organizationId, { subscription_tier: 'enterprise' });

// Obtener miembros de organización
const members = await profileService.getOrganizationMembers(organizationId);

// Añadir usuario a organización
await profileService.addUserToOrganization(userId, organizationId, 'editor');

// Eliminar usuario de organización
await profileService.removeUserFromOrganization(userId, organizationId);

// Cambiar rol de usuario
await profileService.changeUserRole(userId, organizationId, 'admin');
```

## Implementación de Políticas de Seguridad (RLS)

Todas las tablas tienen implementadas políticas de Row Level Security (RLS) para garantizar que los usuarios solo puedan acceder a los datos que les corresponden:

- Los usuarios solo pueden ver y modificar sus propios datos
- Los administradores de una organización pueden ver y modificar los datos de todos los miembros de su organización
- Los superadministradores pueden ver y modificar todos los datos

## Próximos Pasos para Fénix

1. Implementar componentes de interfaz de usuario que consuman estos servicios
2. Crear hooks personalizados para facilitar el uso de los servicios en componentes React
3. Implementar manejo de estados con Zustand para gestionar datos de la aplicación
4. Desarrollar flujos de autenticación y autorización utilizando el servicio de perfiles

## Ejemplo de Uso en Componente React

```tsx
import { useState, useEffect } from 'react';
import { aiService } from '@/lib/services';

const AIAssistant = ({ userId }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Cargar historial al montar el componente
    const loadHistory = async () => {
      const userHistory = await aiService.getUserRequestHistory(userId);
      setHistory(userHistory);
    };
    
    loadHistory();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Crear solicitud
      const request = await aiService.createRequest(
        userId,
        prompt,
        'gpt-4',
        { previous_messages: history.slice(-5) }
      );
      
      // Aquí iría la lógica para obtener la respuesta de la IA
      // Por ejemplo, llamando a una API externa
      
      // Guardar respuesta
      const aiResponse = await aiService.saveResponse(
        request.id,
        'Esta es una respuesta de ejemplo',
        'gpt-4',
        150
      );
      
      setResponse(aiResponse.content);
      
      // Actualizar historial
      setHistory([...history, { request, response: aiResponse }]);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Asistente de IA</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="¿En qué puedo ayudarte hoy?"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Enviar'}
        </button>
      </form>
      
      {response && (
        <div className="response">
          <h3>Respuesta:</h3>
          <p>{response}</p>
        </div>
      )}
      
      <div className="history">
        <h3>Historial:</h3>
        <ul>
          {history.map((item) => (
            <li key={item.request.id}>
              <strong>Tú:</strong> {item.request.prompt}
              <br />
              <strong>IA:</strong> {item.response?.content || 'Sin respuesta'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIAssistant;
```
