// ============================================================================
// DocuShield — Secure Officer Login
// Vanilla JavaScript only. No frameworks, no build step.
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {

  // --------------------------------------------------------------------
  // Element references
  // --------------------------------------------------------------------
  var form = document.getElementById("loginForm");

  var roleInput = document.getElementById("role");
  var organizationInput = document.getElementById("organization");
  var officerIdInput = document.getElementById("officerId");
  var passwordInput = document.getElementById("password");

  var roleError = document.getElementById("role-error");
  var organizationError = document.getElementById("organization-error");
  var officerIdError = document.getElementById("officerId-error");
  var passwordError = document.getElementById("password-error");
  var formError = document.getElementById("form-error");

  var togglePasswordBtn = document.getElementById("togglePassword");

  var submitButton = document.getElementById("submitButton");
  var submitLabel = document.getElementById("submitLabel");
  var submitSpinner = document.getElementById("submitSpinner");
  var statusMessage = document.getElementById("statusMessage");

  var isSubmitting = false;

  // --------------------------------------------------------------------
  // Show / hide password
  // --------------------------------------------------------------------
  togglePasswordBtn.addEventListener("click", function () {
    var isPasswordHidden = passwordInput.type === "password";

    // Toggle the input type between "password" and "text"
    passwordInput.type = isPasswordHidden ? "text" : "password";

    togglePasswordBtn.setAttribute("aria-pressed", String(isPasswordHidden));
    togglePasswordBtn.setAttribute(
      "aria-label",
      isPasswordHidden ? "Hide password" : "Show password"
    );
  });

  // --------------------------------------------------------------------
  // Helpers: show / clear individual field errors
  // --------------------------------------------------------------------
  function showFieldError(inputEl, errorEl, message) {
    inputEl.classList.add("field--invalid");
    inputEl.setAttribute("aria-invalid", "true");
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearFieldError(inputEl, errorEl) {
    inputEl.classList.remove("field--invalid");
    inputEl.removeAttribute("aria-invalid");
    errorEl.textContent = "";
    errorEl.hidden = true;
  }

  function clearAllErrors() {
    clearFieldError(roleInput, roleError);
    clearFieldError(organizationInput, organizationError);
    clearFieldError(officerIdInput, officerIdError);
    clearFieldError(passwordInput, passwordError);
    formError.hidden = true;
    formError.textContent = "";
  }

  // Clear a field's error the moment the officer starts correcting it
  roleInput.addEventListener("change", function () {
    clearFieldError(roleInput, roleError);
  });
  organizationInput.addEventListener("input", function () {
    clearFieldError(organizationInput, organizationError);
  });
  officerIdInput.addEventListener("input", function () {
    clearFieldError(officerIdInput, officerIdError);
  });
  passwordInput.addEventListener("input", function () {
    clearFieldError(passwordInput, passwordError);
  });

  // --------------------------------------------------------------------
  // Client-side validation
  // Returns true if the form is valid, false otherwise.
  // --------------------------------------------------------------------
  function validateForm() {
    var isValid = true;

    if (!roleInput.value) {
      showFieldError(roleInput, roleError, "Please select your role.");
      isValid = false;
    }

    if (!organizationInput.value.trim()) {
      showFieldError(
        organizationInput,
        organizationError,
        "Organization / Department is required."
      );
      isValid = false;
    }

    if (!officerIdInput.value.trim()) {
      showFieldError(officerIdInput, officerIdError, "Officer ID is required.");
      isValid = false;
    }

    if (!passwordInput.value) {
      showFieldError(passwordInput, passwordError, "Password is required.");
      isValid = false;
    }

    return isValid;
  }

  // --------------------------------------------------------------------
  // Button state helpers
  // --------------------------------------------------------------------
  function setButtonState(state) {
    // state: "idle" | "loading" | "success"
    if (state === "loading") {
      submitButton.disabled = true;
      submitLabel.textContent = "Verifying credentials...";
      submitSpinner.hidden = false;
    } else if (state === "success") {
      submitButton.disabled = true;
      submitButton.classList.add("is-success");
      submitLabel.textContent = "Identity verified";
      submitSpinner.hidden = true;
    } else {
      submitButton.disabled = false;
      submitButton.classList.remove("is-success");
      submitLabel.textContent = "Sign In Securely";
      submitSpinner.hidden = true;
    }
  }

  // --------------------------------------------------------------------
  // Mock authentication
  //
  // TODO: Replace this mock authentication with the real authentication API.
  // In production this should call a secure backend endpoint that verifies
  // the officer's role, organization, officer ID, and password, and returns
  // a session token. No credentials should ever be stored client-side.
  // --------------------------------------------------------------------
  function mockAuthenticate(credentials) {
    return new Promise(function (resolve) {
      var simulatedDelay = 800 + Math.random() * 400; // 800–1200ms

      setTimeout(function () {
        // For this prototype, any fully-filled-out form "succeeds".
        // No real credentials are checked, stored, or transmitted.
        var success = Boolean(
          credentials.role &&
          credentials.organization &&
          credentials.officerId &&
          credentials.password
        );
        resolve({ success: success });
      }, simulatedDelay);
    });
  }

  // --------------------------------------------------------------------
  // Form submission
  // --------------------------------------------------------------------
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Never perform a real page submit in this prototype

    if (isSubmitting) {
      return; // Prevent duplicate clicks while a request is in flight
    }

    clearAllErrors();

    var isValid = validateForm();
    if (!isValid) {
      statusMessage.textContent = "";
      // Move focus to the first invalid field for keyboard/screen-reader users
      var firstInvalid = form.querySelector(".field--invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return;
    }

    isSubmitting = true;
    setButtonState("loading");
    statusMessage.textContent = "";

    var credentials = {
      role: roleInput.value,
      organization: organizationInput.value.trim(),
      officerId: officerIdInput.value.trim(),
      password: passwordInput.value,
      trustDevice: document.getElementById("trustDevice").checked
    };

    mockAuthenticate(credentials).then(function (result) {
      isSubmitting = false;

      if (result.success) {
        setButtonState("success");
        statusMessage.textContent = "Identity verified. Redirecting to your workspace…";

        // Keep display details for this browser session; never store passwords.
        sessionStorage.setItem(
          "docuShieldOfficer",
          JSON.stringify({
          officerId: credentials.officerId,
            organization: credentials.organization,
            role: credentials.role
          })
        );

        // Open the authenticated officer workspace.
        setTimeout(function () {
          window.location.href = "dashboard.html";
        }, 900);
      } else {
        setButtonState("idle");
        formError.textContent =
          "Unable to verify your credentials. Check your details and try again.";
        formError.hidden = false;
      }
    });
  });

});
