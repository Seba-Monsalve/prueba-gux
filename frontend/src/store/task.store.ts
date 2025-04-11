import axios from "axios";
import { create } from "zustand";

interface StoreState {
  task: any;
  tasks: any[];
  isLoading: boolean;
  error: null | string;
  message: null | string;
  isFetchingTasks: boolean;
  getTasks: () => Promise<any>;
  addTask: ({ title, description }: any) => Promise<void>;
  toogleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Promise<any>;
  updateTask: ({ id, titulo, descripcion, estado }: any) => Promise<any>;
}

export const useTaskStore = create<StoreState>((set) =>
  // persist
  ({
    task: null,
    tasks: [],
    isLoading: false,
    error: null,
    message: null,
    isFetchingTasks: true,
    getTasks: async () => {
      set({ isLoading: true, message: null });
      try {
        const res = await axios.get(`/api/tasks`);
        const { tasks, message, ok, error } = res.data;
        if (!ok) {
          set({ tasks: [], isLoading: false, message });
          return;
        }
        set({
          tasks,
          isLoading: false,
          message,
          error: null,
        });
      } catch (error) {
        set({
          isLoading: false,
          error: (error as any).response.data.message || "Error fetching tasks",
        });
      } finally {
        set({ isLoading: false });
      }
    },

    getTaskById: async (id: string) => {
      console.log("asd");
      set({ isLoading: true, message: null });
      try {
        const res = await axios.get(`/api/tasks/${id}`);

        const { task, message, ok, error, isLoading } = res.data;

        if (!ok) {
          set({ task: [], isLoading: false, message });
          return;
        }
        set({
          task,
          isLoading: false,
          message,
          error: null,
        });
      } catch (error) {
        set({
          isLoading: false,
          error: (error as any).response.data.message || "Error fetching tasks",
        });
      } finally {
        set({ isLoading: false });
      }
    },
    addTask: async ({ titulo, descripcion }: any) => {
      set({ isLoading: true, message: null });
      try {
        const res = await axios.post(`/api/tasks/add`, {
          titulo,
          descripcion,
        });
        const { task, message, ok, error } = res.data;
        console.log({data:res.data});
        if (!ok) {
          set({ tasks: [], isLoading: false, message });
          return;
        }
        console.log({ task });

        set((state) => ({
          tasks: [...state.tasks].concat(task),
          isLoading: false,
          message,
          error: null,
        }));
      } catch (error) {
        set({
          isLoading: false,
          error: (error as any).response.data.message || "Error adding task",
        });
      }
    },

    toogleTask: async (id: string) => {
      set({ isLoading: true, message: null });
      try {
        const res = await axios.post(`api/tasks/toggle/${id}`);
        const { task, ok } = res.data;

        if (!ok) {
          set({ tasks: [], isLoading: false });
          return;
        }

        set((state) => ({
          tasks: state.tasks.map((t) => (t.id == id ? task : t)),
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        set({
          isLoading: false,
          error: (error as any).response.data.message || "Error toggling task",
        });
      }
    },
    deleteTask: async (id: string) => {
      set({ isLoading: true, message: null });
      try {
        const res = await axios.delete(`api/tasks/delete/${id}`);
        const { ok } = res.data;

        if (!ok) {
          set({ tasks: [], isLoading: false });
          return;
        }
        // revisar para que actualice solo el que cambia
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        set({
          isLoading: false,
          error: (error as any).response.data.message || "Error deleting task",
        });
      }
    },
    updateTask: async ({ id, titulo, descripcion, estado }) => {
      console.log("UPDATE");
      set({ isLoading: true, message: null });
      try {
        const res = await axios.post(`/api/tasks/update/${id}`, {
          titulo,
          descripcion,
          estado,
        });
        const { ok } = res.data;
        if (!ok) {
          set({ tasks: [], isLoading: false });
          return;
        }

        const updatedTask = res.data.task;

        set((state) => ({
          tasks: state.tasks.map((t) => (t.id == id ? updatedTask : t)),
          isLoading: false,
          error: null,
        }));
      } catch (error) {
        set({
          isLoading: false,
          error: (error as any).response.data.message || "Error deleting task",
        });
      }
    },
    // }
    // ,
    // {
    //   name: "auth-storage",
  })
);
