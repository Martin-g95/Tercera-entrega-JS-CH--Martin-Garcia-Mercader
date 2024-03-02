//Esto es un boton que permite encender y apagar la musica de la pagina, es musica de skyrim.
const miMusica = document.getElementById("miMusica");
const btnMusica = document.getElementById("btnMusica");

btnMusica.addEventListener("click", () => {
    if (miMusica.paused) {
        // Si la música está pausada,  se reproduce
        miMusica.play();
        // cambia la clase para que cambie el color a estar encendida
        btnMusica.classList.remove("apagado");
        btnMusica.classList.add("encendido");
    } else {
        // Si la música esta reproduciendose, se pausa
        miMusica.pause();
        // Cambia la clase para que cambie el color a estar apagada
        btnMusica.classList.remove("encendido");
        btnMusica.classList.add("apagado");
    }
});