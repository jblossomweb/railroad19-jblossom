const rootPath = 'notifications';

const paths = {
  notifications: () => [rootPath],
  notification: (key: number) => [rootPath, key],
};

export default paths;
