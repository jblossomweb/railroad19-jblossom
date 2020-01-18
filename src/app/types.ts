export interface Project {
  title: string,
  division: string,
  project_owner: string,
  budget: number,
  status: 'archived' | 'new' | 'working' | 'delivered',
  created: string,
  modified?: string | null
};

export type Projects = Project[];
