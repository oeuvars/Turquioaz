"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("uploadthing/express");
const f = (0, express_1.createUploadthing)();
exports.uploadRouter = {
    videoAndImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 4,
        },
        video: {
            maxFileSize: "16MB",
        },
    }).onUploadComplete((data) => {
        console.log("upload completed", data);
    }),
};
//# sourceMappingURL=uploadthing.js.map