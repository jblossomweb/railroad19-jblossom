import React from 'react';
import { Message } from 'semantic-ui-react';
import { delay } from 'core/promise';

import * as AppTypes from 'app/types';
import * as Style from './Notifications.style';

export interface Props {
  notifications: AppTypes.Notifications,
  removeNotification: (key: number) => void,
};

const Notifications: React.FC<Props> = ({
  notifications,
  removeNotification,
}) => (
  <Style.Wrapper>
    {notifications.map((
      notification: AppTypes.Notification,
      index: number,
    ) => {
      delay(1000).then(() => {
        removeNotification(index);
      });
      return (
        <Message
          floating
          transition={`opacity`}
          key={index}
          icon={notification.icon}
          size={`tiny`}
          content={notification.message}
          onDismiss={() => {
            removeNotification(index);
          }}
        />
      );
    })}
  </Style.Wrapper>
);

export default Notifications;
