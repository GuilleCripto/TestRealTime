import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import { TreeTable } from 'primereact/treetable';


import { Column } from 'primereact/column';
import {Button} from 'primereact/button';
import Form from 'react-bootstrap/Form';


import {
    actionCreators as gxSessionsActions,
    selector as gxSessionsSelector,
  } from './features/gxSessions';
import EditGxRxSession from '../pages/EditGxRxSession';

const GxSessions = () => {

    const { gxSessions } = useSelector((state) => gxSessionsSelector(state));
    const dispatch = useDispatch();

    let emptyModelGxSession = {
      diameterSessionId: null,
      diameterOriginHost: ''

  };

    const [count, setCount] = useState(0);
    const [dataSession,setDataSession] = useState();
    const [modelGxSession, setModelGxSession] = useState(emptyModelGxSession);
    const [show, setShow] = useState(false)
    const [title, setTitle] = useState("GxSession");



     useEffect(() => {
    
      if (count ===1 ) {
        setCount(previousCount => previousCount + 1)
        dispatch(gxSessionsActions.list(dataSession))
      }
    
      }, [count])
  


      const { register, formState: { errors }, handleSubmit } = useForm();

      const onSubmit = (dataSession) => {
        setDataSession(dataSession);
        setCount(1);
      
      }


    
      const actionTemplate = (rowData) => {
        return <div>
            <Button type="button" icon="pi pi-eye" className="p-button-rounded p-button-success mr-2" onClick={() => editGxRxSession(rowData.data)} ></Button>
        </div>;
      }


    const dateTemplate = (rowData, column) => {
      if (!rowData.data ) {
         return null;
      }
      else{
        var time = new Date(rowData.data[column.field]);
        return time.getHours() +":" + time.getMinutes()+":" + time.getSeconds();
      }
      
    }



    const editGxRxSession = (modelGxSession) => {
        const valueTitle = modelGxSession.ratType === undefined ? "RxSession" : "GxSession"
        setTitle(valueTitle );
        setModelGxSession({...modelGxSession});
        setShow(true);
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
                                <option value="Id">SessionId</option>
                                <option value="imsi">imsi</option>
                                <option value="Ipv4Address">Ipv4Address</option>
                                <option value="Ipv6Address">Ipv6Address</option>
                                <option value="MSISDN">MSISDN</option>
                                <option value="DNN">DNN</option>
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

    
      <div className="p-grid p-fluid">

      <div>
            <div className="card striped bordered hover" >
                <TreeTable value={gxSessions.dataList} reorderableColumns>
                    <Column field="diameterSessionId" header="Session Id" expander  />
                    <Column field="diameterOriginHost" header="Host Name"   />
                    <Column field="diameterOriginRealm" header="Realm Name" />
                    <Column field="ipv4Address" header="Ipv4Address" />
                    <Column field="ipv6Address" header="Ipv6Address" />
                    <Column field="gpsi" header="Gpsi" />
                    <Column field="dnn" header="Dnn" />
                    <Column field="createDate" header="Create Time" style={{ textAlign: "center" }} body={dateTemplate} />
                    <Column header="Option" body={actionTemplate} style={{ textAlign: 'center' }} />
                </TreeTable>
            </div>
            <div>
                <EditGxRxSession modelGxSession={modelGxSession}  show={show} setShow={setShow} title ={title} >

                </EditGxRxSession>
            </div>
        </div>
                
      </div>
      </div>

 
  );

      /*  <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Session Id</th>
            <th>Host Name</th>
            <th>Realm Name</th>

          </tr>
        </thead>
        <tbody>  let header = <div style={{ 'textAlign': 'left' }}>
  <i className="pi pi-search" style={{ margin: '4px 4px 0 0' }}></i>
  <InputText type="search" onInput={(e) => setValues(e, "globalFilter")} placeholder="Buscar Roles..." size="50" resposive="true"/>
</div>;

//<div className="p-clearfix" style={{ lineHeight: '1.87em' }}>Marcas </div>;

let footer = <div className="p-clearfix" style={{ width: '100%' }}>
  <Button style={{ float: 'left' }} aria-pressed="true" label="Agregar" icon="pi pi-plus" onClick={e => create(entity)}></Button>
</div>;

  let dialogFooter = <div>  <Button aria-pressed="true" icon="pi pi-save" label="Guardar" onClick={e => updateEntity(entity)} disabled={false} ></Button></div>;

            </tr>
          ))}
        </tbody>
      </Table>);*/
     
        /*<Table
            columns={getColumnSettings()}
            dataSource={gxSessions.dataList}
            loading={gxSessions.isLoading}
            rowKey={"diameterSessionId"}
        />);*/
}

export default GxSessions;