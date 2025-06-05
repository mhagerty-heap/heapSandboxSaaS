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
            CSImgBox.src = 'https://demo.pre-sales.fr/wp-content/uploads/2025/06/csqlogo.png';
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
            link.href = 'https://demo.pre-sales.fr/wp-content/uploads/custom-css-js/32734.css';
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
        var addElementsToBox = function(type, value) {
            var newData;
            if (typeof(value) !== 'undefined') {
                newData = type + ' - ' + value;
            }
            elementsArray.push(newData);
            if (elementsArray.length > 6) {
                elementsArray.shift();
            }
            for (var i=0; i<7; i++) {
                var subID = 'CSSubElement' + i;
                if (typeof(elementsArray[i]) !== 'undefined') {
                    document.querySelector('#' + subID).innerHTML = elementsArray[i];
                    if (elementsArray[i].indexOf('JS') !== -1) {
                        document.querySelector('#' + subID).className ='CSHover';
                    } else if (elementsArray[i].indexOf('API') !== -1)  {
                        document.querySelector('#' + subID).className = 'CSClick';
                    } else if (elementsArray[i].indexOf('Text') !== -1)  {
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

        /* Listen to JS Errors */
        window.addEventListener('error', function(e) {
            var type = "JS Error";
            if (e && e.error && e.error.message) {
                var value = e.error.message;
            } else {
                var value = e.message;
            }
            addElementsToBox(type, value);
        });

        /* setup JS error to trigger */
        document.body.addEventListener('click', function() {console.log(window.test.notHere)});

        /* Listen to API Errors */

        (function() {
            var origOpen = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function() {
                this.addEventListener('load', function() {
                    if (this.status.toString().indexOf('20') === -1) {
                        var type = "API Error";
                        var value = this.status + ' - ' + this.statusText + ' - ' + this.responseURL;
                        addElementsToBox(type, value);
                    }
                });
                origOpen.apply(this, arguments);
            };
        })();

        /* Listen for CWV Metrics */

        function csCWV(e) {
if (e.name === 'TTFB') {
var roundedTTFB = Math.round(e.value);
var TTFBStatus;
if (roundedTTFB > 600) {
TTFBStatus = 'POOR';
} else if (roundedTTFB > 200 && roundedTTFB <= 600) {
TTFBStatus = 'NEEDS IMPROVEMENT';
} else {
TTFBStatus = 'GOOD';
}
addElementsToBox('CWV:TTFB:', TTFBStatus + ':' + roundedTTFB);
}

if (e.name === 'LCP') {
var roundedLCP = Math.round(e.value);
var LCPStatus;
if (roundedLCP > 4000) {
LCPStatus = 'POOR';
} else if (roundedLCP > 2500 && roundedLCP <= 4000) {
LCPStatus = 'NEEDS IMPROVEMENT';
} else {
LCPStatus = 'GOOD';
}
addElementsToBox('CWV:LCP:', LCPStatus + ':' + roundedLCP);
}

if (e.name === 'FID') {
var roundedFID = Math.round(e.value);
var FIDStatus;
if (roundedFID > 300) {
FIDStatus = 'POOR';
} else if (roundedFID > 100 && roundedFID <= 300) {
FIDStatus = 'NEEDS IMPROVEMENT';
} else {
FIDStatus = 'GOOD';
}
addElementsToBox('CWV:FID:', FIDStatus + ':' + roundedFID);
}

if (e.name === 'CLS') {
var roundedCLS = Math.round(e.value);
var CLSStatus;
if (roundedCLS > 250) {
CLSStatus = 'POOR';
} else if (roundedCLS > 100 && roundedCLS <= 250) {
CLSStatus = 'NEEDS IMPROVEMENT';
} else {
CLSStatus = 'GOOD';
}
addElementsToBox('CWV:CLS:', CLSStatus + ':' + roundedCLS);

}

if (e.name === 'FCP') {
var roundedFCP = Math.round(e.value);
var FCPStatus;
if (roundedFCP > 3000) {
FCPStatus = 'POOR';
} else if (roundedFCP > 1800 && roundedFCP <= 3000) {
FCPStatus = 'NEEDS IMPROVEMENT';
} else {
FCPStatus = 'GOOD';
}
addElementsToBox('CWV:FCP:', FCPStatus + ':' + roundedFCP);
}

};

        /* Add Web Vitals Script */

        !function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).webVitals={})}(this,(function(e){"use strict";var t,n,i,r,a=function(e,t){return{name:e,value:void 0===t?-1:t,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},o=function(e,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){if("first-input"===e&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(e){return e.getEntries().map(t)}));return n.observe({type:e,buffered:!0}),n}}catch(e){}},u=function(e,t){var n=function n(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(e(i),t&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},c=function(e){addEventListener("pageshow",(function(t){t.persisted&&e(t)}),!0)},f=function(e,t,n){var i;return function(r){t.value>=0&&(r||n)&&(t.delta=t.value-(i||0),(t.delta||void 0===i)&&(i=t.value,e(t)))}},s=-1,m=function(){return"hidden"===document.visibilityState?0:1/0},d=function(){u((function(e){var t=e.timeStamp;s=t}),!0)},v=function(){return s<0&&(s=m(),d(),c((function(){setTimeout((function(){s=m(),d()}),0)}))),{get firstHiddenTime(){return s}}},p=function(e,t){var n,i=v(),r=a("FCP"),u=function(e){"first-contentful-paint"===e.name&&(m&&m.disconnect(),e.startTime<i.firstHiddenTime&&(r.value=e.startTime,r.entries.push(e),n(!0)))},s=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],m=s?null:o("paint",u);(s||m)&&(n=f(e,r,t),s&&u(s),c((function(i){r=a("FCP"),n=f(e,r,t),requestAnimationFrame((function(){requestAnimationFrame((function(){r.value=performance.now()-i.timeStamp,n(!0)}))}))})))},l=!1,g=-1,y={passive:!0,capture:!0},T=new Date,h=function(e,r){t||(t=r,n=e,i=new Date,S(removeEventListener),E())},E=function(){if(n>=0&&n<i-T){var e={entryType:"first-input",name:t.type,target:t.target,cancelable:t.cancelable,startTime:t.timeStamp,processingStart:t.timeStamp+n};r.forEach((function(t){t(e)})),r=[]}},L=function(e){if(e.cancelable){var t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,t){var n=function(){h(e,t),r()},i=function(){r()},r=function(){removeEventListener("pointerup",n,y),removeEventListener("pointercancel",i,y)};addEventListener("pointerup",n,y),addEventListener("pointercancel",i,y)}(t,e):h(t,e)}},S=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(t){return e(t,L,y)}))},w={};e.getCLS=function(e,t){l||(p((function(e){g=e.value})),l=!0);var n,i=function(t){g>-1&&e(t)},r=a("CLS",0),s=0,m=[],d=function(e){if(!e.hadRecentInput){var t=m[0],i=m[m.length-1];s&&e.startTime-i.startTime<1e3&&e.startTime-t.startTime<5e3?(s+=e.value,m.push(e)):(s=e.value,m=[e]),s>r.value&&(r.value=s,r.entries=m,n())}},v=o("layout-shift",d);v&&(n=f(i,r,t),u((function(){v.takeRecords().map(d),n(!0)})),c((function(){s=0,g=-1,r=a("CLS",0),n=f(i,r,t)})))},e.getFCP=p,e.getFID=function(e,i){var s,m=v(),d=a("FID"),p=function(e){e.startTime<m.firstHiddenTime&&(d.value=e.processingStart-e.startTime,d.entries.push(e),s(!0))},l=o("first-input",p);s=f(e,d,i),l&&u((function(){l.takeRecords().map(p),l.disconnect()}),!0),l&&c((function(){var o;d=a("FID"),s=f(e,d,i),r=[],n=-1,t=null,S(addEventListener),o=p,r.push(o),E()}))},e.getLCP=function(e,t){var n,i=v(),r=a("LCP"),s=function(e){var t=e.startTime;t<i.firstHiddenTime&&(r.value=t,r.entries.push(e),n())},m=o("largest-contentful-paint",s);if(m){n=f(e,r,t);var d=function(){w[r.id]||(m.takeRecords().map(s),m.disconnect(),w[r.id]=!0,n(!0))};["keydown","click"].forEach((function(e){addEventListener(e,d,{once:!0,capture:!0})})),u(d,!0),c((function(i){r=a("LCP"),n=f(e,r,t),requestAnimationFrame((function(){requestAnimationFrame((function(){r.value=performance.now()-i.timeStamp,w[r.id]=!0,n(!0)}))}))}))}},e.getTTFB=function(e){var t,n=a("TTFB");t=function(){try{var t=performance.getEntriesByType("navigation")[0]||function(){var e=performance.timing,t={entryType:"navigation",startTime:0};for(var n in e)"navigationStart"!==n&&"toJSON"!==n&&(t[n]=Math.max(e[n]-e.navigationStart,0));return t}();if(n.value=n.delta=t.responseStart,n.value<0||n.value>performance.now())return;n.entries=[t],e(n)}catch(e){}},"complete"===document.readyState?setTimeout(t,0):addEventListener("load",(function(){return setTimeout(t,0)}))},Object.defineProperty(e,"__esModule",{value:!0})}));

        webVitals.getTTFB(csCWV);
        webVitals.getFCP(csCWV);
        webVitals.getLCP(csCWV);
        webVitals.getCLS(csCWV);
        webVitals.getFID(csCWV);


        /* check for visible text */

        var foundText=[];

        function isVisible(elem) {
            if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
            const style = getComputedStyle(elem);
            if (elem.parentElement && elem.parentElement.id) {
                if (elem.parentElement.id === 'CSShowCapture') {
                    return false;
                }
            }
            if (style.display === 'none') return false;
            if (style.visibility !== 'visible') return false;
            if (style.opacity < 0.1) return false;
            if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height +
        elem.getBoundingClientRect().width === 0) {
                return false;
            }
            const elemCenter   = {
                x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
                y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
            };
            if (elemCenter.x < 0) return false;
            if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
            if (elemCenter.y < 0) return false;
            if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
            let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
            do {
                if (pointContainer === elem) return true;
            } while (pointContainer = pointContainer.parentNode);
            return false;
        }

        function searchStringInArray (str, strArray) {
            for (var j=0; j<strArray.length; j++) {
                if (strArray[j].match(str)) return j;
            }
            return -1;
        };

        function checkForChildNodes(elem) {
                if (elem.childNodes && elem.childNodes.length > 0) {
                    var el = elem,
                    child = el.firstChild,
                    texts = [];

                    while (child) {
                        if (child.nodeType == 3) {
                            texts.push(child.data);
                        }
                        child = child.nextSibling;
                    }

                    var text = texts.join("");
                    if (text !== "") {
                        if (searchStringInArray(text, foundText) === -1) {
                            foundText.push(text);
                            return text;
                        }
                    }

                } else {
                    var text = elem.innerText;
                    if (searchStringInArray(text, foundText) === -1) {
                        foundText.push(text);
                        return text;
                    }
                }
            return false;
        };

        function checkForTextElements() {
            var textDivs = document.querySelectorAll('div');
            for (var i=0; i<textDivs.length; i++) {
                if (textDivs[i].innerText) {
                    if (isVisible(textDivs[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(textDivs[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var textps = document.querySelectorAll('p');
            for (var i=0; i<textps.length; i++) {
                if (textps[i].innerText) {
                    if (isVisible(textps[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(textps[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var texth1 = document.querySelectorAll('h1');
            for (var i=0; i<texth1.length; i++) {
                if (texth1[i].innerText) {
                    if (isVisible(textps[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(texth1[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var texth2 = document.querySelectorAll('h2');
            for (var i=0; i<texth2.length; i++) {
                if (texth2[i].innerText) {
                    if (isVisible(texth2[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(texth2[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var texth3 = document.querySelectorAll('h3');
            for (var i=0; i<texth3.length; i++) {
                if (texth3[i].innerText) {
                    if (isVisible(texth3[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(texth3[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var textspan = document.querySelectorAll('span');
            for (var i=0; i<textspan.length; i++) {
                if (textspan[i].innerText) {
                    if (isVisible(textspan[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(textspan[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var texta = document.querySelectorAll('a');
            for (var i=0; i<texta.length; i++) {
                if (texta[i].innerText) {
                    if (isVisible(texta[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(texta[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }

            var textli = document.querySelectorAll('li');
            for (var i=0; i<textli.length; i++) {
                if (textli[i].innerText) {
                    if (isVisible(textli[i])) {
                        var type = "Text Visible";
                        var value = checkForChildNodes(textli[i]);
                        if (value != false) {
                            addElementsToBox(type, value);
                        }
                    }
                }
            }
        };

        var cnt = 0;
        const msg = document.getElementById('msg');

        window.addEventListener("scroll", () => {
            handleScroll();
        });

        const handleScroll = debounce(() => {
            checkForTextElements();
        },500);

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };

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
