const inquirer = require('inquirer')


const mostrarMenu = () =>{
    console.clear();
    
    return new Promise ((resolve) => {
        
        console.log('<======================>');
        console.log('Seleccione una Opcion');
        console.log('<======================>\n');

        console.log(`${'1.'} Crear tarea`);
        console.log(`${'2.'} Listar tareas`);
        console.log(`${'3.'} Listar tareas completadas`);
        console.log(`${'4.'} Listar tareas pendientes`);
        console.log(`${'5.'} Completar tarea`);
        console.log(`${'6.'} Borrar tarea`);
        console.log(`${'0.'} Salir\n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Seleccione una opcion: ', (opt) => {
            readline.close();

            resolve(opt);
        })

    });
    
}    

    

const pausa = () => {

    return new Promise ((resolve) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPresione ${'ENTER'} para continuar\n`, (opt) => {
            readline.close();

            resolve();
        })

    })

}

module.exports = {
    mostrarMenu,
    pausa
};
