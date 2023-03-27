import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useSystemStore = create(
    persist(
        (set, get) => ({
            
            darkMode: false,
            
            setDarkMode: (flag) => set({ darkMode: flag }),
            
        }),
        {
            name: "openai-chatgpt-app-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useSystemStore