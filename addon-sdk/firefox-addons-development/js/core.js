// HTML5Slides (c) 2010 Paul Rouget
// Licensed under the terms of the MIT license.

Slides = (function(w){
        var idx = 0;
        w.addEventListener("load", function() {
            var sections = document.querySelectorAll("section");
            if (sections[0]) sections[0].classList.add("current");
            if (sections[1]) sections[1].classList.add("next");
        }, true);

        function activate(section) {
            var iframes = section.querySelectorAll("iframe");
            for (var i = 0, ii = iframes.length; i < ii; i++) {
              iframes[i].src = iframes[i].getAttribute("futuresrc");
            }
            if (section.hasAttribute("willdisplayslide")) {
            }
            if (section.hasAttribute("slidedisplayed")) {
            }
        }

        function desactive(section) {
            var iframes = section.querySelectorAll("iframe");
            for (var i = 0, ii = iframes.length; i < ii; i++) {
              iframes[i].src = "about:blank";
            }
            if (section.hasAttribute("willhideslide")) {
            }
            if (section.hasAttribute("slidehidden")) {
            }
        }

        function getActors() {
            var current = document.querySelector(".current");
            var previous = document.querySelector(".previous");
            var next = document.querySelector(".next");

            // Is there a faster way?
            var future;
            var past;

            if (next) {
                var sections = document.querySelectorAll("section");
                for (var i = 0, ii = sections.length - 1; i < ii; i++) {
                    if (sections[i] == next) {
                        future = sections[i + 1];
                        break;
                    }
                }
            }

            if (previous) {
                var sections = document.querySelectorAll("section");
                for (var i = 1, ii = sections.length; i < ii; i++) {
                    if (sections[i] == previous) {
                        past = sections[i - 1];
                        break;
                    }
                }
            }

            return {future: future,
                    next: next,
                    current: current,
                    previous: previous,
                    past: past}

        }

        function next() {
            var a = getActors();
            if (!a.next) return;
            activate(a.next);
            desactive(a.current);

            if (a.previous) {
                a.previous.classList.remove("previous");
            }
            if (a.current) {
                a.current.classList.remove("current");
                a.current.classList.add("previous");
            }
            if (a.next) {
                a.next.classList.remove("next");
                a.next.classList.add("current");
            }
            if (a.future) {
                a.future.classList.add("next");
            }
            idx++;
        }

        function prev() {
            var a = getActors();
            if (!a.previous) return;
            activate(a.previous);
            desactive(a.current);

            if (a.next) {
                a.next.classList.remove("next");
            }
            if (a.current) {
                a.current.classList.remove("current");
                a.current.classList.add("next");
            }
            if (a.previous) {
                a.previous.classList.remove("previous");
                a.previous.classList.add("current");
            }
            if (a.past) {
                a.past.classList.add("previous");
            }
            idx--;
        }

        function go(i) {
            if (i == idx) {
                return;
            }
            if (i == idx + 1) {
                next();
                return;
            }
            if (i == idx - 1) {
                prev();
                return;
            }
            var a = getActors();
            a.previous && a.previous.classList.remove("previous");
            a.next && a.next.classList.remove("next");
            a.current.classList.remove("current");

            var sections = document.querySelectorAll("section");
            if (!sections[i]) return;

            sections[i].classList.add("current");
            sections[i + 1] && sections[i + 1].classList.add("next");
            sections[i - 1] && sections[i - 1].classList.add("previous");
        }


        var me = function() {}
        me.next = next;
        me.prev = prev;
        me.go = go;
        return me;
})(this);


//
// KEY
//


var keynext = [39];
var keyprev = [37];
var disableKey = [33, 34, 38, 40];

window.addEventListener("keypress", function(e) {
    if (disableKey.indexOf(e.keyCode) != -1) {
      e.preventDefault();
    }
    if (keynext.indexOf(e.keyCode) != -1) {
      e.preventDefault();
      Slides.next();
    }
    if (keyprev.indexOf(e.keyCode) != -1) {
      e.preventDefault();
      Slides.prev();
    }
}, true);

// Workaround bug 576783
window.addEventListener("load", function() {
    var sections = document.querySelectorAll("section");

    for (var i = 0, ii = sections.length; i < ii; i++) {
        var section = sections[i];
        section.innerHTML = "<div class='bug576783'>" +
                            section.innerHTML +
                            "</div>";
    }
}, true);

//
// HISTORY HACK
//

/*

window.addEventListener("load", function() {
    var sections = document.querySelectorAll("section");

    var max = sections.length;
    var orgTitle = document.title;

    function title(i) {
        return orgTitle + " (" + i + "/" + (max - 1) + ")";
    }
    window.history.replaceState({idx: 0}, title(0), "#" + 0);
    window.onpopstate = function (event) {
        if (!event.state) return;
        var i = event.state.idx;
        window.history.replaceState({idx: i}, title(i), "#" + i);
    }
    for (var i = 0, ii = sections.length - 1; i < ii; i++) {
        window.history.pushState({idx: i + 1}, title(i + 1), "#" + (i + 1));
    }
    window.history.go(-1 * (max - 1));
    window.onpopstate = function (event) {
        var i = event.state.idx;
        Slides.go(i);
        document.title = title(i);
    }
}, true);

*/
