import { List, Record } from 'immutable';
import * as AppTypes from 'app/types';

export type Project = Record<AppTypes.Project>;
export type IndexedProject = Record<AppTypes.IndexedProject>;
export type Projects = List<Project>;
export type IndexedProjects = List<IndexedProject>;
export const defaultProjects: Projects = List([]);

export type SortColumn = string | undefined;
export const defaultSortColumn: SortColumn = undefined;

export type SortDirection = string | undefined;
export const defaultSortDirection: SortDirection = undefined;

export type VisibleColumns = List<keyof AppTypes.Project> | undefined;
export const defaultVisibleColumns: VisibleColumns = undefined;

export type AppliedFilter = Record<AppTypes.ProjectFilter>;
export type AppliedFilters = List<AppliedFilter> | undefined;
export const defaultAppliedFilters: AppliedFilters = undefined;
