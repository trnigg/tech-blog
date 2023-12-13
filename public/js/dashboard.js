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
const actionButtons = document.querySelectorAll('.post-actions');

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

// EVENT listener for entire document to hide buttons when user clicks anywhere on the page
document.addEventListener('click', () => {
  actionButtons.forEach((button) => {
    button.style.display = 'none';
  });
});

// EVENT listener for each post card to show buttons when user clicks on the card
document.querySelectorAll('.post-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click event from bubbling up to the document

    // nested EVENT listener for each post - iterate and check with selected card is not the same as the card clicked
    document.querySelectorAll('.post-card').forEach((otherCard) => {
      if (otherCard !== card) {
        // Select the buttons of the other card(s) and hide them
        const otherButtons = otherCard.querySelector('.post-actions');
        otherButtons.style.display = 'none';
      }
    });

    const actions = card.querySelector('.post-actions');
    if (actions.style.display === 'none' || actions.style.display === '') {
      actions.style.display = 'block';
    } else {
      actions.style.display = 'none';
    }

    // Get the ID of specific post card (each)
    // Will be used in each three buttons.
    const postID = parseInt(card.getAttribute('data-post-id'));

    const viewButton = card.querySelector('.view-button');
    viewButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent bubbling to card
      // re-route to post page where user can see post w comments
      window.location.href = `/post/${postID}`;
    });

    const editButton = card.querySelector('.edit-button');
    editButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent bubbling to card
      // Handle edit
    });

    const deleteButton = card.querySelector('.delete-button');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent bubbling to card
      // Handle delete
    });
  });
});
