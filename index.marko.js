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
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_loadTemplate = require("marko/src/runtime/helper-loadTemplate"),
    showtable_template = marko_loadTemplate(require.resolve("./components/showtable")),
    showtable_tag = marko_loadTag(showtable_template),
    browser_refresh_tag = marko_loadTag(require("browser-refresh-taglib/refresh-tag")),
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>Showlist " +
    marko_escapeXml(input.city) +
    "</title><meta name=\"description\" content=\"A LoFi list of upcoming " +
    marko_escapeXmlAttr(input.city) +
    " shows, powered by JamBase\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link href=\"https://fonts.googleapis.com/css?family=Nunito:400,700,900\" rel=\"stylesheet\"> </head><body>");

  component_globals_tag({}, out);

  out.w("<!--[if lte IE 9]>\n            <p class=\"browserupgrade\">You are using an <strong>outdated</strong> browser. Please <a href=\"https://browsehappy.com/\">upgrade your browser</a> to improve your experience and security.</p>\n        <![endif]--><div class=\"head\"><h1><span style=\"font-weight:900; letter-spacing:-2.5px\">" +
    marko_escapeXml(input.city) +
    "</span> Show List</h1><p style=\"font-size:80%; margin-top:-15px\">Upcoming shows in the greater " +
    marko_escapeXml(input.city) +
    " area.<br>Updated every day at noon<br>Click Artists' name for tickets<br></p></div><div class=\"container\"><div style=\"width:100%; overflow:auto; display:table\"><div class=\"th date\">Date</div><div class=\"th\">Artists</div><div class=\"th\">Venue</div><div class=\"th city\">City</div></div>");

  showtable_tag({
      events: input.events
    }, out, __component, "22");

  out.w("<h4 style=\"font-size: 65%; padding-top:10px\">powered by <b><a style=\"text-weight:700\" href=\"http://www.JamBase.com\">JamBase™</a></b></h4></div>");

  browser_refresh_tag({}, out, __component, "26");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "27");

  out.w("</body></html>");
}

marko_template._ = marko_renderer(render, {
    ___implicit: true,
    ___type: marko_componentType
  });

marko_template.Component = marko_defineComponent({}, marko_template._);

marko_template.meta = {
    tags: [
      "marko/src/components/taglib/component-globals-tag",
      "./components/showtable",
      "browser-refresh-taglib/refresh-tag",
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
