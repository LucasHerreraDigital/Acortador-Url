const formulario = document.querySelector('#agregar-url');
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlOriginal = document.querySelector('#urlOriginal').value;

    const respuesta = await fetch(e.target.action, {
        method: e.target.method,
        headers:{
            'Accept':'application/Json',
            'Content-Type':'application/Json',
        },
        body: JSON.stringify({urlOriginal: urlOriginal})
    });

    const resultado = await respuesta.json();

    console.log(resultado);

    //eliminar los mensajer anteriores
    const alertas = document.querySelector('.mensaje-url');
    if(alertas){
        document.querySelector('.mensaje-url').remove();
    }

    // verificar si todo esta bien
    if(resultado.codigo === 201){
        //construir un mensaje que todo se creo bien
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url');
        mensaje.innerHTML = `<p>Se ha acortado correctamente la Url, visita <a target='_blank' rel='noopener noreferrer' href="/${resultado.url}"> el enlace aqui </a> </p>`

        const contenedor = document.querySelector('main')
        contenedor.appendChild(mensaje);

    }else{
        //construir un mensaje de error
        const mensaje = document.createElement('div');
        mensaje.classList.add('mensaje-url', 'error');
        mensaje.innerHTML = `<p>${resultado.error}</p>`;
        const contenedor = document.querySelector('main')
        contenedor.appendChild(mensaje);
    }

})

//Si hay un error en el querystring 
const urlParams = new URLSearchParams(window.location.search);

if(urlParams.has('error')){
    const mensaje = document.createElement('div');
    mensaje.classList.add('mensaje-url', 'error');
    mensaje.innerHTML = `<p>URL no valida</p>`;
    const contenedor = document.querySelector('main')
    contenedor.appendChild(mensaje);
}