/**
 * indexController
 */

import * as debug from 'debug';
import { Response, Request, NextFunction } from 'express';

const log = debug('authentication:index');

/**
 * render
 */
export async function render(_req: Request, res: Response, _next: NextFunction) {
    log('render');
    res.render('index');
}
