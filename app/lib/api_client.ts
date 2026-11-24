
class ApiClient {

    private baseUrl = "https://pizzaria-api.duckdns.org";
    public imageHost = "https://pizzaria-api.duckdns.org/uploads/pizzas";   

    //private baseUrl = "http://3.97.65.152:8080";
    //public imageHost = "http://3.97.65.152:8080/uploads/pizzas";
    private headers = { "content-Type": "application/json" };

    async get<T>(endpoint: string): Promise<T> {

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "GET",
            //headers: this.headers,
        });

        if (!response.ok) {
            throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
    }
}

export const apiClient = new ApiClient();
