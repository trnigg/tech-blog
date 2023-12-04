// Helper Function to check if the password is valid - maybe modularise in future
const isPasswordValid = (password) => {
  // Will return true if length is equal or greater than 8
  return password.length >= 8;
};

// Script to handle the sign-up form and request

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPassword = document
    .querySelector('#confirm-password')
    .value.trim();

  // Client-side password validation
  if (!isPasswordValid(password)) {
    alert('Password must be at least 8 characters long');
    return;
  }

  // Client-side confirmation password validation
  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  // NOTE: Consider adding further client-side validations, replace alerts with modals
  // Only make the fetch request if there is a username, email, and valid password, and if the passwords match
  if (
    username &&
    email &&
    isPasswordValid(password) &&
    password === confirmPassword
  ) {
    const response = await fetch('/api/user/sign-up', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // Redirect to log-in page if sign-up successful, so user can log-in with new credentials
    if (response.ok) {
      document.location.replace('/log-in');
    } else {
      alert('Failed to sign up.');
    }
  }
};

document.querySelector('form').addEventListener('submit', signupFormHandler);
