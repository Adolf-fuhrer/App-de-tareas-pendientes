const inquirer = require('inquirer');
const { validate } = require('uuid');
const Tareas = require('../models/tareas');


const preguntas = [
    {
        type: 'list',
        name:'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'}. Crear tarea`
            },
      
            {
                value: '2',
                name:  `${'2'}. Listar tareas`
        
            },

            {
                value: '3',
                name: `${'3'}. Listar tareas completada`
            },

            {
                value: '4',
                name: `${'4'}. Listar tareas pendientes`
            },

            {
                value: '5',
                name: `${'5'}. Completar tarea(s)`
            },

            {
                value: '6',
                name: `${'6'}. Borrar una tarea`
            },

            {
                value: '0',
                name: `${'0'}. Salir`
            }
        ]
    }
]


const inquirerMenu = async() => {
    console.clear();
    console.log('<=======================>');
    console.log('  Seleccione una Opcion');
    console.log('<=======================>\n');

    const {opcion} = await inquirer.prompt(preguntas)

    return opcion;

}

const inputs = [{
    type: 'input',
    name: ' ',
    message: `Presione ${'Enter'} para continuar`

}]

const pausa = async() =>{
    console.log('\n')
    const input = await inquirer.prompt(inputs)
    
    return input;
}

const leerInput = async(message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                
                if(value.length === 0){

                    return 'Por favor ingrese un valor';

                }

                return true;
                
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;

}
const borrarTareas = async( tareas = [] ) => {

    const choices = tareas.map((tarea, i) => {
        
        const idx = `${i + 1}.`;
        
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
        
    });
    
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const preguntas= [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    
    const { id } = await inquirer.prompt(preguntas);
    return id;

};

const confirmar = async (message) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const completarTarea = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completado) ? true : false
        };

    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccine',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    borrarTareas,
    confirmar,
    completarTarea
};