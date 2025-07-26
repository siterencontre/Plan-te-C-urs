const postsContainer = document.getElementById("postsContainer");
const postText = document.getElementById("postText");
const imageUpload = document.getElementById("imageUpload");

function publishPost() {
  const text = postText.value.trim();
  const imageFile = imageUpload.files[0];

  if (!text && !imageFile) {
    alert("Écrivez un message ou ajoutez une image.");
    return;
  }

  const post = document.createElement("div");
  post.className = "post";

  const user = document.createElement("div");
  user.className = "user";
  user.textContent = "💗 Anonyme romantique"; // À remplacer par l'utilisateur connecté

  const content = document.createElement("div");
  content.className = "content";
  content.textContent = text;

  post.appendChild(user);
  post.appendChild(content);

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "preview";
      post.appendChild(img);
    };
    reader.readAsDataURL(imageFile);
  }

  const actions = document.createElement("div");
  actions.className = "actions";
  actions.innerHTML = "<span>💗 J’aime</span><span>💬 Commenter</span><span>🔄 Partager</span>";

  post.appendChild(actions);
  postsContainer.prepend(post);

  postText.value = "";
  imageUpload.value = "";
}
