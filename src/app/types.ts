import {
  SemanticICONS,
} from 'semantic-ui-react';

export interface BaseProject {
  title: string,
  division: string,
  project_owner: string,
  budget: number,
};

export interface Project extends BaseProject {
  status: 'archived' | 'new' | 'working' | 'delivered',
  created: number,
  modified?: number,
}

export interface RawProject extends BaseProject {
  status: string,
  created: string,
  modified?: string | null,
}

export interface IndexedProject extends Project {
  index: number,
}

export type Projects = Project[];
export type RawProjects = RawProject[];
export type IndexedProjects = IndexedProject[];

export interface ProjectFilter {
  column: keyof Project,
  value?: string | number;
  search?: string;
  min?: number,
  max?: number,
};

export type ProjectFilters = ProjectFilter[];

export interface Notification {
  message: string,
  icon: SemanticICONS,
};

export type Notifications = Notification[];
