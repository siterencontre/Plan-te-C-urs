// signup.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getDatabase,
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// CONFIGURATION FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E",
  databaseURL: "https://planetes-coeurs-site-default-rtdb.firebaseio.com/"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Écoute du formulaire
document.getElementById("register-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value;
  const naissance = document.getElementById("naissance").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  // Création de l'utilisateur
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Mettre à jour le nom d'utilisateur dans le profil Firebase Auth
      updateProfile(user, {
        displayName: prenom
      });

      // Enregistrer les infos dans la base de données
      set(ref(database, "users/" + user.uid), {
        prenom: prenom,
        naissance: naissance,
        email: email,
        createdAt: new Date().toISOString()
      });

      alert("Inscription réussie !");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});
