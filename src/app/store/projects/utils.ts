import moment from 'moment';
import * as AppTypes from 'app/types';

/*
 * converts 'MM/DD/YYYY' strings to javascript timestamps (ms since epoch)
 */
export const convertRawProject = (rawProject: AppTypes.RawProject) => {
  const project: AppTypes.Project = {
    ...rawProject,
    status: rawProject.status as AppTypes.Project['status'],
    created: moment(rawProject.created, 'MM/DD/YYYY').valueOf(),
    modified: (
      rawProject.modified && rawProject.modified.length ?
      moment(rawProject.modified, 'MM/DD/YYYY').valueOf() :
      undefined
    ),
  };
  return project;
};
