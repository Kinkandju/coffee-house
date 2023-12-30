'use strict';

import { addClass } from './assets/modules/changing_classes.js';
import { removeClass } from './assets/modules/changing_classes.js';
import { toggleClass } from './assets/modules/changing_classes.js';

const header = document.querySelector('.header');
const headerLink = header.querySelector('.header__link');

//* Checks URL page
const checkUrlPage = () => {
    if (window.location.pathname === '/menu.html') {
        addClass(headerLink, 'active');
        headerLink.href = '#';
        getDataProducts();
    } else {
        removeClass(headerLink, 'active');
        headerLink.href = 'menu.html';
    }
}

import { createElement } from './assets/modules/state_of_the_elements.js';
import { addElement } from './assets/modules/state_of_the_elements.js';
import { removeElement } from './assets/modules/state_of_the_elements.js';

const headerNavigation = header.querySelector('.navigation');
const container = createElement('div', 'header__container');

//* Add the container and transfers navigation elements to it
const addContainer = () => {
    addElement(container, header);
    addElement(headerNavigation, container);
    addElement(headerLink, container);
}

//* Removes the container
const removeContainer = () => {
    removeElement(container);
}

//* Shows navigation container
const showNavigationContainer = () => {
    addClass(container, 'show-navigation');
}

//* Hides navigation container
const hideNavigationContainer = () => {
    removeClass(container, 'show-navigation');
}

//* Shows navigation links
const showNavigationElements = () => {
    addClass(headerLink, 'show');
    addClass(headerNavigation, 'show');
}

//* Hides navigation links
const hideNavigationElements = () => {
    removeClass(headerLink, 'show');
    removeClass(headerNavigation, 'show');
}

const headerButton = header.querySelector('.header__button');

const toggleBurger = () => {
    headerButton.addEventListener('click', function() {
        toggleClass(headerButton, 'close');
        // toggleClass(document.body, 'lock');

        if (headerButton.classList.contains('close')) {
            showNavigationContainer();
            showNavigationElements();
        } else {
            hideNavigationContainer();
        }
    });
}

toggleBurger();

const headerLinks = header.querySelectorAll('.link');

//* Hides the burger menu when clicking on any link in the header
headerLinks.forEach((link => {
    link.addEventListener('click', function() {
        removeClass(headerButton, 'close');
        hideNavigationContainer();
    });
}))

const TABLET_WIDTH = 768;

//* Checks the width of the browser window
const checkWindowSizes = () => {
    const windowInnerWidth = window.innerWidth;

    if (windowInnerWidth <= TABLET_WIDTH) {
        addContainer();
    } else {
        header.append(headerNavigation);
        header.append(headerLink);
        showNavigationElements();
        removeContainer();
    }
}

const ITEM_COMPONENTS_NAMES = {
    li: 'list__item item',
    div_scale: 'item__scale',
    img: 'item__img',
    div_info: 'item__info',
    h3: 'item__title',
    p: 'item__text',
    span: 'item__price'
}

//* Removes the product catalog
const removeCatalog = (catalog) => {
    catalog.innerHTML = '';
}

const MENU_WIDTH = 1088;
const currentCategory = 'coffee';
const itemsPerLoad = 4;
let firstItemIndex = 0;

//* Creates a catalog with product items
const createCatalog = (data, category) => {
    const catalogContainer = document.querySelector('.menu__list');

    const windowInnerWidth = window.innerWidth;

    if (windowInnerWidth < MENU_WIDTH) {
        firstItemIndex = 0;
    } else {
        firstItemIndex = itemsPerLoad;
    }

    //* A new "filteredData" object is created, in which
    //* will be saved only those products that are filtered by category.
    let filteredData = [];

    if (category === currentCategory) {
        filteredData = data;
    } else {
        filteredData = data.filter(item => {
            return item.category === category;
        });
    }

    //* Adds markup for a specific product category
    filteredData.forEach((item, index) => {
        if (item.category === category) {
            const catalogItem = createElement('li', ITEM_COMPONENTS_NAMES.li);
            const scaleContainer = createElement('div', ITEM_COMPONENTS_NAMES.div_scale);
            const infoContainer = createElement('div', ITEM_COMPONENTS_NAMES.div_info);
            const imageItem =  createElement('img', ITEM_COMPONENTS_NAMES.img);
            imageItem.src = `assets/img/${item.category}-${index + 1}.jpg`;
            const titleItem = createElement('h3', ITEM_COMPONENTS_NAMES.h3);
            titleItem.textContent = `${item.name}`;
            const textItem = createElement('p', ITEM_COMPONENTS_NAMES.p);
            textItem.textContent = `${item.description}`;
            const priceItem = createElement('span', ITEM_COMPONENTS_NAMES.span);
            priceItem.textContent = `$${item.price}`;
    
            addElement(imageItem, scaleContainer);
            addElement(titleItem, infoContainer);
            addElement(textItem, infoContainer);
            addElement(priceItem, infoContainer);
            addElement(scaleContainer, catalogItem);
            addElement(infoContainer, catalogItem);
      
            catalogContainer.appendChild(catalogItem);

            //* Depending on the width of the browser window
            //* adds and removes 'hide' class to products items
            if (index >= itemsPerLoad && windowInnerWidth < MENU_WIDTH) {
                addClass(catalogItem, 'hide');
            } else {
                removeClass(catalogItem, 'hide');
            }
        }
    });

    //* Changes the display of the number of product items 
    //* with a smooth change in the size of the browser window
    const updateCatalogOnResize = () => {
        const windowInnerWidth = window.innerWidth;

        if (windowInnerWidth < MENU_WIDTH) {
            firstItemIndex = 0;
        } else {
            firstItemIndex = itemsPerLoad;
        }

        removeCatalog(catalogContainer);
        createCatalog(data, category);
    };

    window.addEventListener('resize', updateCatalogOnResize);

    //* For the buttons added event listeners
    //* for product category selection
    const menuContainer = document.querySelector('.menu__container');
    const buttonsMenu = menuContainer.querySelectorAll('.menu__button');

    buttonsMenu.forEach(button => {
        const selectedCategory = button.dataset.category;
        addClass(button, 'active');

        if (category !== selectedCategory) {
            removeClass(button, 'active');
        }

        button.addEventListener('click', (evt) => {
            if (category !== selectedCategory) {
                removeCatalog(catalogContainer);
            }

            addClass(evt.target, 'active');
            createCatalog(data, selectedCategory);
        });
    });

    //* Adds logic for displaying additional items
    //* when clicking on the button refresh
    const menu = document.querySelector('.menu');
    const buttonRefresh = menu.querySelector('.menu__button--refresh');

    if (filteredData.length <= firstItemIndex + itemsPerLoad) {
        buttonRefresh.style.display = 'none';
    } else {
        buttonRefresh.style.display = 'block';
    }

    buttonRefresh.addEventListener('click', () => {
        const hiddenItems = catalogContainer.querySelectorAll('.hide');
    
        for (let i = firstItemIndex; i < firstItemIndex + itemsPerLoad; i += 1) {
            if (hiddenItems[i]) {
                removeClass(hiddenItems[i], 'hide');
            }
        }
    
        firstItemIndex += itemsPerLoad;
    
        if (firstItemIndex >= hiddenItems.length) {
            buttonRefresh.style.display = 'none';
        }
    });
    
}

//* Get products data from json file
async function getDataProducts() {
    const urlProducts = 'assets/json/products.json';

    return fetch(urlProducts)
    .then(response => response.json())
    .then(data => {
        createCatalog(data, currentCategory);
      })
    .catch(err => {
        console.error('Dear me, an error has occurred!:', err);
    });
}

//* The logic that works out when the page loads
window.onload = () => {
    checkUrlPage();
    checkWindowSizes();
}

//* The logic that works out when changing the size of the page width
window.onresize = () => {
    checkWindowSizes();
}
