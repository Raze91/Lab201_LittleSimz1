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

const db = firebase.firestore();

db.collection("tour").get().then((querySnapshot) => {
    let html_tours = '';
    let html_tour_middle = '';
    let html_tour_right = '';
    querySnapshot.forEach(function (doc) {
        const { date, city_name, country, party_place, party_name, complete } = doc.data();

        html_tours += `
      <p>${date}</p>
        `;
        html_tour_middle += `
        <p><span class="black">${party_name}</span></p>
        `
        html_tour_right += `
      <p>${city_name},${country}</p>  
        `
    });

    $('#tour').html(html_tours);
    $('#tour-middle').html(html_tour_middle);
    $('#tour-right').html(html_tour_right);
});



