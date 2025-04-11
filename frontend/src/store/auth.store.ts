import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  user: null;
  isLoading: boolean;
  error: null | string;
  message: null | string;
  isFetchingUser: boolean;
  signUp: (username: string, email: string, password: string) => void;
  login: (email: string, password: string) => any | void;
  fetchUser: () => void;
  logout: () => any;
}

export const useAuthStore = create<StoreState>(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      message: null,
      isFetchingUser: true,
      signUp: async (username, email, password) => {
        console.log("signUp", username, email, password);
        set({ isLoading: true, message: null });
        try {
          const res = await axios.post(`api/auth/signup`, {
            username,
            email,
            password,
          });

          if (!res.data.ok) {
            set({ user: null, isLoading: false, message: res.data.message });
            return;
          }
          set({
            user: res.data.user,
            isLoading: false,
            message: res.data.message,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: (error as any).response.data.message || "Error Signing user",
          });
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, message: null });
        try {
          const res = await axios.post(`api/auth/login`, {
            email,
            password,
          });

          const { user, message, ok, error } = res.data;

          if (!ok) {
            set({ user: null, isLoading: false, message: error });
            return { error };
          }
          set({
            user: user,
            isLoading: false,
            message: message,
            error: null,
          });
          return { user, message };
        } catch (error) {
          console.log(error);
          set({
            isLoading: false,
            error: (error as any).response.data.message || "Error Login user",
          });
          return {
            isLoading: false,
            error: (error as any).response.data.message || "Error Login user",
          };
        }
      },

      fetchUser: async () => {
        set({ isFetchingUser: true, message: null });
        try {
          const res = await axios.get(`api/auth/fetch-user`);

          if (!res.data.ok) {
            set({
              user: null,
              isFetchingUser: false,
              message: res.data.message,
            });
            return;
          }
          set({
            user: res.data.user,
            isFetchingUser: false,
            message: res.data.message,
            error: null,
          });
        } catch (error) {
          set({
            isFetchingUser: false,
            error:
              (error as any).response.data.message || "Error fetching user",
          });
        }
      },
      logout: async () => {
        set({ user: null, error: null, message: null, isLoading: true });
        try {
          const res = await axios.post(`api/auth/logout`);
          const { message } = res.data;
          set({ message, isLoading: false, user: null });
          return { message };
        } catch (error) {
          return {
            error: (error as any).response.data.message || "Error logging out",
            isLoading: false,
          };
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
