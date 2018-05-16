"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kwskfs = require("@motionpicture/kwskfs-api-nodejs-client");
/**
 * 認証モデル
 * @class AuthModel
 */
class AuthModel {
    /**
     * @constructor
     * @param {any} session
     */
    constructor(session) {
        if (session === undefined) {
            session = {};
        }
        this.state = (session.state !== undefined) ? session.state : null;
        this.scopes = (session.scopes !== undefined) ? session.scopes : [
        // `${(<string>process.env.RESOURCE_SERVER_URL)}/transactions`,
        // `${(<string>process.env.RESOURCE_SERVER_URL)}/events.read-only`,
        // `${(<string>process.env.RESOURCE_SERVER_URL)}/organizations.read-only`,
        // `${(<string>process.env.RESOURCE_SERVER_URL)}/orders.read-only`,
        // `${(<string>process.env.RESOURCE_SERVER_URL)}/places.read-only`
        ];
        this.credentials = (session.credentials !== undefined) ? session.credentials : null;
        this.codeVerifier = (session.codeVerifier !== undefined) ? session.codeVerifier : null;
    }
    /**
     * 認証クラス作成
     * @memberof AuthModel
     * @method create
     * @returns {kwskfs.auth.ClientCredentials}
     */
    create() {
        // const auth = new kwskfs.auth.OAuth2({
        //     domain: (<string>process.env.AUTHORIZE_SERVER_DOMAIN),
        //     clientId: (<string>process.env.CLIENT_ID_OAUTH2),
        //     clientSecret: (<string>process.env.CLIENT_SECRET_OAUTH2),
        //     redirectUri: (<string>process.env.AUTH_REDIRECT_URI),
        //     logoutUri: (<string>process.env.AUTH_LOGUOT_URI),
        //     state: this.state,
        //     scopes: this.scopes
        // });
        const auth = new kwskfs.auth.ClientCredentials({
            domain: process.env.AUTHORIZE_SERVER_DOMAIN,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            state: this.state,
            scopes: this.scopes
        });
        if (this.credentials !== null) {
            auth.setCredentials(this.credentials);
        }
        return auth;
    }
    /**
     * セッションへ保存
     * @memberof AuthModel
     * @method save
     * @returns {Object}
     */
    save(session) {
        const authSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
exports.AuthModel = AuthModel;
