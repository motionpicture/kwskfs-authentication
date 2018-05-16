"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index = require("../controllers/index/index.controller");
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.locals.NODE_ENV = process.env.NODE_ENV;
        next();
    });
    app.get('/', index.render);
    app.use((err, _req, res, _next) => {
        res.send(err.message);
    });
};
