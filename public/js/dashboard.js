// ___________________________________ DOM References ___________________________________

// DOM References for adding a post (one form)
const postTitle = document.querySelector('.title-content');
const postContent = document.querySelector('.post-content');
const submitButton = document.querySelector('.post-submit');
const cancelButton = document.querySelector('.post-cancel');
const newPostForm = document.querySelector('#new-post-form');
const postDateContainer = document.querySelector('.post-date');
// DOM References for interacting with post cards (multiple cards)
// Each post card has a button container - need to select all of them
// const actionButtons = document.querySelectorAll('.post-actions');

//_____________________________________ Functions _______________________________________

// FUNCTION to format date from utils/helpers.js - for some reason it doesn't work when imported - node+browsers...
function formatDate(date) {
  return date.toLocaleDateString('en-UK', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  });
}

// FUNCTION to check textarea content and show/hide submit button depending on content within
function checkTextareaContent() {
  if (postTitle.value.trim() !== '') {
    postDateContainer.textContent = `on ${formatDate(new Date())}`;
    postContent.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
    if (postContent.value.trim() !== '') {
      submitButton.classList.remove('hidden');
    } else {
      submitButton.classList.add('hidden');
    }
  } else {
    postContent.classList.add('hidden');
    submitButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
  }
}

// FUNCTION to submit post to database
async function submitPost() {
  const title = postTitle.value.trim();
  const content = postContent.value.trim();
  if (content) {
    const response = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({
        title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

//_____________________________________ Event Listeners _______________________________________

// EVENT listeners to the title and content textareas to check for content
postTitle.addEventListener('input', checkTextareaContent);
postContent.addEventListener('input', checkTextareaContent);

// EVENT listener to clear textarea content when user clicks cancel button
cancelButton.addEventListener('click', (event) => {
  // Need to prevent default form submission behaviour & page refresh (as it is located within a form)
  event.preventDefault();
  postTitle.value = '';
  postContent.value = '';
  postDateContainer.textContent = '';
  checkTextareaContent(); // update button visibility manually (as there is no input event)
});

// EVENT listener to submit comment form via button
newPostForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitPost();
});
