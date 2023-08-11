module.exports = function attrigen(args) {
    const process = function (id) {
        const { map } = args;
        if (map) {
            for (const [key, value] of Object.entries(map)) {
                if (key == id) return value;
            }
        }
        return false;
    }

    const generate = function (element) {
        const attributeId = "data-test-id";
        const attributeName = "data-test-name";
        const elementChildren = element.children;
        var elementIndex = 1;
        for (const elementChild of elementChildren) {
            var valuePrefix = "";
            const parentAttributeIdValue = elementChild.parentElement.getAttribute(attributeId);
            if (parentAttributeIdValue) {
                valuePrefix = parentAttributeIdValue;
            }
            var attributeIdValue = valuePrefix + elementChild.localName.charAt(0) + elementIndex;
            elementChild.setAttribute(attributeId, attributeIdValue);
            var attributeNameValue = process(attributeIdValue);
            if (attributeNameValue) {
                elementChild.setAttribute(attributeName, attributeNameValue);
            }
            elementIndex++;
            generate(elementChild);
        }
    }

    const listen = function (element) {
        const observer = new MutationObserver(function (mutations, observer) {
            for (const mutation of mutations) {
                for (const addedNode of mutation.addedNodes) {
                    generate(addedNode.parentElement);
                }
            }
        });
        observer.observe(element, {
            childList: true,
            subtree: true,
        });
    }

    const execute = function (element) {
        generate(element);
        listen(element);
    }

    window.addEventListener('load', function (e) {
        execute(document.body);
    });
}