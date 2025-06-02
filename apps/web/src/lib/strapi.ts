import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from "axios";
import {
  StrapiResponse,
  StrapiError,
  StrapiEntityResponse,
  StrapiCollectionResponse,
  StrapiParams,
  PageAttributes,
  BlogPostAttributes,
} from "./types";

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

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<StrapiError>) => {
        if (error.response?.data?.error) {
          const strapiError = error.response.data.error;
          console.error(`Strapi API Error ${strapiError.status}: ${strapiError.message}`, strapiError.details);
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic method with query params
  async find<T>(
    endpoint: string,
    params?: StrapiParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiCollectionResponse<T>> {
    const response = await this.client.get(endpoint, {
      ...config,
      params: this.buildQueryParams(params),
    });
    return response.data;
  }

  // Get single entity by documentId
  async findOne<T>(
    endpoint: string,
    documentId: string,
    params?: StrapiParams,
    config?: AxiosRequestConfig
  ): Promise<StrapiEntityResponse<T>> {
    const response = await this.client.get(`${endpoint}/${documentId}`, {
      ...config,
      params: this.buildQueryParams(params),
    });
    return response.data;
  }

  // Create new entity
  async create<T>(
    endpoint: string,
    data: Partial<T>,
    config?: AxiosRequestConfig
  ): Promise<StrapiEntityResponse<T>> {
    const response = await this.client.post(
      endpoint,
      { data },
      config
    );
    return response.data;
  }

  // Update entity by documentId
  async update<T>(
    endpoint: string,
    documentId: string,
    data: Partial<T>,
    config?: AxiosRequestConfig
  ): Promise<StrapiEntityResponse<T>> {
    const response = await this.client.put(
      `${endpoint}/${documentId}`,
      { data },
      config
    );
    return response.data;
  }

  // Delete entity by documentId
  async remove(
    endpoint: string,
    documentId: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    await this.client.delete(`${endpoint}/${documentId}`, config);
  }

  // Build query parameters for Strapi
  private buildQueryParams(params?: StrapiParams): Record<string, any> {
    if (!params) return {};

    const queryParams: Record<string, any> = {};

    if (params.populate) {
      queryParams.populate = params.populate;
    }

    if (params.fields) {
      queryParams.fields = params.fields.join(',');
    }

    if (params.filters) {
      queryParams.filters = params.filters;
    }

    if (params.sort) {
      queryParams.sort = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
    }

    if (params.pagination) {
      Object.assign(queryParams, params.pagination);
    }

    if (params.locale) {
      queryParams.locale = params.locale;
    }

    if (params.publicationState) {
      queryParams.publicationState = params.publicationState;
    }

    return queryParams;
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
  // Specific API methods for content types
  
  // Pages
  async getPages(params?: StrapiParams) {
    return this.find<PageAttributes>('pages', params);
  }

  async getPage(documentId: string, params?: StrapiParams) {
    return this.findOne<PageAttributes>('pages', documentId, params);
  }

  async getPageBySlug(slug: string, params?: StrapiParams) {
    return this.find<PageAttributes>('pages', {
      ...params,
      filters: { slug: { $eq: slug } },
    });
  }

  // Blog Posts
  async getBlogPosts(params?: StrapiParams) {
    return this.find<BlogPostAttributes>('blog-posts', params);
  }

  async getBlogPost(documentId: string, params?: StrapiParams) {
    return this.findOne<BlogPostAttributes>('blog-posts', documentId, params);
  }

  async getBlogPostBySlug(slug: string, params?: StrapiParams) {
    return this.find<BlogPostAttributes>('blog-posts', {
      ...params,
      filters: { slug: { $eq: slug } },
    });
  }

  // Auth methods
  async login(identifier: string, password: string) {
    const response = await this.client.post('/auth/local', {
      identifier,
      password,
    });
    return response.data;
  }

  async register(username: string, email: string, password: string) {
    const response = await this.client.post('/auth/local/register', {
      username,
      email,
      password,
    });
    return response.data;
  }

  async forgotPassword(email: string) {
    const response = await this.client.post('/auth/forgot-password', {
      email,
    });
    return response.data;
  }

  async resetPassword(code: string, password: string, passwordConfirmation: string) {
    const response = await this.client.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    });
    return response.data;
  }