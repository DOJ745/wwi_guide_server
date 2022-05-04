let repPasswordToggle = document.getElementById("repeatPasswordField");
repPasswordToggle.onclick = function () {
    document.getElementById("repeatPasswordField").classList.add("input-password");
    document.getElementById("toggle-rep-password").classList.remove("d-none");

    const passwordInput = document.getElementById("repeatPasswordField");
    const togglePasswordButton = document.getElementById("toggle-rep-password");

    togglePasswordButton.addEventListener("click", togglePassword);

    function togglePassword() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordButton.setAttribute("aria-label", "Hide password.");
        } else {
            passwordInput.type = "password";
            togglePasswordButton.setAttribute(
                "aria-label",
                "Show password as plain text. " +
                "Warning: this will display your password on the screen."
            )
        }
    }
}