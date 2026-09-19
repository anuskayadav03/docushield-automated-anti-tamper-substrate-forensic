document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("signupForm");

    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const lengthRequirement = document.getElementById("lengthRequirement");
    const uppercaseRequirement = document.getElementById("uppercaseRequirement");
    const lowercaseRequirement = document.getElementById("lowercaseRequirement");
    const specialRequirement = document.getElementById("specialRequirement");
    const spaceRequirement = document.getElementById("spaceRequirement");

    password.addEventListener("input", function () {

        const value = password.value;

        checkRequirement(lengthRequirement, value.length >= 8);
        checkRequirement(uppercaseRequirement, /[A-Z]/.test(value));
        checkRequirement(lowercaseRequirement, /[a-z]/.test(value));
        checkRequirement(specialRequirement, /[^A-Za-z0-9\s]/.test(value));
        checkRequirement(spaceRequirement, !/\s/.test(value));
    });

    function checkRequirement(element, passed) {

        const text = element.textContent.substring(2);

        if (passed) {
            element.textContent = "✓ " + text;
            element.classList.add("requirement-met");
        } else {
            element.textContent = "○ " + text;
            element.classList.remove("requirement-met");
        }
    }

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("signupEmail").value.trim();
        const passwordValue = password.value;
        const confirmPasswordValue = confirmPassword.value;

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        const validPassword =
            passwordValue.length >= 8 &&
            /[A-Z]/.test(passwordValue) &&
            /[a-z]/.test(passwordValue) &&
            /[^A-Za-z0-9\s]/.test(passwordValue) &&
            !/\s/.test(passwordValue);

        if (!validEmail) {
            alert("Please enter a valid official email address.");
            return;
        }

        if (!validPassword) {
            alert("Please meet all password requirements.");
            return;
        }

        if (passwordValue !== confirmPasswordValue) {
            alert("Passwords do not match.");
            return;
        }

        const button = form.querySelector("button");

        button.textContent = "Submitting...";
        button.disabled = true;

        setTimeout(function () {

            button.textContent = "Registration Request Submitted";

            alert(
                "Your registration request has been submitted successfully."
            );

            // Return the officer to the sign-in page after registration.
            window.location.href = "login.html";

        }, 1000);
    });

});
