import { Log } from 'ng2-logger/client';

const typeColors = {
  component: '#15bf19',
  service: '#0072FF',
  directive: '#f78000',
  pipe: '#f081f7',
  module: '#F62F2F',
  default: '#ccc'
};

export const logger = (name, type?) => {
  const log = Log.create(name);
  log.color = typeColors[type || 'default'];
  log.fixedWidth = 20;
  return log.data;
};
