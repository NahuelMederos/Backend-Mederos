const socket = io()
let user
Swal.fire({
    title: "Registrarse",
    input: "text",
    text: "Ingrese el nombre",
    inputValidator: (value)=>{
        return !value && "Se necesita un valor"
    },
    allowOutsideClick: false
}).then(resp =>{
    user = resp.value
    socket.emit('newUser', user)
})

let chatBox = document.getElementById('chatBox')

socket.on('newUserConnected', user =>{
    Swal.fire({
        text: `${user} se ha conectado`,
        toast: true,
        position:"top-right"
    })
})

chatBox.addEventListener('keyup', (evt)=>{
    if(evt.key === 'Enter' && chatBox.value.trim().length > 0){
            socket.emit('message', {user: user, message: chatBox.value})
            chatBox.value = ''
    }
})


socket.on('messageLogs', arrayMensajeServidor =>{
    let log = document.querySelector('#messageLogs')
    let messages = ''
    arrayMensajeServidor.forEach(mensaje =>  {
        messages += `<li>${mensaje.user} - dice: ${mensaje.message}</li>`
    })

    log.innerHTML = messages
})