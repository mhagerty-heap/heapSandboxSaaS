(function() {

    var listener = function() {
        var CSRemoveTool = function() {
          document.getElementById('CSShowCapture').outerHTML = "";
        };
        var divBox = function() {
            var CSShowCapture = document.createElement('div');
            CSShowCapture.id = 'CSShowCapture';
            CSShowCapture.className = 'CSShowCapture';
            document.body.appendChild(CSShowCapture);
        };
        divBox();
        var imageBox = function() {
            var CSImgBox = document.createElement('img');
            CSImgBox.className = 'CSSShowCaptureImg';
            CSImgBox.src = 'https://heap-sandbox-saas.vercel.app/assets/bookmarklets/csqlogo.png';
            document.querySelector('#CSShowCapture').appendChild(CSImgBox);
        }
        imageBox();
        var CSCloseButton = function() {
          var CSClose = document.createElement('div');
          CSClose.id = 'CSClose';
          document.querySelector('#CSShowCapture').appendChild(CSClose);
        };
        CSCloseButton();
        var addStyleSheet = function() {
            var head = document.head;
            var link = document.createElement('link');
            link.type = 'text/css';
            link.rel = 'stylesheet';
            link.href = 'https://heap-sandbox-saas.vercel.app/assets/bookmarklets/showCaptureAndErrorStyling.css';
            head.appendChild(link);
        }
        addStyleSheet();
        var createSubElements = function() {
            for (var i=0; i<7; i++) {
                var newElement = document.createElement('div');
                newElement.id = 'CSSubElement' + i;
                document.querySelector('#CSShowCapture').appendChild(newElement);
            }
        };
        createSubElements();
        var elementsArray = [];
        var addElementsToBox = function(a, b) {
            var newData;
            if (typeof(b.target) !== 'undefined') {
                newData = a + ' - ' + b.target;
            } else {
                newData = a + ' - x=' + b.x + ' , y=' + b.y;
            }
            elementsArray.push(newData);
            if (elementsArray.length > 6) {
                elementsArray.shift();
            }
            for (var i=0; i<7; i++) {
                var subID = 'CSSubElement' + i;
                if (typeof(elementsArray[i]) !== 'undefined') {
                    document.querySelector('#' + subID).innerHTML = elementsArray[i];
                    if (elementsArray[i].indexOf('hover') !== -1) {
                        document.querySelector('#' + subID).className ='CSHover';
                    } else if (elementsArray[i].indexOf('mouse') !== -1 || a.indexOf('click') !== -1)  {
                        document.querySelector('#' + subID).className = 'CSClick';
                    } else if (elementsArray[i].indexOf('focus') !== -1)  {
                        document.querySelector('#' + subID).className = 'CSFocus';
                    } else {
                        document.querySelector('#' + subID).className = 'CSScroll';
                    }
                }
            }
        };
        document.querySelector('#CSClose').addEventListener('click', function() {
          CSRemoveTool();
        });
        window.addEvent = function(a, b) {
            addElementsToBox(a, b);
        }, window.getElementPath = function(a) {
            if (1 != a.length) throw "Requires one element.";
            for (var b, c = a; c.length;) {
                var d = c[0],
                    e = d.localName;
                if (!e) break;
                e = e.toLowerCase();
                var f = d.getAttribute("id"),
                    c = c.parent(),
                    g = c.children(e);
                if (e += f && 1 == jQuery(document).find('[id="' + f + '"]').length ? "#" + f : ":eq(" + g.index(d) + ")", b = e + (b ? ">" + b : ""), f && 1 == jQuery(document).find('[id="' + f + '"]').length) break
            }
            return b
        }, window.addEvent = function(a, b) {
            addElementsToBox(a, b);
        }, window.getElementPath = function(a) {
            if (1 != a.length) throw "Requires one element.";
            for (var b, c = a; c.length;) {
                var d = c[0],
                    e = d.localName;
                if (!e) break;
                e = e.toLowerCase();
                var f = d.getAttribute("id"),
                    c = c.parent(),
                    g = c.children(e);
                if (e += f && 1 == jQuery(document).find('[id="' + f + '"]').length ? "#" + f : ":eq(" + g.index(d) + ")", b = e + (b ? ">" + b : ""), f && 1 == jQuery(document).find('[id="' + f + '"]').length) break
            }
            return b
        }, jQuery(document).bind("click", function(a) {
            a.preventDefault(), addEvent('click', {
                x: a.pageX,
                y: a.pageY,
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery(document).bind("scroll", function(a) {
            addEvent('scroll', {
                x: jQuery(document).scrollLeft(),
                y: jQuery(document).scrollTop()
            })
        }), jQuery(document).bind("mousedown", function(a) {
            addEvent('mouseDown', {
                x: a.pageX,
                y: a.pageY,
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery(document).bind("mouseup", function(a) {
            addEvent('mouseUp', {
                x: a.pageX,
                y: a.pageY,
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery("a").bind("mouseover", function(a) {
            addEvent('hoverStart', {
                x: a.pageX,
                y: a.pageY,
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery("a").bind("mouseout", function(a) {
            addEvent('hoverEnd', {
                x: a.pageX,
                y: a.pageY,
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery('input[type="text"], textarea').bind("keypress", function(a) {
            addEvent('keyPress', {
                target: getElementPath(jQuery(a.target)),
                value: jQuery(a.target).val()
            })
        }), jQuery('input[type="text"], textarea').bind("keyup", function(a) {
            addEvent('keyUp', {
                target: getElementPath(jQuery(a.target)),
                value: jQuery(a.target).val()
            })
        }), jQuery(":input, textarea").bind("change", function(a) {
            "password" != a.target.type && addEvent('change', {
                target: getElementPath(jQuery(a.target)),
                value: jQuery(a.target).val()
            })
        }), jQuery("input, select, textarea").bind("focus", function(a) {
            addEvent('focus', {
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery("input, select, textarea").bind("blur", function(a) {
            addEvent('blur', {
                target: getElementPath(jQuery(a.target))
            })
        }), jQuery("form").bind("submit", function(a) {
            addEvent('submit', {
                target: getElementPath(jQuery(a.target))
            })
        })
    };
    if (typeof(jQuery) === 'function') {
        listener()
    } else {
        var addjQuery = document.createElement('script');
        addjQuery.id = 'andrewsJQ';
        addjQuery.src = 'https://code.jquery.com/jquery-3.1.1.min.js';
        document.head.appendChild(addjQuery);
        var timer = window.setInterval(function() {
            if (typeof(jQuery) === 'function') {
                clearInterval(timer);
                listener();
            }
        }, 500);
        window.setTimeout(function() {
            clearInterval(timer)
        }, 5000)
    }
})();
