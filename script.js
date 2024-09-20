// Firebase configuration (replace with your own Firebase project config)
import {
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
  MEASUREMENTID,
} from "@env";

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document
  .getElementById("reset-password-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessageElement = document.getElementById("error-message");

    // Basic validation
    if (newPassword !== confirmPassword) {
      errorMessageElement.textContent = "Passwords do not match!";
      return;
    }

    // Example of custom password validation
    if (!validatePassword(newPassword)) {
      errorMessageElement.textContent =
        "Password must be 8 characters long, contain an uppercase letter, lowercase letter, number, and special character!";
      return;
    }

    // Firebase password reset logic
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode"); // Get oobCode from URL

    firebase
      .auth()
      .confirmPasswordReset(oobCode, newPassword)
      .then(() => {
        alert("Password reset successfully!");
        window.location.href = "/login"; // Redirect to login or another page
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        errorMessageElement.textContent = error.message;
      });
  });

// Function to validate password complexity
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
}
