// Compiled using marko@4.6.0 - DO NOT EDIT
"use strict";

var marko_template = module.exports = require("marko/dist/html").t(__filename),
    marko_component = ({
    onCreate: function () {
        this.state = {
            sortStyle: 'date',
            reverse: false
        };
    },
    reSort: function (sort) {
        if (this.state.sortStyle === sort && this.state.reverse === false) {
            this.state.reverse = true;
        } else {
            this.state.reverse = false;
        }
        this.state.sortStyle = sort;
    }
}),
    components_helpers = require("marko/dist/components/helpers"),
    marko_registerComponent = components_helpers.rc,
    marko_componentType = marko_registerComponent("/nycconcerts$1.0.0/components/app-showtable/index.marko", function() {
      return module.exports;
    }),
    marko_renderer = components_helpers.r,
    marko_defineComponent = components_helpers.c,
    marko_helpers = require("marko/dist/runtime/html/helpers"),
    marko_attr = marko_helpers.a,
    marko_forEach = marko_helpers.f,
    marko_escapeXml = marko_helpers.x,
    marko_forEachWithStatusVar = require("marko/dist/runtime/helper-forEachWithStatusVar"),
    marko_escapeXmlAttr = marko_helpers.xa;

function render(input, out, __component, component, state) {
  var data = input;

  var events = [];

  out.w("<div style=\"width:100%; overflow:auto; display:table\"><div class=\"th thh date\"" +
    marko_attr("data-marko", {
      onclick: __component.d("reSort", [
          "date"
        ])
    }, false) +
    ">Date</div><div class=\"th thh arts\"" +
    marko_attr("data-marko", {
      onclick: __component.d("reSort", [
          "artist"
        ])
    }, false) +
    ">Artists</div><div class=\"th thh venues\"" +
    marko_attr("data-marko", {
      onclick: __component.d("reSort", [
          "venue"
        ])
    }, false) +
    ">Venue</div><div class=\"th thh city\"" +
    marko_attr("data-marko", {
      onclick: __component.d("reSort", [
          "city"
        ])
    }, false) +
    ">City</div></div>");

  if (state.sortStyle === "date") {
    events = input.events.sort(function(a,b) {return (new Date(a.Date) > new Date(b.Date)) ? 1 : ((new Date(b.Date) > new Date(a.Date)) ? -1 : 0);} );
  } else if (state.sortStyle === "venue") {
    events = input.events.sort(function(a,b) {return (a.Venue.Name > b.Venue.Name) ? 1 : ((b.Venue.Name > a.Venue.Name) ? -1 : 0);} );
  } else if (state.sortStyle === "artist") {
    events = input.events.sort(function(a,b) {return (a.Artists[0].Name > b.Artists[0].Name) ? 1 : ((b.Artists[0].Name > a.Artists[0].Name) ? -1 : 0);} );
  } else if (state.sortStyle === "city") {
    events = input.events.sort(function(a,b) {return (a.Venue.City > b.Venue.City) ? 1 : ((b.Venue.City > a.Venue.City) ? -1 : 0);} );
  }

  if (state.reverse === true) {
    events = events.reverse();
  }

  marko_forEach(events, function(event) {
    out.w("<div style=\"width:100%; overflow:auto; display: table;\" class=\"listing\"><div class=\"th date dates\">" +
      marko_escapeXml((new Date(event.Date)).toDateString().split((new Date()).getFullYear())[0]) +
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
    _l_: marko_componentType
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
