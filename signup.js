// ✅ Initialisation Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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

// ✅ Google sign-in
document.getElementById('googleSignup').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Connecté avec Google :", user.displayName);
      window.location.href = "mur.html";
    })
    .catch((error) => {
      console.error("Erreur Google Sign-In :", error.code, error.message);
      alert("Erreur lors de la connexion Google : " + error.message);
    });
});

// ✅ Redirection si déjà connecté
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Utilisateur déjà connecté :", user.displayName);
    window.location.href = "mur.html";
  }
});
