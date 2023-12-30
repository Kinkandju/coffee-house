'use strict';

//* Create HTML element
const createElement = (tag, name) => {
    const element = document.createElement(tag);
    element.className = name;

    return element;
}

//* Add HTML element
const addElement = (element, elementContainer) => {
    elementContainer.append(element);
}

//* Remove HTML Element
const removeElement = (element) => {
    element.remove();
}

export { createElement };
export { addElement };
export { removeElement };