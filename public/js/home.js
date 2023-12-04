document.querySelectorAll('.post-card').forEach((card) => {
  card.addEventListener('click', (event) => {
    // Get the post id from the card that is clicked (need to get this id to the card attributes)
    const postId = event.currentTarget.dataset.postId;
    // Redirect to the post page with the post id
    window.location.href = `/post/${postId}`;
  });
});
