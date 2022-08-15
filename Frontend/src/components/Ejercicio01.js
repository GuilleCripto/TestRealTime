import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';




const isMultiple = (valor) => {
    
    if ((valor % 3 == 0 && valor > 2) && (valor % 5 == 0 && valor > 4)) {
        return "VINCLE";
    }
    else if (valor % 3 == 0 && valor > 2)  {
            return "VIN";
    }
    else if (valor % 5 == 0 && valor > 4)
        {
            return "CLE";
    }
    
    else {
        return "No es Multiplo";
    }

}


function getData(n) {
    const data = [];
    for (let i = 1; i <= n; i++) {
      var multiple = isMultiple(i);
      if (multiple === "VIN" || multiple === "CLE" || multiple === "VINCLE" ) {
        data.push({ id: i, multiple: multiple });
      }
      
    }
    return data;
}

const data = getData(100);

const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0">Escribe, en el lenguaje de programación que desees, un programa que muestre
en pantalla los números del 1 al 100, sustituyendo los múltiplos de 3 por el
palabro “VIN” y, a su vez, los múltiplos de 5 por “CLE”. Para los casos que, al
tiempo, son múltiplos de 3 y 5, utiliza el combinado “VINCLE”.</h5>
    </div>
);

const Ejercicio01 = () => {
    return (
        <div> 
            <DataTable value={data}    dataKey="id" responsiveLayout="scroll" paginator rows={10} header={header} >
                <Column field="id" header="Número "  headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                <Column field="multiple"  header="Palabra"  headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>

            </DataTable>
        </div>
    );
};

export default Ejercicio01;
