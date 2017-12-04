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
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  lasso_page_tag({
      dirname: __dirname,
      filename: __filename
    }, out);

  out.w("<!doctype html><html class=\"no-js\" lang=\"en-us\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"> <script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-109770705-2\"></script><script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n\n  gtag('config', 'UA-109770705-2');\n</script><title>" +
    marko_escapeXml(input.city) +
    " Showlist</title><meta name=\"description\" content=\"A LoFi list of upcoming " +
    marko_escapeXmlAttr(input.city) +
    " shows, powered by JamBase\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0\"><link href=\"https://fonts.googleapis.com/css?family=Nunito:400,700\" rel=\"stylesheet\"><style>\n            body,html{font-family:'Nunito','Proxima Nova Soft','Helvetica Neue',sans-serif}a{color:black;text-decoration:none}li{font-size:85%;box-sizing:border-box;word-wrap:break-word;display:table-cell;vertical-align:middle;width:25%;border:solid 1px #EFEFEF;page-break-before:auto;page-break-after:auto;page-break-inside:avoid}li{cursor:pointer}li:hover{color:#222;font-weight:700;letter-spacing:-.5px}.d{width:7%}.c{width:15%}.head{width:100%;text-align:center}.container{width:100%;max-width:980px;margin:auto;text-align:center;display:table}.container table,tr,td,th{text-align:left;border:solid 1px}@media screen and (min-width:1280px){li{font-size:100%}.d{width:8%}}@media screen and (max-width:745px){li{font-size:75%;width:25%}.c{width:22%}.d{width:16%}}\n            .thh{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ul{margin:0;padding:0;width:100%; overflow:auto; display: table}\n        </style>");

  lasso_head_tag({}, out, __component, "11");

  out.w("</head><body>");

  component_globals_tag({}, out);

  out.w("<div class=\"head\"><h1><span style=\"font-weight:700; letter-spacing:-2.5px\">" +
    marko_escapeXml(input.city) +
    "</span> Show List</h1><p style=\"font-size:80%; margin-top:-15px\">Upcoming shows in the greater " +
    marko_escapeXml(input.city) +
    " area.<br>Click Artists' names for tickets<br></p></div><div class=\"container\"><span style=\"font-size:75%\">Listing " +
    marko_escapeXml(input.numevents) +
    " Events</span><br>");

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
          }, out, __component, "23");
      }
    }, out, __component, "22");

  out.w("<h4 style=\"font-size: 65%; padding-top:10px\">powered by <b><a style=\"text-weight:700\" href=\"http://www.JamBase.com\" target=\"_blank\">JamBase™</a></b></h4><h4 style=\"font-size: 50%; padding-top:1px\"><b><a style=\"text-weight:700\" href=\"https://github.com/dan2600/New-York-Concerts\" target=\"_blank\">Source</a></b></h4></div>");

  lasso_body_tag({}, out, __component, "30");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "31");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    tags: [
      "lasso/taglib/config-tag",
      "lasso/taglib/head-tag",
      "marko/src/components/taglib/component-globals-tag",
      "./components/app-showtable",
      "marko/src/taglibs/async/await-tag",
      "lasso/taglib/body-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
