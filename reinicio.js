//Esto permite a la naranja reiniciar la pagina y limpiar el localStorage, para que pueda ejecutarse otra vez el codigo.
document.getElementById("btnReiniciar").addEventListener("click", () => {
    // Borra el localStorage
    localStorage.clear();

    // Recarga la página
    location.reload();
});