const postTitle = document.querySelector('.title-content');
const postContent = document.querySelector('.post-content');
const submitButton = document.querySelector('.post-submit');
const cancelButton = document.querySelector('.post-cancel');
const postForm = document.querySelector('.post-form');
const postDateContainer = document.querySelector('.post-date');
const actionButtons = document.querySelectorAll('.action-button');

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

// EVENT listener to show buttons when hover over post was initially used, but changed to click for mobile support
// Using event delegation to handle multiple posts

document.querySelectorAll('.post-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document

    const actions = card.querySelector('.post-actions');
    if (actions.style.display === 'none' || actions.style.display === '') {
      actions.style.display = 'block'; // Show the buttons when the card is clicked
    } else {
      actions.style.display = 'none'; // Hide the buttons if they're already visible
    }
  });

  // Hide the buttons of all cards when anywhere else on the page is clicked
  document.addEventListener('click', () => {
    actionButtons.forEach((button) => {
      button.style.display = 'none';
    });
  });

  // Get the post ID from the card - used for edit, delete api routes and view re-routing
  const postCard = document.querySelector('.post-card');
  const postID = parseInt(postCard.getAttribute('data-post-id'));

  // TODO in future: use switch statement to handle multiple buttons?

  const editButton = card.querySelector('#edit-button');
  editButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent bubbling to card
    // Handle edit
  });

  const viewButton = card.querySelector('#view-button');
  viewButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent bubbling to card
    // re-route to post page where user can see post w comments
    window.location.href = `/post/${postID}`;
  });

  const deleteButton = card.querySelector('#del-button');
  deleteButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent bubbling to card
    // Handle delete
  });
});
