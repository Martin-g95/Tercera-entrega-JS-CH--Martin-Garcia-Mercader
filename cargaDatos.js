
const obtencionDatosAPI = async () => {
    try {
        const rutaDatos = './data/objetos.json'; 
        const respuesta = await fetch(rutaDatos);

    if (!respuesta.ok) {
        throw new Error('Error al obtener datos desde la API');
    }
        const datosAPI = await respuesta.json();
        //Colocamos esos datos de la API local en localStorage
        localStorage.setItem('storageAPI', JSON.stringify(datosAPI));
        
        return datosAPI;
    } catch (error) {
        console.error('Error al obtener datos:', error.message);
        return null;
    }
};

obtencionDatosAPI()
.then((datos) => {
    if (datos) {
    console.log('Datos obtenidos desde la API:', datos);
} else {
    console.log('No se pudieron obtener los datos desde la API.');
}
})
.catch((error) => {
    console.error('Error general:', error.message);
});
