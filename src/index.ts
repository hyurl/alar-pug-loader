import * as fs from "fs";
import * as pug from "pug";
import { ModuleLoader } from "alar";

export namespace PugLoader {
    export interface View {
        render(data: { [name: string]: any }): string;
    }

    export interface Options {
        /**
         * Specifies encoding for loading the template (default: `utf8`).
         */
        encoding?: string;
        /**
         * If `true`, the function source will be included in the compiled
         * template for better error messages (sometimes useful in development).
         * It is enabled by default, unless used with Express in production mode.
         */
        compileDebug?: boolean;
        /** If `true`, the tokens and function body are logged to stdout. */
        debug?: boolean;
        /**
         * Hash table of custom filters. Defaults to `undefined`.
         * @see https://pugjs.org/language/filters.html#custom-filters
         */
        filters?: object;
        /** List of global names to make accessible in templates. */
        globals?: string[];
    }
}

export class PugLoader implements ModuleLoader {
    extension = ".pug";
    cache: { [filename: string]: PugLoader.View } = {};

    constructor(private options: PugLoader.Options = {}) { }

    load(filename: string) {
        if (this.cache[filename]) {
            return this.cache[filename];
        }

        let tpl = fs.readFileSync(filename, this.options.encoding || "utf8");

        return this.cache[filename] = {
            render: pug.compile(tpl, {
                ...this.options,
                filename,
                cache: false,
            })
        };
    }

    unload(filename: string) {
        delete this.cache[filename];
    }
}

export default PugLoader;