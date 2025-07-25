// Initialisation Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBWMGsMl7Uyqx5mimLiR_lv_u_WCeaU_jY",
  authDomain: "planetes-coeurs-site.firebaseapp.com",
  projectId: "planetes-coeurs-site",
  storageBucket: "planetes-coeurs-site.appspot.com",
  messagingSenderId: "433372689765",
  appId: "1:433372689765:web:8e1e6ae2b776875a329d8c",
  measurementId: "G-SMZTEG955E"
};

firebase.initializeApp(firebaseConfig);

// Authentification Email/Mot de passe
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Compte créé avec succès !");
      window.location.href = "mur.html";
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});

// Connexion avec Google
document.getElementById("googleSignup").addEventListener("click", function () {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      alert("Connexion Google réussie !");
      window.location.href = "mur.html";
    })
    .catch((error) => {
      alert("Erreur Google : " + error.message);
    });
});
