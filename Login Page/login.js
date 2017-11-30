(function(){
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNy4-ulO5eWHcZThp6PDnODd5K_erFyv0",
    authDomain: "loginpage-8eb23.firebaseapp.com",
    databaseURL: "https://loginpage-8eb23.firebaseio.com",
    projectId: "loginpage-8eb23",
    storageBucket: "",
    messagingSenderId: "150801860151"
  };
  firebase.initializeApp(config);

    //Get Elements (Login)
    const loginEmail = document.getElementById('email');
    const loginPassword = document.getElementById('password');
    const btnLogin = document.getElementById('login-submit');
    const btnLogout = document.getElementById('logout-submit');

    //Get Element (Register)
    const regEmail = document.getElementById('emailReg');
    const regPassword = document.getElementById('passwordReg');
    const btnRegister = document.getElementById('register-submit');

    //Login Event
    btnLogin.addEventListener('click', e => {
       //get email and pass
        const email = loginEmail.value;
        const pass = loginPassword.value;
        const auth = firebase.auth();
        localStorage.setItem('email', email);

        //sign in
        const promise = auth.signInWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                window.location = '../search.html';
            }
        });

    });

    //Sign-Up
    btnRegister.addEventListener('click', e => {
        //get email and pass
        const email = regEmail.value;
        const pass = regPassword.value;
        const auth = firebase.auth();

          localStorage.setItem('email', email);

        //sign up
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));

        //console.log(email);
        //console.log(pass);
        //window.location = 'search.html';

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser) {
                window.location = '../search.html';
            }
        });
    });

    //logout btn
    btnLogout.addEventListener('click', e => {
       firebase.auth().signOut();
    });

    //Realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser) {
            console.log(firebaseUser);
            btnLogout.classList.remove('hide');
            btnLogin.classList.add('hide');
            btnRegister.classList.add('hide');
        } else {
            console.log('not logged in');
            btnLogout.classList.add('hide');
            btnLogin.classList.remove('hide');
           btnRegister.classList.remove('hide');
        }
    });
}());
