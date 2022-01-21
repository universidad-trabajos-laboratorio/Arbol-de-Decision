import Table, { dataFrame} from './tabla.js';
import {optionsObject,nameFieldObjective} from './dataTable.js';



function countValuesField(dataFrame, nameField, nameFielObjective, optionsObject) {
    let pos = dataFrame.fields.indexOf(nameField);
    let posObjective = dataFrame.fields.indexOf(nameFielObjective);

    let posibleOptions = [];
    let dataResult = {};

    dataFrame.rows.forEach(value => {
        if (nameField != nameFielObjective) {
            let option = value[pos];

            if (!posibleOptions.includes(option)) {
                dataResult[option] = dataResult[option] || {};
                dataResult[option][optionsObject[0]] = 0;
                dataResult[option][optionsObject[1]] = 0;
                posibleOptions.push(option);
                dataResult[option].sum = 0;

            }
            if (value[posObjective] == optionsObject[0] || value[posObjective] == optionsObject[1]) {
                dataResult[option][value[posObjective]] += 1;
                dataResult[option].sum++;
            }
        } else {
            let opcion = nameFielObjective;
            if (!posibleOptions.includes(opcion)) {
                posibleOptions.push(opcion);
                dataResult[opcion] = dataResult[opcion] || {};
                dataResult[opcion][optionsObject[0]] = 0;
                dataResult[opcion][optionsObject[1]] = 0;
                dataResult[opcion].sum = 0;
            }
            if (value[posObjective] == optionsObject[0] || value[posObjective] == optionsObject[1]) {
                dataResult[opcion][value[posObjective]] += 1;
                dataResult[opcion].sum++;
            }

        }

    })

    for (let option in dataResult) {
        dataResult[option].p = dataResult[option].sum / dataFrame.rows.length;
    }

    let result = {};
    result.name = nameField;
    result.options = posibleOptions;
    result.optionsCount = dataResult;
    return result;
}

function calculeEntropy(num1, total) {
    const x = num1 / total;
    const result = -(x) * Math.log2(x);
    return result;
}
function calculeEntropyBinary(num1, num2) {
    if (num1 == 0 || num2 == 0) {
        return 0;
    }
    const total = num1 + num2;
    const firstEntropy = calculeEntropy(num1, total);
    const secondEntropy = calculeEntropy(num2, total);
    const entropyBinary = firstEntropy + secondEntropy;
    return entropyBinary;
}

function calculateEntropyAttribute(field) {
    let result = 0;
    field.options.forEach(value => {
        const countA = field.optionsCount[value][optionsObject[0]];
        const countB = field.optionsCount[value][optionsObject[1]];
        
        const entropyBunary = calculeEntropyBinary(countA, countB);
        console.log(`Entropía ${value}=> [${countA},${countB}]=-(${countA}⁄${countA + countB})  log_2⁡(${countA}⁄${countA + countB})-(${countB}⁄${countA + countB})  log_2⁡(${countB}⁄${countA + countB})=${entropyBunary}`)
        const aux = field.optionsCount[value]['p'] * entropyBunary;
        result += aux;
    })
    return result;
}

function calculaGanancia(dataFrame, fieldName) {
    const system = countValuesField(dataFrame, nameFieldObjective,nameFieldObjective,optionsObject);
    const field = countValuesField(dataFrame, fieldName,nameFieldObjective,optionsObject);

    console.log("ENTROPIA DEL SISTEMA")
    const systemValue = calculateEntropyAttribute(system);
    console.log("\n-------------"+field.name+"-------------\n")
    const entropyValue = calculateEntropyAttribute(field);

    const result = systemValue - entropyValue;

    console.log(`ganancia(${field.name}) => ${result}`)
    return result;
}

const ganancias = {};

function maxGain(dataFrame) {
    const fieldGain = {}

    for (let field of dataFrame.fields) {
        fieldGain[field] = calculaGanancia(dataFrame, field);
    }

    let max = { name: false, value: 0 };

    for (let gain in fieldGain) {
        if (fieldGain[gain] >= max.value) {
            max = {
                name: gain,
                value: fieldGain[gain]
            }
        }
    }
    ganancias[max.name] = max.value;
    console.log("MAXIMOOOO!!")
    console.log(max);
    return max;
    
}


function obtenerNuevasTablas(dataFrame, nameField = "") {
    const pos = dataFrame.fields.indexOf(nameField);
    let newContentTable = dataFrame.rows.map(value => [...value]);
    let opciones = [];
    let tablas = {};
    
    let camposNuevos = [...dataFrame.fields];

    if (pos != -1) {

        camposNuevos.splice(pos, 1);

        for (let nu of newContentTable) {
            if (!opciones.includes(nu[pos])) { opciones.push(nu[pos]) }
        }
     
        for (let op of opciones) {
            let registros = newContentTable.filter(value => value[pos] == op).map(value=>[...value])

            if (pos != -1) {
                for (let registro of registros) {
                   
                    registro.splice(pos, 1);
                  
                }
            }

            const tableNew = new Table(...camposNuevos);
            tableNew.addRegister(registros)
            tablas[op] = tableNew;
        }
    } else {

        opciones.push('principal');
        for (let op of opciones) {
            let registros = newContentTable.filter(value => true)
            const tableNew = new Table(...camposNuevos);
            tableNew.addRegister(registros)
            tablas[op] = tableNew;
        }
    }


console.log("TABLASSSSSSSSSSSSS")
    console.log(tablas)
    return tablas;
}


const objetos = [];

function obtenerObjestosPreparacion(tablas) {
    for (let tabla in tablas) {
        const maxG2 = maxGain(tablas[tabla]);
       
        const tablas2 = obtenerNuevasTablas(tablas[tabla], maxG2.name);

        objetos.push({
            opcion: tabla,
            campo: maxG2.name,
            opciones: [...Object.keys(tablas2)]
        })

        if (maxG2.value != 0) {
            obtenerObjestosPreparacion(tablas2);
        }
    }
    return objetos;
}






obtenerObjestosPreparacion(obtenerNuevasTablas(dataFrame));




class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.hijos = [];
    }
    addHijo(nodo) {
        this.hijos.push(nodo);
    }
}







function crearNodos(opcion) {
    const objOpcion = objetos.filter(value=>value.opcion==opcion)[0];
    const nodoPadre = new Nodo(objOpcion.opcion);

    const nodoHijo = new Nodo(objOpcion.campo);
    if(objOpcion.opciones.length>1){
        for(let op of objOpcion.opciones){
            nodoHijo.addHijo(crearNodos(op));
        }
        nodoPadre.addHijo(nodoHijo);
    }else{
        nodoPadre.addHijo(new Nodo(objOpcion.opciones[0]));  
    }
    
    return nodoPadre;
}



const nodos = crearNodos('principal');
console.log("FINAAAAAAAAAAL");
console.log(nodos);



function crearHoja(nombre){
    let rama = `<div class="hoja sola"><h3>${nombre}</h3></div>`

    if(ganancias[nombre]){
        rama = `<div class="hoja"><h3>${nombre}</h3><span>Ganancia: ${ganancias[nombre]}</span></div>`
    }
    return rama;
}
function crearRamaSinHijos(nombre){
    const rama = `<div class="rama final">${crearHoja(nombre)}</div>`
    return rama;
}
function crearRamaConHijos(nombre,arbol){
    const rama = `<div class="rama">${crearHoja(nombre)}${crearArbol(arbol)}</div>`
    return rama;
}
function crearArbol(ramas){
    const arbol = `<div class="arbol">${ramas}</div>`;
    return arbol;
}


function recorrerNodos(nodo){
    let rama;
    if(nodo.hijos.length!=0){      
        let hijos = ``;
        nodo.hijos.forEach(value=>{
            hijos+=recorrerNodos(value)
        })
        rama = crearRamaConHijos(nodo.valor,hijos); 
    }else{
        rama = crearRamaSinHijos(nodo.valor);  
    }
    return rama;
}
recorrerNodos(nodos.hijos[0]);

const container = document.getElementById('container');
container.innerHTML = crearArbol(recorrerNodos(nodos.hijos[0]));
