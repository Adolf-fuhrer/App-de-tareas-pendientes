require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    
    inquirerMenu, 
    pausa,
    leerInput,
    borrarTareas,
    confirmar,
    completarTarea

} = require('./helpers/inquirer');

const Tareas = require('./models/tareas');



const main = async() =>{


    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){

        tareas.cargarTareaFromArr(tareasDB);

    }

    do {
        //Imprime el menu

        opt = await inquirerMenu();

        switch (opt) {
            
            case '1': // Crear Tarea
                const desc = await leerInput('Descipcion');
                tareas.crearTarea( desc );
            break;
            
            case '2': //Listar Tareas
                //console.log(tareas.listadoArr);
                tareas.listadoCompleto();
            break;

            case '3': //Listar tareas completadas
                tareas.listarPendientesCompletadas(true);
            break;
            
            case '4': //Listar tareas pendientes
                tareas.listarPendientesCompletadas(false);
            break;
            
            case '5':

                const ids = await completarTarea(tareas.listadoArr);
                tareas.toggleCompeltada(ids);

            break;

            case '6': //Borrar tareas

                const id = await borrarTareas(tareas.listadoArr);

                if (id !== '0'){
                    
                    const ok = await confirmar('¿Estas seguro?');
                    if (ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }

            break;
        }
            

        guardarDB( tareas.listadoArr );

        await pausa(); 

        
    } while (opt != '0') {
        
    
    };

    

};

main();




