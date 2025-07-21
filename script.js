import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// 🔑 Remplace ces valeurs par les tiennes depuis la console Firebase
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_AUTH_DOMAIN",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_STORAGE_BUCKET",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔷 Inscription
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.querySelector("#registerForm input[placeholder='Adresse Email']").value;
  const password = document.querySelector("#registerForm input[placeholder='Mot de passe']").value;
  const confirmPassword = document.querySelector("#registerForm input[placeholder='Confirmer le mot de passe']").value;

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => alert("Compte créé pour : " + userCredential.user.email))
    .catch(error => alert(error.message));
});

// 🔷 Connexion
document.getElementById("loginForm").addEventListener("submit", e => {
  e.preventDefault();
  const login = document.querySelector("#loginForm input[placeholder='Email ou Numéro']").value;
  const password = document.querySelector("#loginForm input[placeholder='Mot de passe']").value;

  signInWithEmailAndPassword(auth, login, password)
    .then(userCredential => alert("Connecté en tant que : " + userCredential.user.email))
    .catch(error => alert(error.message));
});
