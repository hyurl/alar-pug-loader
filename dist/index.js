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
    load(filename) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }
        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");
        return this.cache[filename] = {
            render: pug.compile(tpl, Object.assign({}, this.options, { filename, cache: false }))
        };
    }
    unload(filename) {
        delete this.cache[filename];
    }
}
exports.PugLoader = PugLoader;
exports.default = PugLoader;
//# sourceMappingURL=index.js.map