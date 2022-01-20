import  {fields,register} from './dataTable.js';

const evaluateRegister = (register, fields) => {

    
    register.forEach(row => {
    
        if (row.length != fields.length) {
           
            throw new Error('El numero de elementos agregados no concuerda con numero de campos');
        }
    });
    return register;
}

 class Table {
    fields = [];
    rows = [];

    constructor(...fields) {
        this.fields = fields;
    }
    addRegister(register) {
        this.rows.push(...evaluateRegister(register, this.fields));
    }

}


let dataFrame = new Table(...fields);


dataFrame.addRegister(register);

export default Table;
export {dataFrame};




