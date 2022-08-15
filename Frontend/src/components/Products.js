import React, {useEffect, useState, useRef} from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { InputSwitch } from 'primereact/inputswitch';
import { SelectButton } from 'primereact/selectbutton';


//sockets 
import SockJsClient from 'react-stomp';



//fin sockets


import { Column } from 'primereact/column';
import {Button} from 'primereact/button';


import {
    actionCreators as productsActions,
    actionDeletes as productsActionsDeletes,
    actionEdit as productsActionsEdit,

    selector as productsSelector,
  } from './features/products';
import { NowIndicatorRoot } from '@fullcalendar/core';

  let data =  [
    {"id": "1000"},

    ]

    const getHoras = ()  =>  {
        console.log("get Horas")
        var time = new Date();
    /*    console.log("Horas", time.getHours())
        console.log("Minutos", time.getMinutes())
        console.log("Segundos", time.getSeconds())*/
        const horas = time.getHours() +":" + time.getMinutes() + ":" + time.getSeconds();
        console.log("This is horas", horas)
        return  horas;
    }

const Products = () => {
    let emptyProduct = {
        id: null,
        nombre: '',
        tipoProducto: null,
        caracteristica: "false",
        capacidad: "100",
        envace: 'botella',
        hora: getHoras(),
        estado: 'CREATED'
    };
    const selectButtonValues1 = [
        { name: 'Botella', code: '1' },
        { name: 'Cajas', code: '2' },
    ];
    const messageInit = {
        id: 1,
        message :"guille"
     }
    const [message, setMessage] = useState(messageInit);
    const SOCKET_URL = 'http://3.142.90.162:8080/ws';

    let { products} = useSelector((state) => productsSelector(state));
    const dispatch = useDispatch();

    let emptyModelProduct = {
      diameterSessionId: null,
      diameterOriginHost: ''

  };

    const [switchValue, setSwitchValue] = useState(false);

    const [count, setCount] = useState(0);
    const [dataSession,setDataSession] = useState();
    const [modelProduct, setModelProduct] = useState(emptyModelProduct);
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState("GxSession");

    const [productds, setProductds] = useState(products);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [selectButtonValue1, setSelectButtonValue1] = useState(null);



     useEffect(() => {
        console.log("Inicio de UseEffect", count)
    
        if (count ===0 ) {
            setCount(previousCount => previousCount + 1)
            dispatch(productsActions.list(dataSession))
        }
    
      }, [count])
  


      const { register, formState: { errors }, handleSubmit } = useForm();

      const onSubmit = (dataSession) => {
        console.log("This is on submit.....", dataSession)
        dispatch(productsActionsDeletes.deletes(dataSession))
        setDataSession(dataSession);
        setCount(1);
      
      }

      const onSubmitSave = (dataSession) => {
        dispatch(productsActionsEdit.edit(dataSession))
        setDataSession(dataSession);
        setCount(1);
      
      }

    
      const actionTemplate = (rowData) => {
        return <div>
            <Button type="button" icon="pi pi-eye" className="p-button-rounded p-button-success mr-2" onClick={() => editGxRxSession(rowData.data)} ></Button>
        </div>;
      }


    const dateTemplate = (rowData, column) => {
        console.log("hora ======> ", rowData.hora )
      if (!rowData.hora ) {
         return null;
      }
      else{
        var time = new Date(rowData.hora);
        //new Date(dateString).toLocaleDateString(undefined, options)
        return time.getHours() +":" + time.getMinutes()+":" + time.getSeconds();
      }
      
    }


    const editGxRxSession = (modelProduct) => {
       // const valueTitle = modelGxSession.ratType === undefined ? "RxSession" : "GxSession"
        setTitle("valueTitle" );
        setModelProduct({...modelProduct});
        setShow(true);
    }

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        console.log("this is message", msg)
        setMessage(msg);
        setCount(0);
       
    }

    //templates
    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    }
    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Nombre</span>
                {rowData.nombre}
            </>
        );
    }
    const tipoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Tipo/Producto</span>
                {rowData.tipoProducto}
            </>
        );
    }
    const caraBodyTemplate = (rowData) => {
        let caract = "No Precisa Nevera"
        if (rowData.caracteristica === "true") {
            caract = "Precisa Nevera"
        }

        return (
            <>
                <span className="p-column-title">Caracteristicas</span>
                {caract}
            </>
        );
    }
    const capaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Capacidad</span>
                {rowData.capacidad}
            </>
        );
    }
    const envaseBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Envase</span>
                {rowData.envace}
            </>
        );
    }   
    const horaBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Hora</span>
                {rowData.hora}
            </>
        );
    }   

    const estadoBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Estado</span>
                {rowData.estado}
            </>
        );
    }   



    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteProduct(rowData)} />
            </div>
        );
    }



    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>

            </React.Fragment>
        )
    }

    //Fin templates 

    //action
    const openNew = () => {
        setProduct(emptyProduct);
        console.log(product)
        setSubmitted(false);
        setProductDialog(true);
    }

    const onInputChange = (e) => {

        const key = e.target.name;
        const value = e.target.value;

   //     const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[key] = value;
        setProduct(_product);
    }

    const onInputChangeSwitch = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        let _product = { ...product };
        _product[key] = value;
        setSwitchValue(e.value)
        setProduct(_product);
    }

    const onInputChangeEnvace = (e) => {
        console.log(e.value.name)
        const key = e.target.name;
        const value = e.target.value;
        let _product = { ...product };
        _product[key] = value.name;
        setSelectButtonValue1(e.value)
        setProduct(_product);
    }

     //


 

    const editProduct = (product) => {
            setProduct({ ...product });
            setProductDialog(true);
        
    }
    const saveProduct = () => {

        setSubmitted(false);
        console.log(product)
        if (product.nombre.trim() && (product.capacidad === "1000" || product.capacidad === "100"  ) &&
           product.tipoProducto !== null ) {
            product.hora = null;
            console.log("This is to product", product)
            onSubmitSave(product);
            setProductDialog(false);
            setProduct(emptyProduct);
            setSubmitted(true);
        }
        else {
            toast.current.show({ severity: 'error', summary: 'Error ', detail: 'information is requerid ', life: 3000 });
        }


    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const hideDialog = () => {
        console.log("Hide Dialog")
        setSubmitted(false);
        setProductDialog(false);
    }

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </>
    );
    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {

       let _products = products.dataList.filter(val => val.id !== product.id);
        products.dataList = _products;
        onSubmit(product);
        setProduct(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const hideDeleteProductDialog = () => {
        console.log("Option is Not ")
        setDeleteProductDialog(false);  
    }
    //fin Actions

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </>
    );



    return (
 

        <div>
            <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/message']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            
            </div>
            <div className="card">
                <Toast ref={toast} />
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable value={products.dataList} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}  dataKey="id" responsiveLayout="scroll" paginator rows={10} header={header} globalFilter={globalFilter}>
                    <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                    <Column field="nombre" header="Nombre" sortable body={nameBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                    <Column field="caracteristica" header="Caracteristicas" sortable body={caraBodyTemplate} headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                    <Column field="tipoProducto" header="Tipo" sortable body={tipoBodyTemplate} headerStyle={{ width: '5%', minWidth: '10rem' }}></Column>
                    <Column field="capacidad" header="Capacidad" sortable body={capaBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                    <Column field="envase" header="Envase" sortable body={envaseBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                    <Column field="hora" header="Hora" sortable body={dateTemplate}  headerStyle={{ width: '10%', minWidth: '10rem' }}></Column>
                    <Column field="Estado" header="Estado" sortable body={estadoBodyTemplate}  headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                    <Column body={actionBodyTemplate}></Column>
                </DataTable>


                <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                    
                        <div className="field">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" name ="nombre" value={product.nombre} onChange={(e) => onInputChange(e)} required autoFocus className={classNames({ 'p-invalid': !product.nombre })} />
                            {!product.nombre && <small className="p-invalid">Nombre is required.</small>}
                        </div>


                        <div className="field">
                            <label className="mb-3">Tipo Producto</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="tipoProducto" value="bebida" onChange={(e) => onInputChange(e)} checked={product.tipoProducto === 'bebida'} />
                                    <label htmlFor="category1">Bebidas</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="tipoProducto" value="comida" onChange={(e) => onInputChange(e)} checked={product.tipoProducto === 'comida'} />
                                    <label htmlFor="category2">Comidas</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="tipoProducto" value="salsa" onChange={(e) => onInputChange(e)} checked={product.tipoProducto === 'salsa'} />
                                    <label htmlFor="category3">Salsas</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="tipoProducto" value="especies" onChange={(e) => onInputChange(e)} checked={product.tipoProducto === 'especies'} />
                                    <label htmlFor="category4">Especies</label>
                                </div>
                                {!product.tipoProducto && <small className="p-invalid">tipoProductos is required.</small>}
                            </div>
                        </div>

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="price">Precisa Nevera</label>
                                <InputSwitch name="caracteristica" checked={switchValue} onChange={(e) => onInputChangeSwitch(e)} />
                            </div>
                            <div className="field col">
                                <label htmlFor="capacidad">Capacidad</label>
                                <InputText id="capacidad" name="capacidad"  value={product.capacidad} onValueChange={(e) => onInputChange(e)} integeronly />
                                {!product.capacidad && <small className="p-invalid">Capacidad is required.</small>}
                            </div>
                            <div className="field col">
                                <label htmlFor="hora">Hora</label>
                                <InputText id="hora" value={product.hora} />
                            </div>
                        </div>

                        <div className="card" style={{ border: '1px solid blue'}}>

                            <h5>Envase</h5>
                            <SelectButton name="envace" value={selectButtonValue1}  onChange={(e) => onInputChangeEnvace(e)} options={selectButtonValues1} optionLabel="name" />

                        </div>


                    </Dialog>


                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete <b>{product.nombre    }</b>?</span>}
                        </div>
                </Dialog>
            </div>


        </div>




 
  );


}

export default Products;