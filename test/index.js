const assert = require("assert");
const alar = require("alar");
const { PugLoader } = require("..");

var view = new alar.ModuleProxy("views", __dirname);

view.setLoader(new PugLoader());

assert.strictEqual(view.hello.instance().render({ name: "Timothy" }), "<p>Timothy's Pug source code!</p>");

console.log("#### OK ####");