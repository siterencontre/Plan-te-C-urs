import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const auth = getAuth();
const provider = new GoogleAuthProvider();

document.getElementById('google-signup').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // Redirige vers la page mur.html
      window.location.href = "mur.html";
    })
    .catch((error) => {
      console.error("Erreur lors de la connexion Google :", error.message);
      alert("Erreur Google : " + error.message);
    });
});
