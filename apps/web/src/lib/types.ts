// Base Strapi response interfaces
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, any>;
  };
}

export interface StrapiEntityResponse<T> {
  data: {
    id: number;
    documentId: string;
    attributes: T;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    locale?: string;
  };
}
export interface StrapiCollectionResponse<T> {
  data: Array<{
    id: number;
    documentId: string;
    attributes: T;
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
    locale?: string;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// API method parameters
export interface StrapiParams {
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  locale?: string;
  publicationState?: 'live' | 'preview';
}

// Content types (expandable when creating content types)
export interface PageAttributes {
  title: string;
  slug: string;
  content?: string;
  seo?: any;
}

export interface BlogPostAttributes {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: any;
  author?: any;
  tags?: any[];
}