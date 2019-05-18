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
$('#create').on('submit', CreateDate);

const db = firebase.firestore();

function CreateDate() {
  event.preventDefault();

  let radio;

  if (document.getElementById('SoldOut1').checked) {
    radio = 'Oui';
  } else {
    radio = 'Non';
  }

  db.collection("tour").add({
    date: $('#date').val(),
    city_name: $('#city_name').val(),
    country: $('#country').val(),
    party_name: $('#party_name').val(),
    complete: radio
  })
    .then(function (docRef) {
      console.log("Document written with ID :", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document :", error);
    });

  displayTour();
}

function displayTour() {
  db.collection("tour").get().then((querySnapshot) => {
    let html_tours = '';
    querySnapshot.forEach(function (doc) {
      const {date, city_name, country, party_name, complete} = doc.data();

      html_tours += `
      <div class="content"><strong>Date du concert :</strong> ${date} <br>
      <strong>Ville :</strong> ${city_name} <br>
      <strong>Pays :</strong> ${country} <br>
      <strong>Lieu :</strong> ${party_name} <br>
      <strong>Complet ? :</strong> ${complete}</div>
      <br>`;
    });
    $('#displayTours').html(html_tours);
  });
}

function onSubmitLogin(event) {
  event.preventDefault();

  const email = $('#login_email').val();
  const password = $('#login_password').val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
  firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
    // Handle Errors here.

    const wrapper = document.getElementById('login');
    wrapper.classList.add('d-none');

    const wrapper2 = document.getElementById('connected');
    wrapper2.classList.remove('d-none');

    const alert = document.getElementById('alert');
    alert.classList.remove('d-none');

    const contentTitle = document.getElementById('title_content');
    contentTitle.classList.remove('d-none');
    displayTour();
  });
}