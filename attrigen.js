module.exports = function attrigen() {
    const generate = function (element) {
        const attributeName = "data-test-id";
        const elementChildren = element.children;
        var elementIndex = 1;
        for (const elementChild of elementChildren) {
            var valuePrefix = "";
            const parentAttributeValue = elementChild.parentElement.getAttribute(attributeName);
            if (parentAttributeValue) {
                valuePrefix = parentAttributeValue;
            }
            var attributeValue = valuePrefix + elementChild.localName.charAt(0) + elementIndex;
            elementChild.setAttribute(attributeName, attributeValue);
            elementIndex++;
            generate(elementChild);
        }
    }
    window.addEventListener('load', function () {
        const element = document.body;
        generate(element);
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
    });
}