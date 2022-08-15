import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { classNames } from 'primereact/utils';





const data = [

    {id: 1, tecnologia : "java", noConozco: 0, loConozco: 0, administrado: 0, experto : 1},
    {id: 2, tecnologia : "Java spring framework", noConozco: 0, loConozco: 0, administrado: 0, experto : 1},
    {id: 3, tecnologia : "Java springcloud", noConozco: 0, loConozco: 2, administrado: 0, experto : 0},
    {id: 4, tecnologia : "Java springboot", noConozco: 0, loConozco: 0, administrado: 0, experto : 1},
    {id: 5, tecnologia : "SQL", noConozco: 0, loConozco: 0, administrado: 0, experto : 1},
    {id: 6, tecnologia : "API restful", noConozco: 0, loConozco: 0, administrado: 0, experto : 1},
    {id: 7, tecnologia : "Diseño api openapi", noConozco: 0, loConozco: 1, administrado: 0, experto : 0},
    {id: 8, tecnologia : "Golang", noConozco: 1, loConozco: 0, administrado: 0, experto : 0},
    {id: 9, tecnologia : "python", noConozco: 0, loConozco: 1, administrado: 0, experto : 0},
    {id: 10, tecnologia : "Unit Testing", noConozco: 0, loConozco: 0, administrado: 1, experto : 0},
    {id: 11, tecnologia : "End to End testing", noConozco: 0, loConozco: 1, administrado: 0, experto : 0},
    {id: 12, tecnologia : "VCS (GIT)", noConozco: 0, loConozco: 0, administrado: 1, experto : 0},
    {id: 13, tecnologia : "Docker", noConozco: 0, loConozco: 1, administrado: 0, experto : 0},
    {id: 14, tecnologia : "Kubernetes", noConozco: 1, loConozco: 0, administrado: 0, experto : 0},
    {id: 15, tecnologia : "NoSQL (MongoDB)", noConozco: 0, loConozco: 0, administrado: 1, experto : 0},
    {id: 16, tecnologia : "ElasticSearch", noConozco: 1, loConozco: 0, administrado: 0, experto : 0},
]

const NoConozcoBodyTemplate = (rowData) => {
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.noConozco, '': !rowData.noConozco })}></i>;
}
const LoConozcoBodyTemplate = (rowData) => {
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.loConozco, '': !rowData.loConozco })}></i>;
}

const AdministradoBodyTemplate = (rowData) => {
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.administrado, '': !rowData.administrado })}></i>;
}

const ExpertoBodyTemplate = (rowData) => {
    return <i className={classNames('pi', { 'text-green-500 pi-check-circle': rowData.experto, '': !rowData.experto })}></i>;
}





const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
        <h5 className="m-0"> Indica Tu experiencia/conocimiento sobre las siguientes Tecnologia, servicios, entornos.</h5>
    </div>
);

const Cuestionario = () => {
    return (
        <div> 
            <DataTable value={data}    dataKey="id" responsiveLayout="scroll" paginator rows={20} header={header} >
                <Column field="id" header="Id"  headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                <Column field="tecnologia"  header="Tecnologuia"  headerStyle={{ width: '15%', minWidth: '10rem' }}></Column>
                <Column field="NoConozco" header="No Conozco"  headerStyle={{ width: '10%', minWidth: '10rem' }} dataType="boolean"   body={NoConozcoBodyTemplate}  />
                <Column field="loConozco" header="Lo Conozco"  headerStyle={{ width: '10%', minWidth: '10rem' }} dataType="boolean"   body={LoConozcoBodyTemplate}  />
                <Column field="administrado" header="administrado"  headerStyle={{ width: '10%', minWidth: '10rem' }} dataType="boolean"   body={AdministradoBodyTemplate}  />
                <Column field="experto" header="Soy Experto"  headerStyle={{ width: '10%', minWidth: '10rem' }} dataType="boolean"   body={ExpertoBodyTemplate}  />
            </DataTable>
        </div>
    );
};

export default Cuestionario;
