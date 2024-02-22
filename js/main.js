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

    opener.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleContainerState(container, activeClass);
    });

    document.addEventListener('click', (e) => {
        const isClickInsideContainer = container.contains(e.target) || opener.contains(e.target);

        if (!isClickInsideContainer && container.classList.contains(activeClass)) {
            toggleContainerState(container, activeClass);
        }
    });
}

addToggleListeners('.js-mobile-menu-opener', '.js-mobile-menu-container', 'mobile-menu-active');

addToggleListeners('.js-toggle-opener', '.js-toggle-container', 'toggle-active');