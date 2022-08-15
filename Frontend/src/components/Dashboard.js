import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

//sockets 
import SockJsClient from 'react-stomp';

import {
    actionCreators as productsActions,
    selector as productsSelector,
  } from './features/products';


/*let data =[ {"id":"2018", "name":"test", "total":1200}, {"id":"2019", "name":"test", "total":1500}, {"id":"2019", "name":"wath", "total":1800}, {"id":"2020", "name":"zooi", "total":1000} ];

let result = products.dataList.reduce(function(acc, obj) {
    if(acc.map.hasOwnProperty(obj.nombre)) {
        acc.map[obj.nombre].total += +obj.total;
    } else {
        var newObj = Object.assign({}, obj);
        acc.map[obj.nombre] = newObj;
        acc.data.push(newObj);
    }
    return acc;
}, {data: [], map: {}}).data;*/



const Dashboard = (props) => {
  /*  let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };*/
    const messageInit = {
        id: 1,
        message :"guille"
     }
    const [message, setMessage] = useState(messageInit);
    const SOCKET_URL = 'http://3.142.90.162:8080/ws';

    let { products} = useSelector((state) => productsSelector(state));
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const [dataSession,setDataSession] = useState();

    const [productds, setProducts] = useState(null);
    const menu1 = useRef(null);
    const menu2 = useRef(null);
    const [lineOptions, setLineOptions] = useState(null)

    const applyLightTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

    const applyDarkTheme = () => {
        const lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color: 'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        setLineOptions(lineOptions)
    }

   /* useEffect(() => {
        const productService = new ProductService();
        productService.getProductsSmall().then(data => setProducts(data));
    }, []);*/

    useEffect(() => {
        console.log("Inicio de UseEffect", count)
    
        if (count ===0 ) {
            setCount(previousCount => previousCount + 1)
            dispatch(productsActions.list(dataSession))
        }
        console.log(products)

      /*  asks.forEach(function (task) {
            if (task.duration >= 120) {
                difficult_tasks.push(task);
            }
        });
  
        console.log(result);*/
    
      }, [count]);

    useEffect(() => {
        if (props.colorMode === 'light') {
            applyLightTheme();
        } else {
            applyDarkTheme();
        }
    }, [props.colorMode]);

  /*  const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };*/

    const findIndexById = (tipo) => {

        let result = {};
       
        if (products.dataList === undefined) {
            console.log("pppppp",products.dataList )

        }
        else{
            result=products.dataList.filter(obj=> obj.tipoProducto === tipo);
            return result.length;
        }
       
        
    }

    const resultBebidas = findIndexById("bebida");
    const resultComidas = findIndexById("comida");
    const resultSalsas = findIndexById("salsa");
    const resultEspecies = findIndexById("especies");
    console.log(products)

    let result = 0;

    if (products.dataList !== undefined) {
        result = products.dataList.length;
    }



    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        setMessage(msg);
        setCount(0);
       
    }


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
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Bebidas</span>
                            <div className="text-900 font-medium text-xl">{resultBebidas}</div>
                         
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-filter-fill text-blue-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Comidas</span>
                            <div className="text-900 font-medium text-xl">{resultComidas}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-book text-orange-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Salsas</span>
                            <div className="text-900 font-medium text-xl">{resultSalsas}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-trash text-cyan-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Especies</span>
                            <div className="text-900 font-medium text-xl">{resultEspecies}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-comment text-purple-500 text-xl"/>
                        </div>
                    </div>
 
                </div>
            </div>

            <div className="col-12 xl:col-6">
                <div className="card">
                    <h5>Recent Product</h5>
                    <DataTable value={products.dataList} rows={5} paginator responsiveLayout="scroll">
                        <Column field = "id" header="id" sortable style={{width: '35%'}}/>
                        <Column field="nombre" header="nombre" sortable style={{width: '35%'}}/>
                  
                        <Column header="View" style={{width:'15%'}} body={() => (
                            <>
                                <Button icon="pi pi-search" type="button" className="p-button-text"/>
                            </>
                        )}/>
                    </DataTable>
                </div>
              
            </div>

            <div className="col-12 xl:col-6">
            <div className="col-12 lg:col-6 xl:col-12">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Total Product</span>
                            <div className="text-900 font-medium text-xl">{result}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-purple-100 border-round" style={{width: '2.5rem', height: '2.5rem'}}>
                            <i className="pi pi-th-large text-purple-500 text-xl"/>
                        </div>
                    </div>

                </div>
            </div>

               

            </div>
        </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return (prevProps.location.pathname === nextProps.location.pathname) && (prevProps.colorMode === nextProps.colorMode);
};

export default React.memo(Dashboard, comparisonFn);