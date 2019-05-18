const config = {
  apiKey: "AIzaSyAKOx7vgeVWPu7y9hzQYeWoyYzuOT8KSSU",
  authDomain: "lab-201-little-simz.firebaseapp.com",
  databaseURL: "https://lab-201-little-simz.firebaseio.com",
  projectId: "lab-201-little-simz",
  storageBucket: "lab-201-little-simz.appspot.com",
  messagingSenderId: "230799945489",
  appId: "1:230799945489:web:14c1bd8199933dcb"
};

firebase.initializeApp(config);

$('#login').on('submit', onSubmitLogin);


function onSubmitLogin(event) {
  event.preventDefault();

  const email = $('#login_email').val();
  const password = $('#login_password').val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
      // Handle Errors here.
      const user = result.user;
      console.log(user.email);
      const wrapper = document.getElementById('login');
      wrapper.classList.add('d-none');

      const wrapper2 = document.getElementById('connected');
      wrapper2.classList.remove('d-none');

      const alert = document.getElementById('alert');
      alert.classList.remove('d-none');

      // ...
    });
}