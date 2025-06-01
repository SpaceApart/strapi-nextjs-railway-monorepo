import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class StrapiAPI {
  private client: AxiosInstance;
  private baseURL: string;
  private apiToken?: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    this.apiToken = process.env.STRAPI_API_TOKEN;
    
    this.client = axios.create({
      baseURL: `${this.baseURL}/api`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add auth token if available
    if (this.apiToken) {
      this.client.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${this.apiToken}`;
    }
  }

  // Generic GET request
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(endpoint, config);
    return response.data;
  }

  // Generic POST request
  async post<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post(endpoint, data, config);
    return response.data;
  }

  // Generic PUT request
  async put<T>(
    endpoint: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put(endpoint, data, config);
    return response.data;
  }

  // Generic DELETE request
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(endpoint, config);
    return response.data;
  }

  // Set auth token
  setAuthToken(token: string) {
    this.apiToken = token;
    this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Clear auth token
  clearAuthToken() {
    this.apiToken = undefined;
    delete this.client.defaults.headers.common["Authorization"];
  }
}

// Export singleton instance
export const strapiAPI = new StrapiAPI();

// Export class for custom instances
export default StrapiAPI;