"use strict";
/**
 * indexController
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const log = debug('authentication:index');
const path = `${__dirname}/../../../../data`;
/**
 * render
 */
function render(_req, res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        log('render');
        res.render('index');
    });
}
exports.render = render;
