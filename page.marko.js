// Compiled using marko@4.5.6 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/nycconcerts$1.0.0/page.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_loadTag = marko_helpers.t,
    component_globals_tag = marko_loadTag(require("marko/src/components/taglib/component-globals-tag")),
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_escapeXmlAttr = marko_helpers.xa,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>NYC Concerts</title><meta name=\"description\" content=\"A Lo-Fi list of upcoming NYC concerts, powered by JamBase\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><style>\n    a{\n    color: black;\n    }\n    a:hover{\n    color: #222;\n    }\n        .head{\n            width: 100%;\n            text-align: center;\n        }\n        .container{\n            width: 100%;\n            max-width: 980px;\n            margin: auto;\n            text-align: center;\n        }\n        .container table, tr, td, th{\n            text-align: left;\n            border: solid 1px;\n        }\n    </style></head><body>");

  component_globals_tag({}, out);

  out.w("<!--[if lte IE 9]>\n            <p class=\"browserupgrade\">You are using an <strong>outdated</strong> browser. Please <a href=\"https://browsehappy.com/\">upgrade your browser</a> to improve your experience and security.</p>\n        <![endif]--><div class=\"head\"><h1>NYC Concerts</h1></div><div class=\"container\"><table><tr><th style=\"width:15%\">Date</th><th style=\"width:50%\">Artists</th><th style=\"width:20%\">Venue</th><th style=\"width:15%\">City</th> </tr>");

  marko_forEach(input.events, function(event) {
    out.w("<tr><td>" +
      marko_escapeXml((new Date(event.Date)).toString("ddd MMM d, yyyy")) +
      "</td><td><a href=\"" +
      marko_escapeXmlAttr(event.TicketUrl) +
      "\">");

    marko_forEach(event.Artists, function(Artist) {
      out.w("<span>" +
        marko_escapeXml(Artist.Name) +
        "&nbsp;</span>");
    });

    out.w("</a></td><td><a href=\"" +
      marko_escapeXmlAttr(event.Venue.Url) +
      "\">" +
      marko_escapeXml(event.Venue.Name) +
      "</a></td><td>" +
      marko_escapeXml(event.Venue.City) +
      ", " +
      marko_escapeXml(event.Venue.StateCode) +
      "</td></tr>");
  });

  out.w("</table><h4>powered by <a href=\"http://www.JamBase.com\">JamBase™</a></h4></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "28");

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
      "marko/src/components/taglib/init-components-tag",
      "marko/src/taglibs/async/await-reorderer-tag"
    ]
  };
