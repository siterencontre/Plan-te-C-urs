// Importation Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Création de compte avec email/mot de passe
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Autres champs supplémentaires (si présents dans votre formulaire)
  const nom = document.getElementById("nom")?.value || "";
  const prenom = document.getElementById("prenom")?.value || "";
  const sexe = document.getElementById("sexe")?.value || "";
  const dateNaissance = document.getElementById("dateNaissance")?.value || "";

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;

      // Sauvegarde des données dans Firestore
      await setDoc(doc(db, "utilisateurs", user.uid), {
        uid: user.uid,
        email: user.email,
        nom: nom,
        prenom: prenom,
        sexe: sexe,
        dateNaissance: dateNaissance,
        dateInscription: new Date().toISOString()
      });

      alert("Compte créé avec succès !");
      window.location.href = "mur.html"; // Redirection
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});

// Connexion avec Google
document.getElementById("googleSignup").addEventListener("click", function () {
  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;

      // Sauvegarde des données Google par défaut
      await setDoc(doc(db, "utilisateurs", user.uid), {
        uid: user.uid,
        email: user.email,
        nom: user.displayName || "",
        prenom: "",
        sexe: "",
        dateNaissance: "",
        dateInscription: new Date().toISOString(),
        photoURL: user.photoURL || ""
      });

      alert("Connecté avec Google : " + user.email);
      window.location.href = "mur.html"; // Redirection
    })
    .catch((error) => {
      alert("Erreur Google : " + error.message);
    });
});
