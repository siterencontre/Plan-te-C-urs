// Initialisation Firebase (à adapter selon ton projet)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "TON_ID",
  appId: "TON_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Cible le formulaire
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Récupère les données du formulaire
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    // Crée le compte utilisateur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enregistre les infos dans Firestore
    await setDoc(doc(db, "utilisateurs", user.uid), {
      uid: user.uid,
      nom: name,
      email: email,
      dateInscription: new Date()
    });

    alert("Compte créé avec succès !");
    window.location.href = "login.html"; // Redirige vers la page de connexion
  } catch (error) {
    alert("Erreur : " + error.message);
  }
});
