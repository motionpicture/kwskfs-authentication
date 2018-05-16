import * as kwskfs from '@motionpicture/kwskfs-api-nodejs-client';
// import * as uuid from 'uuid';

/**
 * 認証セッション
 * @interface IAuthSession
 */
export interface IAuthSession {
    /**
     * 状態
     */
    state: string;
    /**
     * スコープ
     */
    scopes: string[];
    /**
     * 資格情報
     */
    credentials: any;
    /**
     * コード検証
     */
    codeVerifier: string | null;
}

/**
 * 認証モデル
 * @class AuthModel
 */
export class AuthModel {
    /**
     * 状態
     */
    public state: string;
    /**
     * スコープ
     */
    public scopes: string[];
    /**
     * 資格情報
     */
    public credentials: any | null;
    /**
     * コード検証
     */
    public codeVerifier: string | null;

    /**
     * @constructor
     * @param {any} session
     */
    constructor(session?: any) {
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
    public create(): kwskfs.auth.ClientCredentials {
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
            domain: (<string>process.env.AUTHORIZE_SERVER_DOMAIN),
            clientId: (<string>process.env.CLIENT_ID),
            clientSecret: (<string>process.env.CLIENT_SECRET),
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
    public save(session: any): void {
        const authSession: IAuthSession = {
            state: this.state,
            scopes: this.scopes,
            credentials: this.credentials,
            codeVerifier: this.codeVerifier
        };
        session.auth = authSession;
    }
}
