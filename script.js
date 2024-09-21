// Firebase configuration (replace with your own Firebase project config)
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Password validation function
function validatePassword(password) {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (password.length < minLength) {
    return "Password must be at least 8 characters long";
  }
  if (!hasUpperCase) {
    return "Password must contain at least one uppercase letter";
  }
  if (!hasLowerCase) {
    return "Password must contain at least one lowercase letter";
  }
  if (!hasNumbers) {
    return "Password must contain at least one number";
  }
  if (!hasSpecialChars) {
    return "Password must contain at least one special character";
  }
  return null; // Password is valid
}

document
  .getElementById("reset-password-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const errorMessageElement = document.getElementById("error-message");

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      errorMessageElement.textContent = "Passwords do not match!";
      return;
    }

    // Validate password rules
    const validationError = validatePassword(newPassword);
    if (validationError) {
      errorMessageElement.textContent = validationError;
      return;
    }

    // If no errors, proceed to reset password
    const urlParams = new URLSearchParams(window.location.search);
    const oobCode = urlParams.get("oobCode"); // Get the oobCode from URL
    // Check if invalid url with oob code
    if (newPassword !== confirmPassword) {
      errorMessageElement.textContent = "Invalid link";
      return;
    }
    firebase
      .auth()
      .confirmPasswordReset(oobCode, newPassword)
      .then(() => {
        // Password reset successful
        console.log("Password reset successfully");
        // Redirect to login or another page
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        errorMessageElement.textContent = error.message;
      });
  });
