import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// ✅ Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// ✅ Création de compte avec e-mail/mot de passe
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email")?.value;
  const password = document.getElementById("password")?.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Compte créé avec succès !");
      window.location.href = "mur.html"; // Redirection vers le mur
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});

// ✅ Connexion avec Google
document.getElementById("googleSignup")?.addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert("Connecté avec Google !");
      window.location.href = "mur.html"; // Redirection vers le mur
    })
    .catch((error) => {
      alert("Erreur Google : " + error.message);
    });
});

// ✅ Surveille la connexion
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Connecté :", user.email);
  }
});
