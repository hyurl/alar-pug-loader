"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pug = require("pug");
class PugLoader {
    constructor(options = {}) {
        this.options = options;
        this.extesion = ".pug";
        this.cache = {};
    }
    load(path) {
        if (this.cache[path]) {
            return this.cache[path];
        }
        let filename = path + this.extesion;
        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");
        return this.cache[path] = {
            render: pug.compile(tpl, Object.assign({}, this.options, { filename, cache: false }))
        };
    }
    unload(path) {
        delete this.cache[path];
    }
}
exports.PugLoader = PugLoader;
exports.default = PugLoader;
//# sourceMappingURL=index.js.map