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
//Los objetos con sus respectivas propiedades.
const Madera = new Objetos(1,"Madera", 10, "Es fuerte, es firme y tiene un aroma suave, supongo que sera madera elfica, los humanos no son tan detallistas...", "https://cdn-icons-png.flaticon.com/512/3275/3275748.png");

const Acero = new Objetos(2,"Acero", 20, "Acero reluciente en donde puedes ver incluso tu reflejo, obra de un habil fundidor", "https://th.bing.com/th/id/OIP.RpJgoDZPxRivIaaWgrlS9wAAAA?rs=1&pid=ImgDetMain");

const Cuero = new Objetos(3,"Cuero", 5, "Cuero de un animal que rara vez se encuentra por los bosques, material muy resistente.", "https://th.bing.com/th/id/OIP.nTeDpEx0m_u9-mtD32BEXQHaHa?rs=1&pid=ImgDetMain");

const Gema = new Objetos(4,"Gema", 10,"Una gema roja que cuando la observas fijamente por unos segundos puedes ver que en el centro hay una pequeña flama bailando.", "https://th.bing.com/th/id/OIP.aI5jR1yQBvW6xPXIohye-QAAAA?rs=1&pid=ImgDetMain");

const Pomo = new Objetos(5,"Pomo", 7,"Un pomo. No querras que se te caiga el arma de las manos al primer golpe, ¿verdad?.", "https://static.vecteezy.com/system/resources/previews/000/356/917/original/plumb-bob-vector-icon.jpg");


let vendedorStorage = [Madera, Acero, Cuero, Gema, Pomo];
//Colocamos los objetos en el storage
JSON.parse(localStorage.getItem("tiendaVendedor")) || localStorage.setItem("tiendaVendedor", JSON.stringify(vendedorStorage));
let tiendaVendedor = localStorage.getItem("vendedorStorage");

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
    //Al hacer click en el boton de compra, tiene en cuenta que este depositado el mismo ID de donde hizo click al objeto-boton, para que pueda compraqr el mismo objeto.
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
