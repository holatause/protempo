import { create } from "zustand";
import { projectService, type Project } from "@/lib/services";

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchProject: (id: string) => Promise<void>;
  createProject: (
    project: Omit<Project, "id" | "created_at" | "updated_at">,
  ) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,

  fetchProjects: async () => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Get user ID from auth
      const userId = "current-user-id";
      const projects = await projectService.getProjects(userId);
      set({ projects, isLoading: false });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ error: "Failed to load projects", isLoading: false });
    }
  },

  fetchProject: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      const project = await projectService.getProject(id);
      set({ currentProject: project, isLoading: false });
    } catch (error) {
      console.error("Error fetching project:", error);
      set({ error: "Failed to load project", isLoading: false });
    }
  },

  createProject: async (project) => {
    try {
      set({ isLoading: true, error: null });
      // TODO: Get user ID from auth
      const userId = "current-user-id";
      const newProject = await projectService.createProject({
        ...project,
        user_id: userId,
      });
      set((state) => ({
        projects: [newProject, ...state.projects],
        currentProject: newProject,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error creating project:", error);
      set({ error: "Failed to create project", isLoading: false });
    }
  },

  updateProject: async (id, updates) => {
    try {
      set({ isLoading: true, error: null });
      const updatedProject = await projectService.updateProject(id, updates);
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? updatedProject : p)),
        currentProject:
          state.currentProject?.id === id
            ? updatedProject
            : state.currentProject,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error updating project:", error);
      set({ error: "Failed to update project", isLoading: false });
    }
  },

  deleteProject: async (id) => {
    try {
      set({ isLoading: true, error: null });
      await projectService.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject:
          state.currentProject?.id === id ? null : state.currentProject,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error deleting project:", error);
      set({ error: "Failed to delete project", isLoading: false });
    }
  },
}));
