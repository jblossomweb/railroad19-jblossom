const rootPath = 'projects';

const paths = {
  projects: () => [rootPath, 'projects'],
  project: (key: number) => [rootPath, 'projects', String(key)],
  visibleColumns: () => [rootPath, 'visibleColumns'],
  appliedFilters: () => [rootPath, 'appliedFilters'],
};

export default paths;
