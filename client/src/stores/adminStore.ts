import { defineStore } from "pinia";
import { getAdminInformation } from "../services"

export const useAdminStore = defineStore("admin", {
    state: () => ({
        
    }),
    getters: {
    },
    actions: {
        async getAdminInformation() : Promise<{ message: string }> {
            return await getAdminInformation()
        }
    }
});