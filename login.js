// Importation des fonctions nécessaires depuis Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Configuration Firebase (tu l’as déjà fournie)
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Gestionnaire de soumission du formulaire
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Connexion avec Firebase
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Connexion réussie
      const user = userCredential.user;
      window.location.href = "dashboard.html"; // Redirection après connexion
    })
    .catch((error) => {
      errorMessage.textContent = "Adresse email ou mot de passe incorrect.";
    });
});
