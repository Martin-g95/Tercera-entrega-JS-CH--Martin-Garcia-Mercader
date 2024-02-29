

//Objeto constructor
class Objetos {
    constructor (id,nombre, valor,descripcion,imagen){
        this.id = id;
        this.nombre = nombre;
        this.valor = valor;
        this.descripcion = descripcion;
        this.imagen = imagen;
    }
}

//Los datos del localStorage que necesito para la creacion de los objetos.

let objetosStorage = localStorage.getItem("storageAPI");

    objetosStorage = JSON.parse(objetosStorage);

//Una vez tengo los datos del storage, estos objetos obtienen las propiedades de los objetos del storage que ya fueron traidos por la API.
    const Madera = new Objetos(
        objetosStorage.Madera.id,
        objetosStorage.Madera.nombre,
        objetosStorage.Madera.valor,
        objetosStorage.Madera.descripcion,
        objetosStorage.Madera.imagenUrl
    );
    const Acero = new Objetos(
        objetosStorage.Acero.id,
        objetosStorage.Acero.nombre,
        objetosStorage.Acero.valor,
        objetosStorage.Acero.descripcion,
        objetosStorage.Acero.imagenUrl
    );
    const Cuero = new Objetos(
        objetosStorage.Cuero.id,
        objetosStorage.Cuero.nombre,
        objetosStorage.Cuero.valor,
        objetosStorage.Cuero.descripcion,
        objetosStorage.Cuero.imagenUrl
    );
    const Gema = new Objetos(
        objetosStorage.Gema.id,
        objetosStorage.Gema.nombre,
        objetosStorage.Gema.valor,
        objetosStorage.Gema.descripcion,
        objetosStorage.Gema.imagenUrl
    );
    const Pomo = new Objetos(
        objetosStorage.Pomo.id,
        objetosStorage.Pomo.nombre,
        objetosStorage.Pomo.valor,
        objetosStorage.Pomo.descripcion,
        objetosStorage.Pomo.imagenUrl
    );

//Los objetos con sus respectivas propiedades.

// Ahora, creamos una nueva variable depositando esos objetos en un array.

let vendedorStorage = [Madera, Cuero, Acero, Gema, Pomo]

// Obtener los datos del localStorage
JSON.parse(localStorage.getItem("storageAPI")) || localStorage.setItem("storageAPI", JSON.stringify(vendedorStorage));


const tiendaObjetos = document.getElementById("lista1");
//Hacemos un for each para renderizar las imagenes de los objetos en el inicio.
vendedorStorage.forEach((item) =>{
    let objetos = document.createElement("button");
    objetos.id = `${item.id}`
    objetos.classList.add("claseDelBoton");
    objetos.innerHTML= `
    <img src="${item.imagen}" class="objetos ajustarImagen" alt="${item.nombre}">
    `;
    lista1.append(objetos);
});

//Esta funcion agrega la descripcion de los botones al centro inferior de la pantalla.

const visualizarObjetos = (id) => {
    let objeto = vendedorStorage.find(item => item.id == id);
    let infoObjeto = document.createElement("div");
    infoObjeto.innerHTML= `
    <h2 class = "tituloItem">${objeto.nombre}</h2>
    <p>Oro: ${objeto.valor}</p>
    <p>${objeto.descripcion}</p>
    `;
    ventanaInfo.append(infoObjeto);
}

//Pero, necesitamos de esta otra funcion, para que al hacer click, nos muestre la ventana descriptiva teniendo en cuenta que al boton que le hacemos click tenga el mismo ID que al objeto que hace referencia, luego ejecutamos la funcion de la descripcion, tambien, limpia la ventana para que no se solapen una detras de otra.

let clickInfo;
const mochila = [];
[...document.getElementsByClassName("claseDelBoton")].forEach((boton) => {
    boton.addEventListener('click', () => {
        ventanaInfo.innerHTML = ``;
        clickInfo = boton.id;
        visualizarObjetos(clickInfo);
    });
});
//Aqui, empezamos a identificar la lista 2, en donde iran los objetos comprados.

let botonCompra = document.querySelector("#botonCompra");

let lista2 = document.querySelector('#lista2');
    //Una vez que hacemos click en el boton de comprar, ahora nos abrira una ventana nueva en donde nos pedira confirmacion de compra.
botonCompra.addEventListener('click', () => {
    //Al hacer click en el boton de compra, tiene en cuenta que este depositado el mismo ID de donde hizo click al objeto-boton, para que pueda comprar el mismo objeto.
    let objeto = vendedorStorage.find(item => item.id == clickInfo);

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
    //Entonces ahora, una vez creada la nueva ventana, le agregamos un nuevo evento pero al boton de confirmar compra para que ejecute el resto del codigo.
    
    botonConfirmar.addEventListener('click', () => {

        mochila.push(objeto);
        vendedorStorage = vendedorStorage.filter(item => item.id != clickInfo);
        swal(`${objeto.nombre} se ha añadido a tu mochila`);
        let boton = document.getElementById(clickInfo);
        boton.parentNode.removeChild(boton);
        localStorage.setItem("tiendaVendedor", JSON.stringify(vendedorStorage));


        let objetoLista2 = document.createElement("button");
        objetoLista2.id = `${objeto.id}`
        objetoLista2.classList.add("claseDelBoton");
        objetoLista2.innerHTML= `
        <img src="${objeto.imagen}" class="objetos ajustarImagen" alt="${objeto.nombre}">
        `;
        lista2.append(objetoLista2);
    //Aca ejecutara este switch para mostrar el globo de texto cuando se compre un objeto
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

        // Añade el objeto comprado al localStorage
        localStorage.setItem("mochila", JSON.stringify(mochila));
        
        // Oculta la ventana cuando se da la compra terminada
        panelConfirmacion.style.display = 'none';
        //Agregue esto para que no se acumulen los div en el html
        panelConfirmacion.remove();
        
        //Limpia la pantalla cuando ya no hayan elementos.
        if (lista1.children.length === 0) {
            ventanaInfo.innerHTML = ``;
        }
        //Para despedirnos del mercader luego de que se quede sin objetos.
        if (vendedorStorage.length === 0) {
            setTimeout( () => {
                swal("Observas que ya no tiene mas que ofrecerte el anciano, pues es hora de seguir con tu aventura, debes dirigirte al pueblo.");
                globoTexto.innerText = "¡Vaya! Me quede sin mercancia, bueno, aqui se separan nuestros caminos, te deseo mucha suerte en tu camino viajero, enviale un saludo de mi parte al herrero!";
            }, 10000);
        }
    });
    // Evento de clic para el botón de cancelar
    botonRechazar.addEventListener('click', () => {
        // oculta la ventana cuando se ejecuta el rechazar
        panelConfirmacion.style.display = 'none';
    });
});
