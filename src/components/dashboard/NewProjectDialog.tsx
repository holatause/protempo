import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectStore } from "@/store/projects";

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormValues {
  title: string;
  description: string;
  status: "active" | "completed" | "on-hold";
  start_date: string;
  team_size: number;
}

const NewProjectDialog = ({ open, onOpenChange }: NewProjectDialogProps) => {
  const { createProject, isLoading } = useProjectStore();
  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      status: "active",
      start_date: new Date().toISOString().split("T")[0],
      team_size: 1,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await createProject({
        ...data,
        progress: 0,
        user_id: "current-user-id", // TODO: Get from auth
      });
      onOpenChange(false);
      reset();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...register("title")} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" {...register("description")} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Estado</Label>
              <Select
                defaultValue="active"
                onValueChange={(value) =>
                  setValue(
                    "status",
                    value as "active" | "completed" | "on-hold",
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="on-hold">En espera</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_date">Fecha de inicio</Label>
              <Input
                id="start_date"
                type="date"
                {...register("start_date")}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_size">Tamaño del equipo</Label>
            <Input
              id="team_size"
              type="number"
              min="1"
              max="20"
              {...register("team_size", { valueAsNumber: true })}
              required
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Proyecto"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectDialog;
