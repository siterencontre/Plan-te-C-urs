// Importation de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsCollection = collection(db, "posts");

// Échapper le HTML pour éviter les attaques XSS
function escapeHTML(text) {
  const div = document.createElement("div");
  div.innerText = text;
  return div.innerHTML;
}

// Publier une publication
document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("postText").value.trim();
  const imageInput = document.getElementById("postImage");
  const imageFile = imageInput.files[0];

  if (!text && !imageFile) return;

  let imageUrl = "";
  if (imageFile) {
    const reader = new FileReader();
    reader.onload = async function () {
      imageUrl = reader.result;

      await addDoc(postsCollection, {
        text,
        image: imageUrl,
        likes: 0,
        comments: [],
        timestamp: new Date()
      });

      document.getElementById("postText").value = "";
      imageInput.value = "";
    };
    reader.readAsDataURL(imageFile);
  } else {
    await addDoc(postsCollection, {
      text,
      image: "",
      likes: 0,
      comments: [],
      timestamp: new Date()
    });

    document.getElementById("postText").value = "";
    imageInput.value = "";
  }
});

// Rendre les publications
function renderPosts(posts) {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");

    postDiv.innerHTML = `
      <div class="text">${escapeHTML(post.text)}</div>
      ${post.image ? `<img src="${post.image}" class="post-image">` : ""}
      <div class="actions">
        <button onclick="likePost(${index})">❤️ ${post.likes}</button>
        <button onclick="toggleComments(${index})">💬 Commenter</button>
        <button onclick="sharePost(${index})">🔗 Partager</button>
      </div>
      <div class="comments" id="comments-${index}" style="display:none;">
        ${post.comments.map(c => `<div class="comment">🗨️ ${escapeHTML(c)}</div>`).join("")}
        <input type="text" id="commentInput-${index}" placeholder="Ajouter un commentaire...">
        <button onclick="addComment(${index})">Envoyer</button>
      </div>
    `;

    postsContainer.appendChild(postDiv);
  });
}

// Gérer les likes
function likePost(index) {
  posts[index].likes++;
  renderPosts(posts);
}

// Afficher/masquer les commentaires
function toggleComments(index) {
  const commentsDiv = document.getElementById(`comments-${index}`);
  commentsDiv.style.display = commentsDiv.style.display === "none" ? "block" : "none";
}

// Ajouter un commentaire
function addComment(index) {
  const input = document.getElementById(`commentInput-${index}`);
  const comment = input.value.trim();
  if (comment) {
    posts[index].comments.push(comment);
    input.value = "";
    renderPosts(posts);
  }
}

// Écoute temps réel des publications Firebase
let posts = [];

onSnapshot(postsCollection, (snapshot) => {
  posts = [];
  snapshot.forEach((doc) => {
    posts.push(doc.data());
  });
  posts.sort((a, b) => b.timestamp?.toDate() - a.timestamp?.toDate());
  renderPosts(posts);
});
