// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/src/html").t(__filename),
    marko_component = ({
    onCreate: function () {
        console.log(`Hi!`);
        this.state = {
            count: 0,
            events: []
        };
    },
    test: function () {
        this.state.count++;
    }
}),
    components_helpers = require("marko/src/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/nycconcerts$1.0.0/components/showtable/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/src/runtime/html/helpers"),
    marko_escapeXml = marko_helpers.x,
    marko_forEach = marko_helpers.f,
    marko_forEachWithStatusVar = require("marko/src/runtime/helper-forEachWithStatusVar"),
    marko_escapeXmlAttr = marko_helpers.xa;

function render(input, out, __component, component, state) {
  var data = input;

  out.w("<button on-click=\"test\">hi " +
    marko_escapeXml(state.count) +
    "</button>");

  marko_forEach(input.events, function(event) {
    out.w("<div style=\"width:100%; overflow:auto; display: table;\" class=\"listing\"><div class=\"th date dates\">" +
      marko_escapeXml((new Date(event.Date)).toString("ddd MMM d")) +
      "</div><div class=\"th artists\"><a href=\"" +
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

    out.w("</a></div><div class=\"th venue\"><a href=\"" +
      marko_escapeXmlAttr(event.Venue.Url) +
      "\">" +
      marko_escapeXml(event.Venue.Name) +
      "</a></div><div class=\"th city cities\"><a href=\"https://www.google.com/maps/search/?api=1&amp;query=" +
      marko_escapeXmlAttr(encodeURIComponent((((((event.Venue.Name + " ") + event.Venue.Address) + " ") + event.Venue.City) + " ") + event.Venue.State)) +
      "\">" +
      marko_escapeXml(event.Venue.City) +
      ", " +
      marko_escapeXml(event.Venue.StateCode) +
      "</a></div></div>");
  });
}

marko_template._ = marko_renderer(render, {
    ___type: marko_componentType
  }, marko_component);

marko_template.Component = marko_defineComponent(marko_component, marko_template._);

marko_template.meta = {
    deps: [
      {
          type: "require",
          path: "./"
        }
    ]
  };
