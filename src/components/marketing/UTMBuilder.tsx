import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Link2,
  Copy,
  Check,
  Plus,
  Trash2,
  Save,
  Download,
  Upload,
  RefreshCw,
  History,
  Sparkles,
} from "lucide-react";

interface UTMParams {
  url: string;
  source: string;
  medium: string;
  campaign: string;
  term?: string;
  content?: string;
}

interface SavedUTM extends UTMParams {
  id: string;
  name: string;
  createdAt: Date;
}

const mockSavedUTMs: SavedUTM[] = [
  {
    id: "1",
    name: "Campaña Email Mayo",
    url: "https://stellarengage.com/promo",
    source: "newsletter",
    medium: "email",
    campaign: "mayo2024",
    content: "button-blue",
    createdAt: new Date(2024, 4, 5),
  },
  {
    id: "2",
    name: "Instagram Stories",
    url: "https://stellarengage.com/productos",
    source: "instagram",
    medium: "social",
    campaign: "verano2024",
    content: "story-swipeup",
    createdAt: new Date(2024, 4, 10),
  },
  {
    id: "3",
    name: "Google Ads Remarketing",
    url: "https://stellarengage.com/oferta",
    source: "google",
    medium: "cpc",
    campaign: "remarketing",
    term: "marketing digital",
    createdAt: new Date(2024, 4, 15),
  },
];

const UTMBuilder = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [utmParams, setUtmParams] = useState<UTMParams>({
    url: "",
    source: "",
    medium: "",
    campaign: "",
  });
  const [savedUTMs, setSavedUTMs] = useState<SavedUTM[]>(mockSavedUTMs);
  const [selectedUTM, setSelectedUTM] = useState<SavedUTM | null>(null);
  const [utmName, setUtmName] = useState("");
  const [copied, setCopied] = useState(false);
  const [bulkLinks, setBulkLinks] = useState<string[]>([]);
  const [bulkResults, setBulkResults] = useState<string[]>([]);

  // Common UTM sources and mediums for suggestions
  const commonSources = [
    "google",
    "facebook",
    "instagram",
    "twitter",
    "linkedin",
    "newsletter",
    "email",
    "direct",
    "referral",
  ];

  const commonMediums = [
    "cpc",
    "organic",
    "social",
    "email",
    "display",
    "affiliate",
    "referral",
    "banner",
    "push",
  ];

  const buildUTMUrl = (params: UTMParams): string => {
    if (!params.url) return "";

    const url = new URL(
      params.url.startsWith("http") ? params.url : `https://${params.url}`,
    );

    if (params.source) url.searchParams.set("utm_source", params.source);
    if (params.medium) url.searchParams.set("utm_medium", params.medium);
    if (params.campaign) url.searchParams.set("utm_campaign", params.campaign);
    if (params.term) url.searchParams.set("utm_term", params.term);
    if (params.content) url.searchParams.set("utm_content", params.content);

    return url.toString();
  };

  const handleCopyUrl = () => {
    const utmUrl = buildUTMUrl(utmParams);
    if (utmUrl) {
      navigator.clipboard.writeText(utmUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveUTM = () => {
    if (
      !utmName ||
      !utmParams.url ||
      !utmParams.source ||
      !utmParams.medium ||
      !utmParams.campaign
    ) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    const newUTM: SavedUTM = {
      id: Date.now().toString(),
      name: utmName,
      ...utmParams,
      createdAt: new Date(),
    };

    setSavedUTMs([newUTM, ...savedUTMs]);
    setUtmName("");
    alert("UTM guardado correctamente");
  };

  const handleLoadUTM = (utm: SavedUTM) => {
    setUtmParams({
      url: utm.url,
      source: utm.source,
      medium: utm.medium,
      campaign: utm.campaign,
      term: utm.term,
      content: utm.content,
    });
    setSelectedUTM(utm);
    setActiveTab("builder");
  };

  const handleDeleteUTM = (id: string) => {
    setSavedUTMs(savedUTMs.filter((utm) => utm.id !== id));
    if (selectedUTM?.id === id) {
      setSelectedUTM(null);
    }
  };

  const handleGenerateAI = () => {
    // Simulate AI generation
    setTimeout(() => {
      setUtmParams({
        ...utmParams,
        source: utmParams.source || "newsletter",
        medium: utmParams.medium || "email",
        campaign: utmParams.campaign || "promo_mayo2024",
        content: "ai_generated",
      });
    }, 1000);
  };

  const handleBulkProcess = () => {
    const results = bulkLinks
      .map((link) => {
        if (!link.trim()) return "";

        try {
          const url = new URL(
            link.startsWith("http") ? link : `https://${link}`,
          );

          url.searchParams.set("utm_source", utmParams.source || "bulk");
          url.searchParams.set("utm_medium", utmParams.medium || "bulk");
          url.searchParams.set(
            "utm_campaign",
            utmParams.campaign || "bulk_campaign",
          );
          if (utmParams.term) url.searchParams.set("utm_term", utmParams.term);
          if (utmParams.content)
            url.searchParams.set("utm_content", utmParams.content);

          return url.toString();
        } catch (e) {
          return `Error: ${link} no es una URL válida`;
        }
      })
      .filter(Boolean);

    setBulkResults(results);
  };

  const handleBulkCopy = () => {
    if (bulkResults.length) {
      navigator.clipboard.writeText(bulkResults.join("\n"));
      alert("Enlaces copiados al portapapeles");
    }
  };

  const handleBulkExport = () => {
    if (!bulkResults.length) return;

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Original URL,UTM URL\n" +
      bulkLinks.map((link, i) => `"${link}","${bulkResults[i] || ""}"`);

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "utm_links.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Link2 className="w-5 h-5 text-primary" />
          Generador de UTMs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Constructor
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Guardados
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Procesamiento Masivo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url">URL Base *</Label>
                <Input
                  id="url"
                  placeholder="https://tudominio.com/pagina"
                  value={utmParams.url}
                  onChange={(e) =>
                    setUtmParams({ ...utmParams, url: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Fuente (utm_source) *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={utmParams.source}
                      onValueChange={(value) =>
                        setUtmParams({ ...utmParams, source: value })
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecciona o escribe" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonSources.map((source) => (
                          <SelectItem key={source} value={source}>
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="O escribe aquí"
                      value={utmParams.source}
                      onChange={(e) =>
                        setUtmParams({ ...utmParams, source: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Ej: google, facebook, newsletter
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medium">Medio (utm_medium) *</Label>
                  <div className="flex gap-2">
                    <Select
                      value={utmParams.medium}
                      onValueChange={(value) =>
                        setUtmParams({ ...utmParams, medium: value })
                      }
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Selecciona o escribe" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonMediums.map((medium) => (
                          <SelectItem key={medium} value={medium}>
                            {medium}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="O escribe aquí"
                      value={utmParams.medium}
                      onChange={(e) =>
                        setUtmParams({ ...utmParams, medium: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Ej: cpc, email, social
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="campaign">Campaña (utm_campaign) *</Label>
                <Input
                  id="campaign"
                  placeholder="nombre_de_tu_campaña"
                  value={utmParams.campaign}
                  onChange={(e) =>
                    setUtmParams({ ...utmParams, campaign: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  Ej: black_friday_2024, newsletter_mayo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="term">Término (utm_term)</Label>
                  <Input
                    id="term"
                    placeholder="palabras_clave"
                    value={utmParams.term || ""}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, term: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Usado para campañas de búsqueda pagada
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Contenido (utm_content)</Label>
                  <Input
                    id="content"
                    placeholder="identificador_de_anuncio"
                    value={utmParams.content || ""}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, content: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">
                    Ej: banner_top, cta_blue
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <Button
                    variant="outline"
                    onClick={handleGenerateAI}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Sugerir con IA
                  </Button>

                  <div className="flex gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="utm-name">Nombre para guardar</Label>
                      <Input
                        id="utm-name"
                        placeholder="Ej: Campaña Email Mayo"
                        value={utmName}
                        onChange={(e) => setUtmName(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleSaveUTM} className="self-end">
                      <Save className="w-4 h-4 mr-2" />
                      Guardar
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>URL con parámetros UTM</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-3 bg-gray-50 rounded-md overflow-x-auto text-sm">
                      <code>
                        {buildUTMUrl(utmParams) ||
                          "Completa los campos requeridos"}
                      </code>
                    </div>
                    <Button
                      onClick={handleCopyUrl}
                      disabled={!buildUTMUrl(utmParams)}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">UTMs Guardados</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                <div className="space-y-4">
                  {savedUTMs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No hay UTMs guardados
                    </div>
                  ) : (
                    savedUTMs.map((utm) => (
                      <Card key={utm.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{utm.name}</h4>
                            <div className="text-xs text-gray-500">
                              {utm.createdAt.toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{utm.source}</Badge>
                            <Badge variant="outline">{utm.medium}</Badge>
                            <Badge variant="outline">{utm.campaign}</Badge>
                            {utm.term && (
                              <Badge variant="outline">{utm.term}</Badge>
                            )}
                          </div>

                          <div className="text-sm text-gray-600 truncate">
                            {utm.url}
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteUTM(utm.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadUTM(utm)}
                            >
                              <History className="w-4 h-4 mr-2" />
                              Cargar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>URLs (una por línea)</Label>
                <Textarea
                  placeholder="https://tudominio.com/pagina1\nhttps://tudominio.com/pagina2"
                  className="min-h-[150px]"
                  value={bulkLinks.join("\n")}
                  onChange={(e) => setBulkLinks(e.target.value.split("\n"))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Fuente (utm_source)</Label>
                  <Input
                    placeholder="Ej: bulk_campaign"
                    value={utmParams.source}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, source: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Medio (utm_medium)</Label>
                  <Input
                    placeholder="Ej: email"
                    value={utmParams.medium}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, medium: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Campaña (utm_campaign)</Label>
                  <Input
                    placeholder="Ej: bulk_mayo_2024"
                    value={utmParams.campaign}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, campaign: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Término (utm_term)</Label>
                  <Input
                    placeholder="Opcional"
                    value={utmParams.term || ""}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, term: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Contenido (utm_content)</Label>
                  <Input
                    placeholder="Opcional"
                    value={utmParams.content || ""}
                    onChange={(e) =>
                      setUtmParams({ ...utmParams, content: e.target.value })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleBulkProcess} className="w-full">
                <RefreshCw className="w-4 h-4 mr-2" />
                Procesar URLs
              </Button>

              {bulkResults.length > 0 && (
                <div className="space-y-4">
                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Resultados</Label>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleBulkCopy}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar Todo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleBulkExport}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Exportar CSV
                        </Button>
                      </div>
                    </div>

                    <ScrollArea className="h-[200px] border rounded-md p-3">
                      <div className="space-y-2">
                        {bulkResults.map((result, index) => (
                          <div
                            key={index}
                            className="text-sm font-mono break-all"
                          >
                            {result}
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UTMBuilder;
