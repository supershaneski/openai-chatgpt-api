import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useSystemStore = create(
    persist(
        (set, get) => ({
            
            darkMode: false,
            chatMode: 'person',
            
            setDarkMode: (flag) => set({ darkMode: flag }),
            setChatMode: (mode) => set({ chatMode: mode })
            
        }),
        {
            name: "openai-chatgpt-app-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useSystemStore