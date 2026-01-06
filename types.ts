
export enum Category {
  COMBAT = 'Combat',
  MOVEMENT = 'Movement',
  VISUALS = 'Visuals',
  MISC = 'Misc',
  SYSTEM = 'System'
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: Category;
  value?: number;
  min?: number;
  max?: number;
}

export interface Config {
  version: string;
  lastUpdated: string;
  features: Feature[];
}

export interface ProjectFile {
  path: string;
  language: 'cpp' | 'h' | 'json';
  content: string;
}
