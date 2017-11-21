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

  out.w("<!doctype html><html class=\"no-js\" lang=\"\"><head><meta charset=\"utf-8\"><meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\"><title>NYC Concerts</title><meta name=\"description\" content=\"A LoFi list of upcoming NYC concerts, powered by JamBase\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-109770705-1\"></script><script>\n  \t\twindow.dataLayer = window.dataLayer || [];\n  \t\tfunction gtag(){dataLayer.push(arguments);}\n  \t\tgtag('js', new Date());\n\t\tgtag('config', 'UA-109770705-1');\n\t</script><script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script><script>\n  \t\t(adsbygoogle = window.adsbygoogle || []).push({\n    \tgoogle_ad_client: \"ca-pub-8472176423353956\",\n    \tenable_page_level_ads: true\n  \t\t});\n\t</script><link href=\"https://fonts.googleapis.com/css?family=Istok+Web:400,700\" rel=\"stylesheet\"><style>\nbody,html{font-family:'Istok Web','Verdana',sans-serif}a{color:black;text-decoration:none}.th{font-size:85%;box-sizing:border-box;word-wrap:break-word;display:table-cell;vertical-align:middle;width:25%;border:solid 1px #EFEFEF;page-break-before:auto;page-break-after:auto;page-break-inside:avoid}.date{width:7%}.city{width:15%}a:hover{color:#222;font-weight:700;letter-spacing:-.5px}.head{width:100%;text-align:center}.container{width:100%;max-width:980px;margin:auto;text-align:center;display:table}.container table,tr,td,th{text-align:left;border:solid 1px}@media screen and (min-width:1280px){.th{font-size:100%}.date{width:8%}}@media screen and (max-width:745px){.th{font-size:75%;width:25%}.city{width:22%}.date{width:16%}}\n\t</style></head><body>");

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
        "</span>");

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

  await_reorderer_tag({}, out, __component, "34");

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
