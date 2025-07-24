// Configuration Firebase déjà initialisée dans index.html

// Références Firebase
const auth = firebase.auth();
const db = firebase.firestore();

// Gestion de l'inscription
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const name = document.getElementById("name").value.trim();
  const dob = document.getElementById("dob").value;

  if (!email || !password || !confirmPassword || !name || !dob) {
    alert("Tous les champs sont obligatoires.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  // Création de l'utilisateur
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Ajout des infos dans Firestore
      return db.collection("users").doc(user.uid).set({
        name: name,
        email: email,
        dob: dob,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        // Envoi d'un email de vérification
        return user.sendEmailVerification();
      }).then(() => {
        alert("Inscription réussie ! Un e-mail de vérification vous a été envoyé.");
        window.location.href = "login.html"; // Redirection après inscription
      });
    })
    .catch((error) => {
      console.error(error);
      alert("Erreur : " + error.message);
    });
});
