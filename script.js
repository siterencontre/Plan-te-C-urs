// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDncjDnpngllZ4uJpEZRi9srXZhCOmdSAg",
  authDomain: "planete-coeurs.firebaseapp.com",
  projectId: "planete-coeurs",
  storageBucket: "planete-coeurs.appspot.com",
  messagingSenderId: "905612207805",
  appId: "1:905612207805:web:c898b1035cdc60b79139d4",
  measurementId: "G-GJ34E1KT0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create account
window.signUp = function() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Compte créé avec succès !");
    })
    .catch((error) => {
      alert(error.message);
    });
};

// Sign in
window.signIn = function() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Connexion réussie !");
    })
    .catch((error) => {
      alert(error.message);
    });
};
