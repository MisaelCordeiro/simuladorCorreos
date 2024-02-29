document.addEventListener('DOMContentLoaded', function() {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCc = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    inputEmail.addEventListener('blur', validar); //se puede cambiar x input para que sea en tiempo real
    inputCc.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', function(e){
        e.preventDefault(); // previene comportamiento default del elemento

        //reiniciar el objeto
        email.email = '',
        email.cc = '',
        email.asunto = '',
        email.mensaje = '' 

        formulario.reset();
        comprobarEmail();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

             //reiniciar el objeto
            email.email = '',
            email.asunto = '',
            email.mensaje = '' 

            formulario.reset();
            comprobarEmail();

            // crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500','text-white','p-2','text-center','rounded-lg','mt-10','font-bold','text-sm','uppercase');
            alertaExito.textContent='Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            })
            }, 3000);

    }
  
    function validar(e){

        
        
        if(e.target.value.trim() === '' && e.target.id !== 'cc'){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return; // el return detiene la ejecucion del if
        } 
        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido',e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if(e.target.id === 'cc' && !validarEmail(e.target.value) && e.target.value.trim() !== ''){
            mostrarAlerta('El email de Reenvio no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        

        //comprobar el objeto de email
        comprobarEmail();
    }


    function mostrarAlerta(mensaje, referencia){
        //comprueba si ya existe una alerta
        limpiarAlerta(referencia);

        //generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // inyectar error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if((Object.values(email).includes(''))){               //esto comprueba si algun valor del objeto que creamos se queda en blanco
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

});

