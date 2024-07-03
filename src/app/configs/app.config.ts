import { name, version, description } from '../../../package.json';

const { PORT, VERCEL_API } = process.env;

export default () => ({
  app: {
    name,
    port: parseInt(PORT, 10) || 3000,
    version,
    description,
    prefix: `/${name}`,
  },
  cors: {
    origin: true,
    credentials: true,
  },
  api: {
    vercel: VERCEL_API,
  },
});
