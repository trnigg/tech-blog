// const { format_date } = require('./utils/helpers'); doesn't work in the browser
const commentContent = document.querySelector('.comment-content');
const submitButton = document.querySelector('.comment-submit');
const cancelButton = document.querySelector('.comment-cancel');
const commentForm = document.querySelector('.comment-form');
const addCommentHeading = document.querySelector('.add-comment-heading');
// const currentUser = addCommentHeading.getAttribute('data-current-user');
// Below is a newer way to get the current user from the DOM
const currentUser = addCommentHeading.dataset.currentUser;
console.log(currentUser);

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
  if (commentContent.value.trim() !== '') {
    submitButton.style.display = 'block';
    cancelButton.style.display = 'block';
    addCommentHeading.textContent = `${currentUser} on ${formatDate(
      new Date()
    )}`;
    addCommentHeading.style.display = 'block';
  } else {
    submitButton.style.display = 'none';
    cancelButton.style.display = 'none';
    addCommentHeading.style.display = 'none';
  }
}
// EVENT listener to check textarea content each time user types
commentContent.addEventListener('input', checkTextareaContent);

// EVENT listener to clear textarea content when user clicks cancel button
cancelButton.addEventListener('click', (event) => {
  // Need to prevent default form submission behaviour & page refresh (as it is located within a form)
  event.preventDefault();
  commentContent.value = '';
  checkTextareaContent(); // update button visibility manually (as there is no input event)
});

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the post ID from the form attribute
  // Need to parse as int or it woon't be accepted by my model as a valid ID
  const postID = parseInt(commentForm.getAttribute('data-post-id'));
  // Get the comment content from the textarea
  const content = commentContent.value.trim();
  // If there is content in the textarea, POST it to the database via the API with the post ID and comment content
  if (content) {
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id: postID,
        text: content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the POST request is successful, reload the page to show the new comment
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
});
