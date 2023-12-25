export interface PageModel {
  title: string;
  cssFile: string;
  jsFile: string;
}

export interface PartialModel {
  currentTime: string;
  error: string | null;
}

export type NodeEnv = 'development' | 'production';
