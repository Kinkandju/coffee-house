'use strict';

//* Adds class for the element
const addClass = (element, someClass) => {
    element.classList.add(someClass);
}

//* Removes the class from the element
const removeClass = (element, someClass) => {
    element.classList.remove(someClass);
}

//* Switches the class at the element
const toggleClass = (element, someClass) => {
    element.classList.toggle(someClass);
}

export { addClass };
export { removeClass };
export { toggleClass };