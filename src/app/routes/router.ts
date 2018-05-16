/**
 * ルーティング
 */
import * as express from 'express';
import * as index from '../controllers/index/index.controller';
import * as authorize from '../controllers/authorize/authorize.controller';

export default (app: express.Application) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });

    app.post('/api/authorize/checkIn', authorize.checkIn);
    app.get('/', index.render);

    app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
        res.send(err.message);
    });
};
