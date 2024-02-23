'use strict';

//Form validation

function validateForm() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var emailError = document.getElementById('emailError');
    var passwordError = document.getElementById('passwordError');
    var validResponse = document.getElementById('validResponse');

    // Reset previous errors
    emailError.textContent = '';
    passwordError.textContent = '';
    validResponse.textContent = '';

    // Validate email length
    if (email.value.length < 8) {
        emailError.textContent = 'Email must be at least 8 characters.';
        return;
    }

    // Validate email format
    if (!email.checkValidity()) {
        emailError.textContent = 'Please enter a valid email address.';
        return;
    }

    // Validate password
    if (password.value.length < 8) {
      passwordError.textContent = 'Password must be at least 8 characters.';
      return;
    }

    // Form is valid
    validResponse.textContent = 'Form is valid! Submitting...';
}

//Toggle Listeners

function toggleContainerState(container, activeClass) {
    const isOpen = container.classList.contains(activeClass);

    if (isOpen) {
        container.classList.remove(activeClass);
    } else {
        container.classList.add(activeClass);
    }
}

function addToggleListeners(openerSelector, containerSelector, activeClass) {
    const opener = document.querySelector(openerSelector);
    const container = document.querySelector(containerSelector);
    const menuLinks = container.querySelectorAll('.header-profile-toggle-link');
    let currentIndex = 0; // Initialize the current index

    opener.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleContainerState(container, activeClass);
    });

    opener.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent the default action for 'Enter' and 'Space' key
            e.stopPropagation();
            toggleContainerState(container, activeClass);
        }
    });

    document.addEventListener('click', (e) => {
        const isClickInsideContainer = container.contains(e.target) || opener.contains(e.target);

        if (!isClickInsideContainer && container.classList.contains(activeClass)) {
            toggleContainerState(container, activeClass);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && container.classList.contains(activeClass)) {
            container.classList.remove(activeClass);
        }
    });

    // Add keyboard navigation inside the dropdown menu
    container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            e.stopPropagation();
            
            currentIndex = getCurrentIndex(currentIndex, menuLinks, e.key === 'ArrowUp');

            menuLinks[currentIndex].focus();
        }
    });

    const hasFocusedElement = (items, element) => {
        for(const item of items) {
            if(element === item) {return true;}
        } 
        return false;
    }

    const getCurrentIndex = (currentIndex, menuLinks, isUpPressed) => {
        const focusedElement = hasFocusedElement(menuLinks, document.activeElement);
        if(!focusedElement) {
            return currentIndex;
        }

        if (isUpPressed) {
            currentIndex = (currentIndex - 1 + menuLinks.length) % menuLinks.length;
        } else {
            currentIndex = (currentIndex + 1) % menuLinks.length;
        }
        return currentIndex;
    }
}

addToggleListeners('.js-mobile-menu-opener', '.js-mobile-menu-container', 'mobile-menu-active');

addToggleListeners('.js-toggle-opener', '.js-toggle-container', 'toggle-active');
