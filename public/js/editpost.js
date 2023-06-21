const postId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  
  const editFormHandler = async function(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('input[name="post-body"]').value;
  
    await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    document.location.replace('/dashboard');
  };
  
  const deleteClickHandler = async function() {
    await fetch(`/api/post/${postId}`, {
      method: 'DELETE'
    });
  
    document.location.replace('/dashboard');
  };
  
  document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);
  document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);