const Tarea = require('./tarea');


class Tareas {

    _listado = {
        'abc': 123
    };

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        })

        return listado;
    }

    constructor (){

        this._listado = {};

    }

    borrarTarea( id = '' ){
        if (this._listado[id]){
            delete this._listado[id];
        }
       
    }

    cargarTareaFromArr ( tareas = [] ) {
    
        
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })

    }
        


    crearTarea(desc = ''){
        
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea

    }

    listadoCompleto (){
        
        console.log()
        
        this.listadoArr.forEach( (tarea, i) =>{

            const idx = ` ${i + 1}.`
            const { desc, completado } = tarea;
           
            const estado = (completado)
                ?'Completado'
                :'Pendiente'
            console.log(` ${idx} ${desc} :: ${estado}`)

        })
        

    }

    listarPendientesCompletadas (completadas = true ){
        console.log()

        let contador = 0;

        this.listadoArr.forEach((tarea, i) => {

            const { desc, completado } = tarea;

            const estado = (completado)
                ? 'Completado'
                : 'Pendiente'
            
            if (completadas) {
                if (completado){
                    contador += 1
                    console.log(` ${contador.toString()}. ${desc} :: ${completado}`)
                }
            } else {

                if (!completado) {
                    contador += 1
                    console.log(` ${contador.toString()}. ${desc} :: ${estado}`)
                }

            }


        })


    }

    toggleCompeltada(ids = []) {
        
        ids.forEach( id => {
            const tarea = this._listado[id];

            if (!tarea.completado){
                tarea.completado = new Date().toISOString()
            }
        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ){

                this._listado[tarea.id].completado = null;

            }

        });

    };


}

module.exports = Tareas;
