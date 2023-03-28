import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const useDataStore = create(
    persist(
        (set, get) => ({

            data: [],
            dataCount: 0,
            
            addData: (newdata) => {
                
                let data = get().data.slice(0)
                data.push(newdata)
                
                set({
                    data: data,
                    dataCount: get().dataCount + 1,
                })
            },
            updateDataBySceneId: (scene_id, newdata) => {

                let data = get().data.slice(0)
                data = data.filter((item) => item.sid !== scene_id)
                if(newdata.length > 0) data = data.concat(newdata)

                set({
                    data: data,
                    dataCount: data.length,
                })

            },
            deleteDataById: (id) => {

                let data = get().data.slice(0)
                data = data.filter((item) => item.id !== id)

                set({
                    data: data,
                    dataCount: data.length,
                })

            },
            getDataBySceneId: (sid) => get().data.filter((item) => item.sid === sid),

        }),
        {
            name: "openai-chatgpt-data-storage",
            storage: createJSONStorage(() => localStorage),
            version: 1,
        }
    )
)

export default useDataStore