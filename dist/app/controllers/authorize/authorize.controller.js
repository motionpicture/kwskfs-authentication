"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * authorize
 */
const debug = require("debug");
const auth_model_1 = require("../../models/auth/auth.model");
const base_controller_1 = require("../base/base.controller");
const kwskfs = require("@motionpicture/kwskfs-api-nodejs-client");
const log = debug('authentication:authorize');
function getCredentials(_req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        log('getCredentials');
        // log((<Express.Session>req.session));
        const authModel = new auth_model_1.AuthModel();
        const options = {
            endpoint: process.env.API_ENDPOINT,
            auth: authModel.create()
        };
        try {
            const accessToken = yield options.auth.getAccessToken();
            const credentials = {
                accessToken: accessToken
            };
            res.json(credentials);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.getCredentials = getCredentials;
/**
 * checkIn
 */
function checkIn(req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        log('checkIn');
        const ticketToken = req.body.ticketToken;
        log('ticketToken', ticketToken);
        const authModel = new auth_model_1.AuthModel();
        const options = {
            endpoint: process.env.API_ENDPOINT,
            auth: authModel.create()
        };
        try {
            const ownershipInfoService = new kwskfs.service.OwnershipInfo(options);
            const checkInAction = yield ownershipInfoService.checkInByTicketToken({
                goodType: kwskfs.factory.reservationType.EventReservation,
                ticketToken: ticketToken
            });
            log('checkInAction', checkInAction);
            const checkInActions = yield ownershipInfoService.searchCheckInActions({
                goodType: kwskfs.factory.reservationType.EventReservation,
                ticketToken: ticketToken
            });
            log('checkInActions', checkInActions);
            res.json(checkInActions);
        }
        catch (err) {
            base_controller_1.errorProsess(res, err);
        }
    });
}
exports.checkIn = checkIn;
