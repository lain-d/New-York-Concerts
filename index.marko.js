// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/nycconcerts$1.0.0/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    lasso_page_tag = marko_loadTag(require("lasso/taglib/config-tag")),
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    lasso_head_tag = marko_loadTag(require("lasso/taglib/head-tag")),
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    app_showtable_template = marko_loadTemplate(require.resolve("./components/app-showtable")),
    app_showtable_tag = marko_loadTag(app_showtable_template),
    await_tag = marko_loadTag(require("marko/src/taglibs/async/await-tag")),
    lasso_body_tag = marko_loadTag(require("lasso/taglib/body-tag")),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  lasso_page_tag({
      dirname: __dirname,
      filename: __filename
    }, out);

  out.w("<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>" +
    marko_escapeXml(input.city) +
    " Showlist</title><meta name=\"description\" content=\"A LoFi list of upcoming " +
    marko_escapeXmlAttr(input.city) +
    " shows, powered by JamBase\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\">");

  lasso_head_tag({}, out, __component, "7");

  out.w("</head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"head\"><h1><span style=\"font-weight:900; letter-spacing:-2.5px\">" +
    marko_escapeXml(input.city) +
    "</span> Show List</h1><p style=\"font-size:80%; margin-top:-15px\">Upcoming shows in the greater " +
    marko_escapeXml(input.city) +
    " area.<br>Updated every day at noon<br>Click Artists' names for tickets<br></p></div><div class=\"container\">");

  var loadPromise = new Promise((resolve, reject) => {
   
          resolve({
              data: input.events
          });
  
  });

  await_tag({
      _dataProvider: loadPromise,
      _name: "loadPromise",
      renderBody: function renderBody(out, rp) {
        app_showtable_tag({
            events: rp.data
          }, out, __component, "18");
      }
    }, out, __component, "17");

  out.w("<h4 style=\"font-size: 65%; padding-top:10px\">powered by <b><a style=\"text-weight:700\" href=\"http://www.JamBase.com\">JamBase™</a></b></h4></div><script src=\"https://ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js\"></script><script>\n WebFont.load({\n    google: {\n      families: ['Nunito:400,700,900']\n    }\n  });\n</script>");

  lasso_body_tag({}, out, __component, "24");

  browser_refresh_tag({}, out, __component, "25");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "26");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "css",
          code: "body,\nhtml {\n    font-family: 'Nunito', 'Proxima Nova Soft','Helvetica Neue',sans-serif\n}\na {\n    color: black;\n    text-decoration: none\n}\n.th {\n    font-size: 85%;\n    box-sizing: border-box;\n    word-wrap: break-word;\n    display: table-cell;\n    vertical-align: middle;\n    width: 25%;\n    border: solid 1px #EFEFEF;\n    page-break-before: auto;\n    page-break-after: auto;\n    page-break-inside: avoid\n}\n.thh{\n    cursor: pointer;\n}\n.thh:hover{\n    font-weight: 900;\n}\n\n.date {\n    width: 7%\n}\n\n.city {\n    width: 15%\n}\n\na:hover {\n    color: #222;\n    font-weight: 700;\n    letter-spacing: -.5px\n}\n\n.head {\n    width: 100%;\n    text-align: center\n}\n\n.container {\n    width: 100%;\n    max-width: 980px;\n    margin: auto;\n    text-align: center;\n    display: table\n}\n\n.container table,\ntr,\ntd,\nth {\n    text-align: left;\n    border: solid 1px\n}\n\n@media screen and (min-width:1280px) {\n    .th {\n        font-size: 100%\n    }\n    .date {\n        width: 8%\n    }\n}\n\n@media screen and (max-width:745px) {\n    .th {\n        font-size: 75%;\n        width: 25%\n    }\n    .city {\n        width: 22%\n    }\n    .date {\n        width: 16%\n    }\n}",
          virtualPath: "./index.marko.css",
          path: "./index.marko"
        }
    ],
    tags: [
      "lasso/taglib/config-tag",
      "lasso/taglib/head-tag",
      "marko/src/components/taglib/component-globals-tag",
      "./components/app-showtable",
      "marko/src/taglibs/async/await-tag",
      "lasso/taglib/body-tag",
      "browser-refresh-taglib/refresh-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
