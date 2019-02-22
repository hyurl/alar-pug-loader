# Alar-Pug-Loader

**Pug loader for [Alar](https://github.com/hyurl/alar) framework.**

When using this loader, pug files can be loaded as Alar modules and take
benefits of auto-loading and hot-reloading.

For information about **pug**, please visit 
[https://www.npmjs.com/package/pug](https://www.npmjs.com/package/pug).

## Example

```typescript
import { ModuleProxy } from "alar";
import { PugLoader } from "alar-pug-loader";

var view = new ModuleProxy("views", __dirname + "/views");

view.setLoader(new PugLoader());

// assume there is hello.pug file in views
// every pug module instance (PugLoader.View) has a render method and accepts an
// argument as data parsed to the template.
view.hello.instance().render({ /* data */ });
```

## API

### `new PugLoader(options?: PugLoader.Options)`

Interface `Options` includes:

- `encoding?: string` Specifies encoding for loading the template (default: 
    `utf8`).
- `compileDebug: boolean` If `true`, the function source will be included in the
    compiled template for better error messages (sometimes useful in development).
    It is enabled by default, unless used with Express in production mode.
- `debug: boolean` If `true`, the tokens and function body are logged to stdout.
- `filters: object` Hash table of 
    [custom filters](https://pugjs.org/language/filters.html#custom-filters). 
    Defaults to `undefined`.
- `globals: string[]` List of global names to make accessible in templates.