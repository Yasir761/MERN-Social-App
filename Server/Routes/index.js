import { Router } from 'express';
import fs from 'fs';

const router = Router();

fs.readdirSync('./Routes').forEach((file) => {
  if (file !== 'index.js') {
    const route = `./${file}`;
    import(route).then((module) => {
      const routePath = file.replace('.js', '');
      router.use(`/${routePath}`, module.default);
    });
  }
});

export default router;
