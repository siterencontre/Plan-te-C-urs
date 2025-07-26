// Importation Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.firebasestorage.app",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Fonction d’inscription avec email/mot de passe
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  // Création du compte avec Firebase
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Données personnelles (déjà stockées dans localStorage côté HTML)
      const data = JSON.parse(localStorage.getItem("signupData"));
      console.log("Utilisateur créé :", user.email, data);

      // Redirection après succès
      alert("Inscription réussie !");
      window.location.href = "mur.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur : " + error.message);
    });
});

// Connexion via Google
document.getElementById("googleSignup").addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert("Connecté avec Google : " + user.email);
      window.location.href = "mur.html";
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur Google : " + error.message);
    });
});
