function createDOMElement(tagName, attributes = {}) {
    const elemento = document.createElement(tagName);
    Object.entries(attributes).forEach(
        ([property, value]) => (elemento[property] = value)
    );
    return elemento;
}

function appendElementsContainer(elementoPai, container, elementos) {
    elementoPai.appendChild(container);
    elementos.forEach(elemento => container.appendChild(elemento));
}

function appendElements(elementoPai, elementos) {
    elementos.forEach(elemento => elementoPai.appendChild(elemento));
    return elementoPai;
}
