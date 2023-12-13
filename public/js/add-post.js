const postTitle = document.querySelector('.title-content');
const postContent = document.querySelector('.post-content');
const submitButton = document.querySelector('.post-submit');
const cancelButton = document.querySelector('.post-cancel');
const postForm = document.querySelector('.post-form');
const postDateContainer = document.querySelector('.post-date');

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
    postDateContainer.textContent = `${formatDate(new Date())}`;
    postContent.style.display = 'block';
    cancelButton.style.display = 'block';
    if (postContent.value.trim() !== '') {
      submitButton.style.display = 'block';
    } else {
      submitButton.style.display = 'none';
    }
  } else {
    postContent.style.display = 'none';
    submitButton.style.display = 'none';
    cancelButton.style.display = 'none';
  }
}
// Add event listeners to the title and content textareas
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

// EVENT listener to submit comment form via button
postForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitPost();
});

// EVENT listener to submit post form via enter key removed for now
// I want to allow users to use enter key to create new lines in the textarea
// Additional logic would be required to handle 'enter' submission with two input areas

// ___________________ logic to handle editing and deleting a post button ___________________
