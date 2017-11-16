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
    marko_forEachWithStatusVar = require("marko/src/runtime/helper-forEachWithStatusVar"),
    marko_escapeXmlAttr = marko_helpers.xa,
    init_components_tag = marko_loadTag(require("marko/src/components/taglib/init-components-tag")),
    await_reorderer_tag = marko_loadTag(require("marko/src/taglibs/async/await-reorderer-tag"));

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>NYC Concerts</title><meta name=\"description\" content=\"A Lo-Fi list of upcoming NYC concerts, powered by JamBase\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link href=\"https://fonts.googleapis.com/css?family=Istok+Web:400,700\" rel=\"stylesheet\"><style>\n    body, html{\n        font-family: 'Istok Web', 'Verdana', sans-serif;\n    }\n    a{\n    color: black;\n    text-decoration: none;\n    }\n    .th{\nfont-size: 85%;\n    box-sizing: border-box;\n    word-wrap: break-word;\n    display: table-cell;\n    vertical-align: middle;\n        width: 25%;\n        border: solid 1px #EFEFEF;\n            page-break-before: auto; /* 'always,' 'avoid,' 'left,' 'inherit,' or 'right' */\n    page-break-after: auto; /* 'always,' 'avoid,' 'left,' 'inherit,' or 'right' */\n    page-break-inside: avoid; \n\n    }\n    .date{\n    width: 7%;\n    }\n        .city{\n    width: 15%;\n    }\n\n    a:hover{\n    color: #222;\n    font-weight: 700;\n    letter-spacing: -.5px;\n    }\n        .head{\n            width: 100%;\n            text-align: center;\n        }\n        .container{\n            width: 100%;\n            max-width: 980px;\n            margin: auto;\n            text-align: center;\n            display: table;\n        }\n        .container table, tr, td, th{\n            text-align: left;\n            border: solid 1px;\n        }\n        @media screen and (min-width:1280px)\n        {\n         .th{\n         font-size: 100%;\n         }\n             .date{\n    width: 8%;\n    }\n\n\n        }\n\n                @media screen and (max-width:745px)\n        {\n    \n         .th {\n         font-size: 75%;\n         width: 25%;\n         }\n        .city\n        {\n        width: 22%;\n        }\n             .date {\n        width: 16%;\n        }\n        }\n\n    </style><script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script><script>\n  (adsbygoogle = window.adsbygoogle || []).push({\n    google_ad_client: \"ca-pub-8472176423353956\",\n    enable_page_level_ads: true\n  });\n</script></head><body>");

  component_globals_tag({}, out);

  out.w("<!--[if lte IE 9]>\n            <p class=\"browserupgrade\">You are using an <strong>outdated</strong> browser. Please <a href=\"https://browsehappy.com/\">upgrade your browser</a> to improve your experience and security.</p>\n        <![endif]--><div class=\"head\"><h1>NYC Concerts</h1></div><div class=\"container\"><div style=\"width:100%; overflow:auto; display:table\"><div class=\"th date\">Date</div><div class=\"th\">Artists</div><div class=\"th\">Venue</div><div class=\"th city\">City</div></div>");

  marko_forEach(input.events, function(event) {
    out.w("<div style=\"width:100%; overflow:auto; display: table;\"><div class=\"th date\">" +
      marko_escapeXml((new Date(event.Date)).toString("ddd MMM d")) +
      "</div><div class=\"th\"><a href=\"" +
      marko_escapeXmlAttr(event.TicketUrl) +
      "\">");

    marko_forEachWithStatusVar(event.Artists, function(Artist, __loop) {
      out.w("<span>" +
        marko_escapeXml(Artist.Name) +
        "&nbsp;</span>");

      if (!__loop.isLast()) {
        out.w(" and ");
      }
    });

    out.w("</a></div><div class=\"th\"><a href=\"" +
      marko_escapeXmlAttr(event.Venue.Url) +
      "\">" +
      marko_escapeXml(event.Venue.Name) +
      "</a></div><div class=\"th city\"><a href=\"https://www.google.com/maps/search/?api=1&amp;query=" +
      marko_escapeXmlAttr(encodeURIComponent((((((event.Venue.Name + " ") + event.Venue.Address) + " ") + event.Venue.City) + " ") + event.Venue.State)) +
      "\">" +
      marko_escapeXml(event.Venue.City) +
      ", " +
      marko_escapeXml(event.Venue.StateCode) +
      "</a></div></div>");
  });

  out.w("<h4 style=\"font-size: 50%; padding-top:10px\">powered by <b><a style=\"text-weight:700\" href=\"http://www.JamBase.com\">JamBase™</a></b></h4></div>");

  init_components_tag({}, out);

  await_reorderer_tag({}, out, __component, "32");

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
