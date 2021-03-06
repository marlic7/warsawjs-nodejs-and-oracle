/*! Highlight JS Loader v6.3 | MIT Licensed (C) 2015 Ali.Dbg | http://goo.gl/IRlJuI */
;(function(doc, replace, innerHTML) {
    "use strict";
    doc.head.appendChild(doc.createElement("style"))[innerHTML] =
        ".hljs,.hljs *{border:0 none;direction:ltr;float:none;font-size:small;font-family:Consolas,Menlo,Liberation Mono;left:0;line-height:1.45;margin:0;outline:none;position:relative;top:0;vertical-align:top;word-wrap:normal}"+
        ".hljs{border-radius:.2em;margin:.5em auto;max-height:40em;white-space:pre}.hljs *{padding:0;display:inline}"+
        ".hjln{border-right:.1em solid;counter-reset:l;cursor:default;float:left;margin:0 1em 0 -1em;text-align:right;-moz-user-select:none;-webkit-user-select:none}"+
        ".hjln span{counter-increment:l;display:block;padding:0 .5em 0 1em}.hjln span:before{content:counter(l)}"+
        "pre{padding:0;margin:0;border:0;background:initial}";

    var setHighlightNumbers = function() {
        console.log('setHighlightNumbers');
        var code = doc.getElementsByTagName("code");
        for (var i = 0; i < code.length; i++) {
            var cod = code[i];
            if(!cod.querySelector('span.hjln')) {
                var lines = new Array(cod[innerHTML].split(/\n/).length + 1).join('<span></span>');
                cod[innerHTML] = '<span class="hjln">' + lines + '</span>' + cod[innerHTML];
            }
        }
    };

    //doc.addEventListener("DOMContentLoaded", function() {
        //console.log('DOMContentLoaded - hurra');

        setTimeout(setHighlightNumbers, 1000);
        setTimeout(setHighlightNumbers, 5000);
        setTimeout(setHighlightNumbers, 15000);
        setTimeout(setHighlightNumbers, 25000);

        //if (typeof jQuery != "undefined" && jQuery.fn.niceScroll) jQuery(".hljs").niceScroll()
    //});
})(document, "replace", "innerHTML");
