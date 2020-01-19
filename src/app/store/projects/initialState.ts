import * as AppTypes from 'app/types';
import mockProjects from 'app/__mocks__/projects.json';
import { convertRawProject } from './utils';

const projects: AppTypes.Projects = mockProjects.map(convertRawProject);

const initialState = {
  projects,
  appliedFilters: [],
};

export default initialState;
