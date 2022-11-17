// Adds a click listener for events bubbling from the shadow DOM, captures some key information about that click, and sends it to Heap.
// https://community.heap.io/defining-events-and-properties-40/tracking-events-in-web-components-shadow-dom-262
(function() {
    // Set to the event you want to track
    var eventName = 'click',
        useCapture = true,
        trackOnlyShadowDom = true;

    var callback = function(event) {
        if ('composed' in event && typeof event.composedPath === 'function') {
            // Get the path of elements the event climbed through, e.g.
            // [span, div, div, section, body]
            var path = event.composedPath();

            // Fetch reference to the element that was actually clicked
            var targetElement = path[0];
            // Create the Heap-style hierarchy
            var hierarchy = getHierarchy(targetElement);
            // Check if the element is WITHIN the shadow DOM (ignoring the root)
            var shadowFound = path.length ? path.filter(function(i) {
                return !targetElement.shadowRoot && !!i.shadowRoot;
            }).length > 0 : false;

            // If only shadow DOM events should be tracked and the element is not within one, return
            if (trackOnlyShadowDom && !shadowFound) return;

            // Send to Heap
            // Any property from the event.target may be added e.g. targetElement.ariaLabel
            event_name = 'shadowdom_event_' + event.type;
            properties = {
                shadowHierarchy: hierarchy,
                shadowTargetText: targetElement.innerText || targetElement.textContent || null,
                shadowHref: targetElement.href || targetElement.action || null,
                inShadowDom: shadowFound
            };
            heap.track(event_name, properties);

        }
    };

    document.addEventListener(eventName, callback, useCapture);
})();


// Function which creates the Heap-style hierarchy.
function getHierarchy(target) {
    var tags = [];
    var classes, hierarchy, fullHierarchy, attributes, attributesBlacklist;
    while (target && target.tagName != 'BODY') {
        hierarchy = '@' + target.tagName.toLowerCase() + ';';

        if (target.id) {
            hierarchy += '#' + target.id + ';';
        }
        classes = Array.from(target.classList);

        if (classes.length > 0) {
            hierarchy += '.' + classes.join(';.') + ';';
        }

        attributesBlacklist = ["class", "id", "password", "style", "ng-", "react-id", "value"];

        attributes = target.getAttributeNames().filter(name => !attributesBlacklist.some(substring => name.includes(substring)));

        for (i = 0; i < attributes.length; i++) {
            hierarchy += '[' + attributes[i] + '="' + target.getAttribute(attributes[i]) + '"];';
        }

        tags.unshift(hierarchy);
        if (target.parentElement) {
            target = target.parentElement;
        } else {
            target = target.getRootNode().host;
        }
    }

    fullHierarchy = tags.join('|');

    if (fullHierarchy.length <= 1024) {
        return fullHierarchy;
    } else {
        return fullHierarchy.slice(-1024).split('|').slice(1).join('|')
    }
}
