// signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com", // corrigé ici
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

// Initialisation
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Formulaire d'inscription
const form = document.getElementById("signup-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = form["nom"].value;
  const prenom = form["prenom"].value;
  const dateNaissance = form["date"].value;
  const email = form["email"].value;
  const password = form["password"].value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Sauvegarder dans Firestore
    await setDoc(doc(db, "utilisateurs", user.uid), {
      nom: nom,
      prenom: prenom,
      dateNaissance: dateNaissance,
      email: email,
      uid: user.uid,
      dateCreation: new Date()
    });

    alert("Inscription réussie !");
    window.location.href = "login.html"; // Redirection vers la page de connexion
  } catch (error) {
    alert("Erreur : " + error.message);
  }
});
