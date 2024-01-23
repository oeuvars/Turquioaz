"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
function sendOTP() {
    const randomNum = Math.random() * 9000;
    return Math.floor(1000 + randomNum);
}
exports.sendOTP = sendOTP;
//# sourceMappingURL=sendOTP.js.map