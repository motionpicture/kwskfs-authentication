/**
 * authorize
 */
import * as debug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { AuthModel } from '../../models/auth/auth.model';
import { errorProsess } from '../base/base.controller';
import * as kwskfs from '@motionpicture/kwskfs-api-nodejs-client';
const log = debug('authentication:authorize');

export async function getCredentials(_req: Request, res: Response, _next: NextFunction) {
    log('getCredentials');
    // log((<Express.Session>req.session));
    const authModel = new AuthModel();
    const options = {
        endpoint: (<string>process.env.API_ENDPOINT),
        auth: authModel.create()
    };
    try {
        const accessToken = await options.auth.getAccessToken();
        const credentials = {
            accessToken: accessToken
        };
        res.json(credentials);
    } catch (err) {
        errorProsess(res, err);
    }
}

/**
 * checkIn
 */
export async function checkIn(req: Request, res: Response, _next: NextFunction) {
    log('checkIn');
    const ticketToken = req.body.ticketToken;
    log('ticketToken', ticketToken);

    const authModel = new AuthModel();
    const options = {
        endpoint: (<string>process.env.API_ENDPOINT),
        auth: authModel.create()
    };
    try {
        const ownershipInfoService = new kwskfs.service.OwnershipInfo(options);
        const checkInAction = await ownershipInfoService.checkInByTicketToken({
            goodType: kwskfs.factory.reservationType.EventReservation,
            ticketToken: ticketToken
        });
        log('checkInAction', checkInAction);
        const checkInActions = await ownershipInfoService.searchCheckInActions({
            goodType: kwskfs.factory.reservationType.EventReservation,
            ticketToken: ticketToken
        });
        log('checkInActions', checkInActions);
        res.json(checkInActions);
    } catch (err) {
        errorProsess(res, err);
    }
}