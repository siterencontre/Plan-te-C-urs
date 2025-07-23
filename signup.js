// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Configuration Firebase (corrigée)
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Fonction d'inscription
async function signup() {
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const dateNaissance = document.getElementById("dateNaissance").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (password !== confirmPassword) {
    message.textContent = "Les mots de passe ne correspondent pas.";
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enregistrer les infos dans Firestore
    await setDoc(doc(db, "utilisateurs", user.uid), {
      nom,
      prenom,
      dateNaissance,
      email
    });

    message.style.color = "green";
    message.textContent = "Compte créé avec succès !";

    // Redirection (facultatif)
    // window.location.href = "login.html";

  } catch (error) {
    message.textContent = "Erreur : " + error.message;
  }
}
