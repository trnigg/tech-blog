const logoutHandler = async () => {
  const response = await fetch('/api/user/log-out', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/log-out');
  } else {
    alert('Failed to log out.');
  }
};

document.querySelector('#log-out').addEventListener('click', logoutHandler);
