import { SemanticICONS } from 'semantic-ui-react';

export const NOTIFICATIONS_ADD = 'NOTIFICATIONS_ADD';
export const NOTIFICATIONS_REMOVE = 'NOTIFICATIONS_REMOVE';

export interface Interface {

  [NOTIFICATIONS_ADD]: {
    type: 'NOTIFICATIONS_ADD',
    payload: {
      message: string,
      icon: SemanticICONS,
    },
  },

  [NOTIFICATIONS_REMOVE]: {
    type: 'NOTIFICATIONS_REMOVE',
    payload: {
      key: number,
    },
  },

};
