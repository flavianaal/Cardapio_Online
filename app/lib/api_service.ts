import { apiClient } from "./api_client";
import { Pizza } from "./types";

export async function getPizzas(): Promise<Pizza[]> {

    try{

        const pizzas = await apiClient.get<Pizza[]>("/pizzas/");
        return pizzas;


    } catch (error){

        console.log("Api erro on request >>> /pizzas <<<", error);
        return [];

    }
    
    
}

export async function getPizzaDetails(id: string): Promise<Pizza | null> {
    try {
        const pizza = await apiClient.get<Pizza>(`/pizzas/${id}`);
        return pizza;

    } catch (error) {
        console.log(`Api erro on request >>> /pizzas/${id} <<<`, error);
        return null;
    }
}