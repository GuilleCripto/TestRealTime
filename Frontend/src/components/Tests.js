import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import {
  actionLote as productsActionsLote,
  selector as productsSelector,
} from './features/products';

//sockets 
import SockJsClient from 'react-stomp';

const Tests = () => {

  let emptyProduct = {
    id: null,
    nombre: '',
    tipoProducto: null,
    caracteristica: "false",
    capacidad: "100",
    envace: 'botella',
    hora: null,
    estado: 'CREATED'
  };

  const messageInit = {
    id: 1,
    message :"guille"
  }

  const [count, setCount] = useState(10000);
  const [loading , setLoading] = useState(false);
  let [products1, setProducts1] = useState(emptyProduct);
  const [dataSession,setDataSession] = useState();
  //const [product, setProduct] = useState(emptyProduct);
  const dispatch = useDispatch();

  let { products } = useSelector((state) => productsSelector(state));
  let [product, setProduct] = useState(emptyProduct);


  const { register, formState: { errors }, handleSubmit } = useForm();
  const [message, setMessage] = useState(messageInit);
  const SOCKET_URL = 'http://3.142.90.162:8080/ws';

  useEffect(() => {
    console.log("this loading", products)
    
  //  console.log("User efect", product)
    if (count ===1) {
      setCount(previousCount => previousCount + 1)
      dispatch(productsActionsLote.lote(dataSession))
      setLoading(true);

   }
    
  }, [count])

  const especies = ["bebida", "comida", "salsa", "especies"]

  const onSubmit = (dataSession) => {
    //console.log("This is session", dataSession)
    setDataSession(dataSession);
   // setProduct(emptyProduct);
   /* let especie = 0
    let envaces = "botella"

    for (let index = 0; index < dataSession.valueOfFind; index++) {
       let _product = {};
      _product.nombre = "Product number "+index;
      _product.tipoProducto = especies[especie];
      _product.caracteristica = Math.random() < 0.5;
      
      _product.envace = _product.caracteristica  ? "botella" : "cajas";
      _product.capacidad = _product.caracteristica  ? "100" : "1000";
  
      especie = especie+1;
      if (especie > 3 ) {
          especie =0;
      }
     // console.log("this index", index)

      setProduct(_product);*/

   
      setLoading(false)
      setCount(1)
     
     
    //  onSubmitSave(_product);
    //  sleep(1000000);
      
    
  
  }

 
  const onSubmitSave = (dataSession) => {
    console.log("this product in save....", dataSession)
    setDataSession(dataSession);
  //  dispatch(productsActionsEdit.edit(dataSession))
  //  setProduct(product);
    setCount(1);
  
  }


  return (
    <div>
        
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
          <div >
              <div >	
              <div className="row">
                   <div className="col-sm-4" >
        
                          <Form.Select {...register("type")}>
                              <option value="Insert">Insert</option>
                              <option value="Update">Update</option>
                              <option value="Delete">Delete</option>

                           </Form.Select>

                    </div>
                    <div className="col-sm-4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                       <Form.Control {...register("valueOfFind", { required: true })}  type="text" placeholder=""  isInvalid={!!errors.valueOfFind}/>
                       <Form.Control.Feedback type="invalid">
                        Please choose an option.
                      </Form.Control.Feedback>
                    </Form.Group>


                    </div>

                    <div className="col-sm-4">
                 
                        <button type="submit" className="subscribe btn btn-primary btn-block rounded-pill shadow-sm"> Confirm  </button>
                
                    </div>

              </div>
              <div className="row">
              <div className="col-sm-4">
              <br></br>
                        <Form.Text type="hide" >  </Form.Text>
                
              </div>
              </div>

              
            </div>
          </div>
      </form>
    </div>

    <div>

    {products.isLoading &&
        <>
            <ProgressSpinner />
        </>
    }
       
    </div>

  

    </div>
  )
};

export default Tests;
