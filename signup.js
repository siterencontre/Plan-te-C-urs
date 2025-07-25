// signup.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
getAuth,
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
getDatabase,
ref,
set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// CONFIGURATION FIREBASE
const firebaseConfig = {
apiKey: "TON_API_KEY",
authDomain: "TON_DOMAINE.firebaseapp.com",
projectId: "TON_ID",
storageBucket: "planetes-coeurs-site.appspot.com",
messagingSenderId: "TON_SENDER_ID",
appId: "TON_APP_ID",
databaseURL: "https://planetes-coeurs-site-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.getElementById("register-form").addEventListener("submit", (e) => {
e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirm-password").value;
const prenom = document.getElementById("prenom").value;
const naissance = document.getElementById("naissance").value;

if (password !== confirmPassword) {
alert("Les mots de passe ne correspondent pas !");
return;
}

createUserWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
const user = userCredential.user;

// Enregistrer les données utilisateur dans la base de données  
  set(ref(database, "users/" + user.uid), {  
    email: email,  
    prenom: prenom,  
    naissance: naissance,  
    createdAt: new Date().toISOString()  
  });  

  alert("Inscription réussie !");  
  window.location.href = "login.html";  
})  
.catch((error) => {  
  alert("Erreur : " + error.message);  
});

});

