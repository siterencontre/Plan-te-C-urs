// Exemple minimal pour afficher un post localement
function publishPost() {
  const text = document.getElementById("postText").value;
  const file = document.getElementById("postImage").files[0];

  const feed = document.getElementById("feed");

  const postDiv = document.createElement("div");
  postDiv.classList.add("post");

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.innerText = text;

  postDiv.appendChild(textDiv);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      postDiv.appendChild(img);
    };
    reader.readAsDataURL(file);
  }

  feed.prepend(postDiv);
  document.getElementById("postText").value = "";
  document.getElementById("postImage").value = "";
}
