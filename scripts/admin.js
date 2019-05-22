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

let increment = 1;

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
    party_place: $('#party_place').val(),
    party_name: $('#party_name').val(),
    complete: radio,

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
  // increment++;
  db.collection("tour").orderBy("date", "asc").get().then((querySnapshot) => {
    let html_tours = '';
    querySnapshot.forEach(function (doc) {
      const { date, city_name, country, party_place,party_name, complete } = doc.data();

      html_tours += `
      <div>

      <strong>Date du concert</strong> <input type="text" class="form-control" value="${date}" id="${'date'+ doc.id}" required autofocus> 
      
      <strong>Ville :</strong> <input type="text" class="form-control" value="${city_name}" id="${'city_name'+ doc.id}" required> 

      <strong>Pays :</strong> <input type="text" class="form-control" value="${country}" id="${'country'+ doc.id}" required> 

      <strong>Lieu :</strong> <input type="text" class="form-control" value="${party_place}" id="${'party_place'+ doc.id}" required>

      <strong>Nom du festival</strong> <input type="text" class="form-control" value="${party_name}" id="${'party_name'+ doc.id}" required>

      <strong>Complet ? :</strong> <input type="text" class="form-control" value="${complete}" id="${'soldOut'+ doc.id}" required> <br> 

      <button onclick="updateData(this.id)" class="btn btn-sm btn-primary btn-block" id="${doc.id}">Modifier</button>

      <button onclick="deleteData(this.id)" class="btn btn-sm btn-primary btn-block" id="${doc.id}">Supprimer</button>
      </div>
      <br>`;
      // increment++;
    });

    $('#displayTours').html(html_tours);
  });
}

function deleteData(id) {
  event.preventDefault();
  
  db.collection("tour").doc(id).delete()

    .then(function () {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  displayTour();
}

function updateData(id) {
  event.preventDefault();

  db.collection("tour").doc(id).update({
    date: $('#date'+ id).val(),
    city_name: $('#city_name'+ id).val(),
    country: $('#country'+ id).val(),
    party_place: $('#party_place' + id).val(),
    party_name: $('#party_name'+ id).val(),
    complete: $('#soldOut'+ id).val(),
  })
    .then(function () {
      console.log("Document successfully updated!");
    })
    .catch(function (error) {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

  displayTour();
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