//Funcion fetch asincronica, trae los datos desde la api local
const obtenerDatosAPI = async () => {
    try {
        const rutaDatos = './data/objetos.json';
        const respuesta = await fetch(rutaDatos);
    if (!respuesta.ok) {
        throw new Error('Error al obtener datos desde la API');
    }
    //Esto hara que hasta que no se carguen los datos, no se crearan los objetos.
    const datosAPI = await respuesta.json();
    await crearObjetos(datosAPI);
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
    }
}

//Esta funcion, que es en donde se coloca todo el grueso del codigo, envia los datos de la API al local storage, y tambien hace que no se rendericen los objetos que se encuentran en mochila si comparten el mismo ID, esto permite refrescar la pagina y que los datos se mantengan.
const crearObjetos = (datosAPI) => {
    // Almacenamos los datos de la API en el Local Storage
    localStorage.setItem('storageAPI', JSON.stringify(datosAPI));
    class Objetos {
        constructor (id,nombre, valor,descripcion,imagen){
            this.id = id;
            this.nombre = nombre;
            this.valor = valor;
            this.descripcion = descripcion;
            this.imagen = imagen;
        }
    }
    // Creamos los objetos usando las propiedades de los objetos del localStorage
    const Madera = new Objetos(
        datosAPI.Madera.id,
        datosAPI.Madera.nombre,
        datosAPI.Madera.valor,
        datosAPI.Madera.descripcion,
        datosAPI.Madera.imagenUrl
    );
    const Acero = new Objetos(
        datosAPI.Acero.id,
        datosAPI.Acero.nombre,
        datosAPI.Acero.valor,
        datosAPI.Acero.descripcion,
        datosAPI.Acero.imagenUrl
    );
    const Cuero = new Objetos(
        datosAPI.Cuero.id,
        datosAPI.Cuero.nombre,
        datosAPI.Cuero.valor,
        datosAPI.Cuero.descripcion,
        datosAPI.Cuero.imagenUrl
    );
    const Gema = new Objetos(
        datosAPI.Gema.id,
        datosAPI.Gema.nombre,
        datosAPI.Gema.valor,
        datosAPI.Gema.descripcion,
        datosAPI.Gema.imagenUrl
    );
    const Pomo = new Objetos(
        datosAPI.Pomo.id,
        datosAPI.Pomo.nombre,
        datosAPI.Pomo.valor,
        datosAPI.Pomo.descripcion,
        datosAPI.Pomo.imagenUrl
    );
// Creamos el array de objetos del vendedor
    let vendedorObjetos = [Madera, Cuero, Acero, Gema, Pomo];
// Obtenemos los datos del localStorage
    JSON.parse(localStorage.getItem("storageAPI")) || localStorage.setItem("storageAPI", JSON.stringify(vendedorObjetos));
//Hacemos un for each para renderizar las imagenes de los objetos en el inicio.
    vendedorObjetos.forEach((item) => {
    let mochila = JSON.parse(localStorage.getItem("mochila")) || [];
    // Al refrescar la pagina, los datos de la api se envian nuevamente, por ende eso haria que se vuelvan a generar los items en el vendedor, a pesar de que estan en la mochila, esto hace que no renderice el item que ya se encuentra en la mochila, a pesar de que se refresque la pagina.
    if (!mochila.some(mochilaItem => mochilaItem.id === item.id)) {
        let objetos = document.createElement("button");
        objetos.id = `${item.id}`
        objetos.classList.add("claseDelBoton");
        objetos.innerHTML = `
        <img src="${item.imagen}" class="objetos ajustarImagen" alt="${item.nombre}">
        `;
        lista1.append(objetos);
        // Habilita el botón de compra al hacer clic en un objeto de lista1
        objetos.addEventListener('click', () => {
            botonCompra.disabled = false;
            clickInfo = objetos.id;
            visualizarObjetos(clickInfo);
        });
    } else {
        console.log(`El objeto con ID ${item.id} ya está en la mochila.`);
        // Puedes realizar alguna acción o simplemente no hacer nada si el objeto ya está en la mochila.
    }
});
//Esta funcion agrega la descripcion de los botones al centro inferior de la pantalla.

const visualizarObjetos = (id) => {
    let objeto = vendedorObjetos.find(item => item.id == id);
    // Verificar si el objeto ya está en la mochila
    if (!mochila.some(item => item.id === objeto.id)) {
        let infoObjeto = document.createElement("div");
        infoObjeto.innerHTML= `
        <h2 class = "tituloItem">${objeto.nombre}</h2>
        <p>Oro: ${objeto.valor}</p>
        <p>${objeto.descripcion}</p>
        `;
        ventanaInfo.append(infoObjeto);
    } else {
        console.log(`El objeto con ID ${id} está en la mochila.`);
    }
}

    let clickInfo;
//Creamos el localStorage en donde iran los objetos, y a su vez creamos el array.
    let mochila = JSON.parse(localStorage.getItem("mochila")) || [];
//Aca use el operador de propagacion para convertir el elemento en un array y que me permita hacer un forEach
    [...document.getElementsByClassName("claseDelBoton")].forEach((boton) => {
        boton.addEventListener('click', () => {
            ventanaInfo.innerHTML = ``;
            clickInfo = boton.id;
            visualizarObjetos(clickInfo);
        });
    });
//Reconocemos el boton de compra.
    let botonCompra = document.querySelector("#botonCompra");
//Esto hace que el boton se deshabilite a menos que se haga click en algun elemento disponible para comprar.
    botonCompra.disabled = true;
//Reconocemos la lista2, en donde iran los objetos a la mochila.
    let lista2 = document.querySelector('#lista2');
    botonCompra.addEventListener('click', () => {
        //Al hacer click en el boton de compra, tiene en cuenta que este depositado el mismo ID de donde hizo click al objeto-boton, para que pueda comprar el mismo objeto.
        let objeto = vendedorObjetos.find(item => item.id == clickInfo);
        //Tomamos la referencia al elemento padre
        let ventanaPanel = document.getElementById('BG-img');
        //Creamos todos los elementos, tanto el texto como los dos botones.
        let panelConfirmacion = document.createElement('div');
        panelConfirmacion.id = 'panelConfirmacion';
        //Utilice boton de bootsrap y tambien añadi una animacion para la ventana de confirmacion.
        let textoDeCompra = document.createElement('p');
        textoDeCompra.id = 'textoDeCompra';
        textoDeCompra.textContent = `¿Quieres comprar ${objeto.nombre}?`;
        panelConfirmacion.appendChild(textoDeCompra);
        panelConfirmacion.className="animate__animated animate__bounceInLeft"
    
        let botonesConfirmaciones = document.createElement('div');
        botonesConfirmaciones.id = 'botonesConfirmaciones';

        //Boton de rechazar
        let botonRechazar = document.createElement('button');
        botonRechazar.id = 'botonRechazar';
        botonRechazar.className = 'botonPanel btn btn-danger';
        botonRechazar.innerHTML = '<i class="bi bi-x-lg"></i>No';
        botonesConfirmaciones.appendChild(botonRechazar);
    
        //Boton de comprar
        let botonConfirmar = document.createElement('button');
        botonConfirmar.id = 'botonConfirmar';
        botonConfirmar.className = 'botonPanel btn btn-success';
        botonConfirmar.innerHTML = '<i class="bi bi-check-lg"></i> Si';
        botonesConfirmaciones.appendChild(botonConfirmar);
        panelConfirmacion.appendChild(botonesConfirmaciones);
        ventanaPanel.appendChild(panelConfirmacion);

        //Entonces ahora, una vez creada la nueva ventana, le agregamos un nuevo evento pero al boton de confirmar compra para que ejecute el resto del codigo y realice la compra, haciendo la transicion del objeto.
        botonConfirmar.addEventListener('click', () => {
            mochila.push(objeto);
            vendedorObjetos = vendedorObjetos.filter(item => item.id != clickInfo);
            swal(`${objeto.nombre} se ha añadido a tu mochila`);
            let boton = document.getElementById(clickInfo);
            boton.parentNode.removeChild(boton);
            localStorage.setItem("storageAPI", JSON.stringify(vendedorObjetos));
    
            let objetoLista2 = document.createElement("button");
            objetoLista2.id = `${objeto.id}`
            objetoLista2.classList.add("claseDelBoton");
            objetoLista2.innerHTML= `
            <img src="${objeto.imagen}" class="objetos ajustarImagen" alt="${objeto.nombre}">
            `;
            lista2.append(objetoLista2);
        //Aca ejecutara este switch para mostrar el globo de texto cuando se compre un objeto donde explica el lore del objeto.
            let globoTexto = document.getElementById('globoTexto');
            switch(objeto.id) {
                case 1:
                    globoTexto.innerText = "En mis largos viajes por estas tierras me encontrado con curiosas criaturas, una de ellas fueron los elfos, que no usaban espadas ni armaduras de metal... Usaban madera! La magia de sus arboles era suficiente para ellos, he traido unos cuantos troncos y tablas, espero que les obtengas provecho.";
                    break;
                case 2:
                    globoTexto.innerText = "Los mejores lingotes del reino de la humanidad! Este acero fue purificado por las ascuas eternas, que dicen los habiles fundidores que en esas  brazas yace las cenizas de un poderoso fenix, la leyenda cuenta que si lo dejan de alimentar, renacerá y traera caos al reino humano.";
                    break;
                case 3:
                    globoTexto.innerText = "En estos bosques los animales que proveen carne y cuero no son los mismos que podrias encontrar en una granja, aqui los animales se nutren directamente de las plantas y el agua de este bosque encantado, su carne es mas deliciosa y sus cueros son mas resistentes! Pero tambien son mas peligrosos y mas dificiles de cazar, aprovecha el maximo su piel! ";
                    break;
                case 4:
                    globoTexto.innerText = "Una gema escarlata extraida por los propios enanos del oeste, cuentan las leyendas que los enanos cavaron tan profundo que ademas de las gemas mas preciosas encontraron un terrible monstruo que despertaron y asoló una de sus ciudades... esta gema, proviene de esa epoca, incrustala con sabiduria, pues seria en vano desperdiciarla despues de tan triste sacrificio...";
                    break;
                case 5:
                    globoTexto.innerText = "¡Este pomo le pertenecio a un poderoso heroe de antaño que lucho contra feroces dragones, malvadas brujas, brutales orcos y...! Es una broma, es solamente un pomo de hierro.";
                    break;
                default:
                    globoTexto.innerText = "no hay nada.";
            }  
//Al comprar todos los objetos, se dejara al usuario leer la descripcion del ultimo objeto unos segundos, antes de que el vendedor se despida.
            if (mochila.length === 5) {
                botonCompra = document.querySelector("#botonCompra");
                botonCompra.disabled = true;
                setTimeout( () => {
                    globoTexto.innerText = "Bueno muchacho, hasta aqui hemos llegado, ya no tengo mas que ofrecerte,ten mucha suerte en tu camino, ultimamente los caminos se volvieron... peligrosos. Si quieres podemos intentar otra vez realizar la compra, aprieta la naranja si quieres volver a comenzar. Enviale un saludo de mi parte al herrero, que tengas un excelente dia!";
                }, 10000);
            }
            // Añade el objeto comprado al localStorage
            localStorage.setItem("mochila", JSON.stringify(mochila));
            // Oculta la ventana cuando se da la compra terminada
            panelConfirmacion.style.display = 'none';
            //Agregue esto para que no se acumulen los div en el html
            panelConfirmacion.remove();
            //Limpia la pantalla cuando ya no hayan elementos.
            lista1.children.length === 0 ? ventanaInfo.innerHTML = '' : null;
        });
        // Evento de clic para el botón de cancelar
        botonRechazar.addEventListener('click', () => {
            // oculta la ventana cuando se ejecuta el rechazar
            panelConfirmacion.style.display = 'none';
        });
    });
}

//El codigo que continua aca, sirve para renderizar los objetos que se encuentran en el localStorage cuando refrescas la pagina, ya que en funciones anteriores, no renderiza los objetos del vendedor que ya se encuentran en mochila porque comparten su id, lo que hace esto es que va a renderizar los objetos de la mochila que se encuentran en el localStorage, pudiendo tener la oportunidad de refrescar la pagina pero manteniendo los objetos comprados.

let mochila = JSON.parse(localStorage.getItem("mochila")) || [];

function mostrarObjetosMochila() {
    let lista2 = document.querySelector('#lista2');
    mochila.forEach(objeto => {
        let objetoLista2 = document.createElement("button");
        objetoLista2.id = `${objeto.id}`
        objetoLista2.classList.add("claseDelBoton");
        objetoLista2.innerHTML= `
        <img src="${objeto.imagen}" class="objetos ajustarImagen" alt="${objeto.nombre}">
        `;
        lista2.append(objetoLista2);
    });
}
//El vendedor vuelve a despedirse pero esta vez cuando la pagina esta refrescada y si hay 5 objetos en la mochila.
mochila.length === 5
    ? (globoTexto.innerText = "Bueno muchacho, hasta aquí hemos llegado, ya no tengo más que ofrecerte. Ten mucha suerte en tu camino. Últimamente los caminos se volvieron... peligrosos. Si quieres podemos intentar otra vez realizar la compra, aprieta la naranja si quieres volver a comenzar. Envíale un saludo de mi parte al herrero, que tengas un excelente día!",
    botonCompra.disabled = true)
    : null;

//Ejecutamos las dos funciones, la que renderiza el localStorage y luego la que ejecuta todo el codigo en general.
mostrarObjetosMochila();
obtenerDatosAPI();