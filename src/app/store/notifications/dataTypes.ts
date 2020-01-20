import { List, Record } from 'immutable';
import * as AppTypes from 'app/types';

export type Notification = Record<AppTypes.Notification>;
export type Notifications = List<Notification>;
export const defaultNotifications: Notifications = List([]);
