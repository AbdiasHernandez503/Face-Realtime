//pestañas de inicio, registro ,y cerrar sesion
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const loginCheck = user => {
    if(user) {

        loggedInLinks.forEach(link => link.style.display = 'block');
        loggedOutLinks.forEach(link => link.style.display = 'none');

    } else {
        loggedInLinks.forEach(link => link.style.display = 'none');
        loggedOutLinks.forEach(link => link.style.display = 'block');

    }
}

// captura de datos del resgitro de usuario 
const registroForm = document.querySelector('#registro-form');

registroForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#registro-email').value;
    const password = document.querySelector('#registro-password').value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {

            //limpiar formulario
            registroForm.reset();

            //cerrar el modal
            $('#registroModal').modal('hide')

            console.log('registrado')
        })


}); 

//captura de datos del Inicio de Sesión
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {

            //limpiar formulario
            loginForm.reset();

            //cerrar el modal
            $('#loginModal').modal('hide')

            console.log('inicio de sesion con exito')
        })

    //console.log(email, password)

})

const cerrar = document.querySelector('#cerrar');

cerrar.addEventListener('click', e => {
    e.preventDefault();

    auth.signOut().then(() => {
        console.log('sesión cerrada')
    })
})


//lista de cambios de estado de autenticacion de usuarios

auth.onAuthStateChanged(user => {
    if(user) {
        
        loginCheck(user);
    } else {
        
        loginCheck(user);
    }
})

//google login

const googleButton = document.querySelector('#googleLogin')
googleButton.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            console.log('inicio de sesión con google exitoso')

            //limpiar formulario
            loginForm.reset();

            //cerrar el modal
            $('#loginModal').modal('hide')

        })
        .catch(err =>{
            console.log(err)
        })
})