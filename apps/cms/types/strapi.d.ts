export interface StrapiEnv {
  (key: string, defaultValue?: string): string;
  int(key: string, defaultValue?: number): number;
  float(key: string, defaultValue?: number): number;
  bool(key: string, defaultValue?: boolean): boolean;
  json(key: string, defaultValue?: any): any;
  array(key: string, defaultValue?: any[]): any[];
}

export interface StrapiConfig {
  env: StrapiEnv;
}

declare global {
  namespace Strapi {
    interface Env extends StrapiEnv {}
  }
}
