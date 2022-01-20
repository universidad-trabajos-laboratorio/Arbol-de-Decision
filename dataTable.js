

const tabla1 = {
    fields: ['CLIMA', 'TEMPERATURA', 'HUMEDAD', 'VIENTOS', 'PASEAR'],
    optionsObject: ["si", "no"],
    nameFieldObjective: "PASEAR",
    register: [
        ['lluvioso', 'caliente', 'alta', 'false', 'no'],
        ['lluvioso', 'caliente', 'alta', 'true', 'no'],
        ['nublado', 'caliente', 'alta', 'false', 'si'],
        ['soleado', 'templado', 'alta', 'false', 'si'],
        ['soleado', 'frio', 'normal', 'false', 'si'],
        ['soleado', 'frio', 'normal', 'true', 'no'],
        ['nublado', 'frio', 'normal', 'true', 'si'],
        ['lluvioso', 'templado', 'alta', 'false', 'no'],
        ['lluvioso', 'frio', 'normal', 'false', 'si'],
        ['soleado', 'templado', 'normal', 'false', 'si'],
        ['lluvioso', 'templado', 'normal', 'true', 'si'],
        ['nublado', 'templado', 'alta', 'true', 'si'],
        ['nublado', 'caliente', 'normal', 'false', 'si'],
        ['soleado', 'templado', 'alta', 'true', 'no'],

    ]
}


const tabla2 = {
    fields: ['PRESION_ARTERIAL', 'UREA_EN_SANGRE', 'GOTA', 'HIPOTIROIDISMO', 'ADMINISTRAR_TRATAMIENTO'],
    optionsObject: ["false", "true"],
    nameFieldObjective: "ADMINISTRAR_TRATAMIENTO",
    register: [
        ['alta', 'alta', 'true', 'false', 'false'],
        ['alta', 'alta', 'true', 'true', 'false'],
        ['normal', 'alta', 'true', 'false', 'true'],
        ['baja', 'normal', 'true', 'false', 'true'],
        ['baja', 'baja', 'false', 'false', 'true'],
        ['baja', 'baja', 'false', 'true', 'false'],
        ['normal', 'baja', 'false', 'true', 'true'],
        ['alta', 'normal', 'true', 'false', 'false'],
        ['alta', 'baja', 'false', 'false', 'true'],
        ['baja', 'normal', 'false', 'false', 'true'],
        ['alta', 'normal', 'false', 'true', 'true'],
        ['normal', 'normal', 'true', 'true', 'true'],
        ['normal', 'alta', 'false', 'false', 'true'],
        ['baja', 'normal', 'true', 'true', 'false'],

    ]
}

const data = tabla1;
let fields = data.fields;
const optionsObject = data.optionsObject;
const nameFieldObjective = data.nameFieldObjective
const register = data.register;

export { fields, register, optionsObject, nameFieldObjective };