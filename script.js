// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDU5mzsxsDAa2tmq9fwQcf-DD7rNY9riU8",
  authDomain: "planete-coeur.firebaseapp.com",
  projectId: "planete-coeur",
  storageBucket: "planete-coeur.appspot.com",
  messagingSenderId: "124827847585",
  appId: "1:124827847585:web:64b56079fcafdd61f5d9e0",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inscription
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Compte créé avec succès !");
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// Connexion
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailOrPhone = document.getElementById("emailOrPhone").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, emailOrPhone, password)
      .then((userCredential) => {
        alert("Connexion réussie !");
        window.location.href = "profil.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}
