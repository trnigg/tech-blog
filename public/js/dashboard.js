// ___________________________________ DOM References ___________________________________

// Global DOM References
const postTitle = document.querySelector('.title-content');
const postContent = document.querySelector('.post-content');
const submitButton = document.querySelector('.post-submit');
const cancelButton = document.querySelector('.post-cancel');
const newPostForm = document.querySelector('#new-post-form');
const postDateContainer = document.querySelector('.post-date');
const postCards = document.querySelectorAll('.post-card');

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

// FUNCTION to hide all action buttons on all cards
function hideAllActionButtons() {
  postCards.forEach((card) => {
    const actionButtons = card.querySelector('.post-actions');
    actionButtons.classList.add('hidden');
  });
}
// FUNCTION to hide any edit forms on any cards and unhide the post card header
// TODO in future: combine this with hideAllActionButtons() to reduce code duplication?
function revertFormState() {
  postCards.forEach((card) => {
    const editPostForm = card.querySelector('#edit-post-form');
    const postCardHeader = card.querySelector('.post-card-header');
    editPostForm.classList.add('hidden');
    postCardHeader.classList.remove('hidden');
  });
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

// FUNCTION to edit a post
async function editPost(postID, newTitle, newContent) {
  const response = await fetch(`/api/post/${postID}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: newTitle,
      content: newContent,
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

// FUNCTION to delete a post
async function deletePost(postID) {
  const response = await fetch(`/api/post/${postID}`, {
    method: 'DELETE',
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

// Add event listener to each post card
postCards.forEach((card) => {
  // Get the action buttons for THIS card
  const actionButtons = card.querySelector('.post-actions');
  // Get the post ID for THIS card - this is important to target the correct post for the fetch requests
  const postID = card.getAttribute('data-post-id');
  // Get the view, edit, and delete buttons - this is tied to the actionButtons for this card
  const viewButton = actionButtons.querySelector('.view-button');
  const editButton = actionButtons.querySelector('.edit-button');
  const deleteButton = actionButtons.querySelector('.delete-button');
  // Get the edit form elements for THIS card (they are hidden by default)
  const editSubmitBtn = card.querySelector('.edit-submit');
  const editCancelBtn = card.querySelector('.edit-cancel');
  const editPostForm = card.querySelector('#edit-post-form');
  // Header of post card to be hidden when edit form is shown
  const postCardHeader = card.querySelector('.post-card-header');

  card.addEventListener('click', (event) => {
    // Prevent the document click event listener from firing (and triggering hideAllActionButtons())
    event.stopPropagation();
    // If the action buttons are hidden: show them.
    if (actionButtons.classList.contains('hidden')) {
      // Hide all action buttons ON OTHER CARDS - without this, the action buttons will remain visible on other cards unless doc event triggered.
      hideAllActionButtons();
      // Hide edit form if it is visible on other cards.
      revertFormState();
      // Show the action buttons for this card
      actionButtons.classList.remove('hidden');
      // Else visible for this card: hide buttons.
    } else {
      actionButtons.classList.add('hidden');
    }
  });

  // EVENT listener for view button
  viewButton.addEventListener('click', (event) => {
    // Prevent the card click event listener from firing
    event.stopPropagation();
    // Hide buttons (not really necessary as page will nav away normally)
    actionButtons.classList.add('hidden');
    window.location.href = `/post/${postID}`;
  });

  // EVENT listener for edit button
  editButton.addEventListener('click', (event) => {
    // Prevent the card click event listener from firing
    event.stopPropagation();
    // Hide buttons
    actionButtons.classList.add('hidden');
    editPostForm.classList.remove('hidden');
    postCardHeader.classList.add('hidden');
  });

  // EVENT listener to the delete button
  deleteButton.addEventListener('click', (event) => {
    // Prevent the card click event listener from firing
    event.stopPropagation();

    // instead of hiding button on click, delete for now will use a confirm. If no, buttons remain, else DELETE fetch req and page refresh
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      deletePost(postID);
    }
  });

  // EVENT listener to the cancel btn on edit form
  editCancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // Prevent the card click event listener from firing
    event.stopPropagation();
    // Hide the edit form and show the post card header
    revertFormState();
  });

  // EVENT listener to the submit btn on edit form
  editSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // Prevent the card click event listener from firing
    event.stopPropagation();
    // Get the new title and content values
    const newTitle = card.querySelector('.edit-title').value.trim();
    const newContent = card.querySelector('.edit-content').value.trim();
    // If the title and content are not empty, call editPost() with params required for fetch req
    if (newTitle && newContent) {
      editPost(postID, newTitle, newContent);
    }
  });

  // EVENT listener to the edit form to prevent the card click event (toggling action-btn vis))
  editPostForm.addEventListener('click', (event) => {
    event.stopPropagation(); // STOP the card click event listener from firing and toggling button vis
    // NOTE: This is only a hotfix - the perimeter of the card will still toggle the buttons
  });
});

// EVENT listener for document to hide all action buttons and edit forms when anywhere outside a card is clicked
document.addEventListener('click', () => {
  hideAllActionButtons();
  revertFormState();
});
