import ReactPDF, { PDFViewer,PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from './components/Document';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFile,faFileExcel} from '@fortawesome/free-regular-svg-icons'
import {Modal,Badge, ModalBody, ModalHeader, ModalFooter,Table, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown} from 'reactstrap';
import { useState,useEffect } from 'react';


const App = ()=>{

    const listData = [{id:1,name:"Tostitos morados",quantity:10,price:20,quanXprice:200},{id:2,name:"Ruffles",quantity:2,price:12.29,quanXprice:24.58},{id:3,name:"Doritos",quantity:2,price:12.29,quanXprice:24.58}]
    const [list,SetList] = useState(listData)
    const [errors,SetErrors] = useState('')
    const [total,setTotal] = useState('')
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);


    const [selectedProduct, setSelectedProduct] = useState({
        id: '',
        name: '',
        quantity: 0,
        price:0.00,
        quanXprice:0.00
      });

      
    useEffect(()=>{
      getTotal()
    },[total])

      const handleChange=e=>{
        const {name, value}=e.target;
        setSelectedProduct((prevState)=>({
          ...prevState,
          [name]: value
        }));
      }

      const getTotal = () => {
        setTotal('Total: ' +Number(list.map(item=>item.quanXprice).reduce((acc,value)=>Number(acc)+Number(value),[])).toFixed(2))
      }

      const openAddModal = () =>{
          SetErrors('')
          setSelectedProduct(null)
          setModalAdd(true)
      }

      const addProduct =()=>{
          if (selectedProduct==null) {
              SetErrors('No se puede agregar un producto sin datos.')
              return
          }
          if (!selectedProduct.quantity) {
              SetErrors('El producto debe de tener una cantidad')
              return
          }
          if (!selectedProduct.price) {
            SetErrors('El producto debe de tener un precio.')
            return
        }
          if (selectedProduct.quantity<=0) {
              SetErrors('La cantidad debe de ser mayor a cero.')
              return
          }
          if(!selectedProduct.name){
              SetErrors('El producto debe de tener un nombre.')
              return
          }
          if(list.find(ele=>ele.name.toLocaleLowerCase()===selectedProduct.name.toLocaleLowerCase())){
              SetErrors('El nombre del producto ya esta registradó.')
              return
          }
        let newProduct=selectedProduct
        newProduct.quanXprice=newProduct.quantity*newProduct.price
        newProduct.id= (list.length>0)?list[list.length-1].id+1:1;
        let newList = list
        newList.push(newProduct)
        SetList(newList)
        setTotal(0)
        setModalAdd(false)
      }

    
      const selectProduct = (element, caseT) =>
      {
        setSelectedProduct(element);
        (caseT==='Editar')?setModalEdit(true):setModalDelete(true)
      }

      const deleteProduct=()=>{
        let newList = list.filter(ele=>ele.id!==selectedProduct.id)
        SetList(newList);
        setTotal(0)
        setModalDelete(false)
      }

      const update=()=>{

        if (selectedProduct==null) {
          SetErrors('No se puede agregar un producto sin datos.')
          return
      }
      if (!selectedProduct.quantity) {
          SetErrors('El producto debe de tener una cantidad')
          return
      }
      if (!selectedProduct.price) {
        SetErrors('El producto debe de tener un precio.')
        return
    }
      if (selectedProduct.quantity<=0) {
          SetErrors('La cantidad debe de ser mayor a cero.')
          return
      }
      if(!selectedProduct.name){
          SetErrors('El producto debe de tener un nombre.')
          return
      }
      if(list.find(ele=>ele.name.toLocaleLowerCase()===selectedProduct.name.toLocaleLowerCase()&&ele.id!==selectedProduct.id)){
          SetErrors('El nombre del producto ya esta registradó.')
          return
      }


        var newList=list;
        newList.forEach(ele => {
          if(ele.id===selectedProduct.id){
            ele.name=selectedProduct.name;
            ele.price=selectedProduct.price;
            ele.quantity=selectedProduct.quantity
            ele.quanXprice=selectedProduct.quantity*selectedProduct.price
          }
        })
        SetList(newList);
        setTotal(0)
        setModalEdit(false);
      }


  return (
  <div style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'scroll'}} >
   <PDFDownloadLink document={<MyDocument listProducts={list}/>} fileName={new Date().toLocaleTimeString()} className="btnFabPrint">
     {({ blob, url, loading, error }) =>
       loading ? <FontAwesomeIcon icon={faFileExcel}></FontAwesomeIcon> :   <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
    }
  </PDFDownloadLink>

  <div className="total">
    <h3><Badge color="dark">{total}</Badge></h3>
  </div>

  <button className='btnFab' onClick={()=>openAddModal()}>+</button>  

  <div className="table-responsive">
  <Table className="table" striped>
        <thead>
            <tr >
                <th >Nombre</th>
                <th className="thQuan">Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
                <th >Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(element=>(
                    <tr>
                        <td >{element.name}</td>
                        <td>{element.quantity}</td>
                        <td>{
                           (Number(element.price).toString().includes('.'))?element.price:Number(element.price).toFixed(1)
                        }</td>
                        <td>{ (Number(element.quanXprice).toString().includes('.'))?Number(element.quanXprice).toFixed(2):Number(element.quanXprice).toFixed(1) }</td>
                        <td>
                        <UncontrolledDropdown>
                            <DropdownToggle className="mx-auto" size="sm" caret>
                              Menu
                            </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={()=>selectProduct(element,'Editar')}>Editar</DropdownItem>
                            <DropdownItem onClick={()=>selectProduct(element,'Eliminar')}>Eliminar</DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                        </td>

                    </tr>
                ))
            }
        </tbody>
    </Table> 
    </div>

    <Modal isOpen={modalAdd}>
        <ModalHeader>
          <div>
            <h3>Agregar producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input
              className="form-control"
              hidden
              readOnly
              type="text"
              name="id"
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={selectedProduct ? selectedProduct.name: ''}
              onChange={handleChange}
            />
            <br />

            <label>Cantidad</label>
            <input
              className="form-control"
              type="number"
              name="quantity"
              value={selectedProduct ? selectedProduct.quantity: ''}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="number"
              step='0.01'
              name="price"
              value={selectedProduct ? selectedProduct.price: ''}
              onChange={handleChange}
            />
            <br />

            <label>{errors}</label>

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>addProduct()}>
            Agregar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalAdd(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h3>Editar producto</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input
              hidden
              className="form-control"
              readOnly
              type="text"
              name="id"
              value={selectedProduct && selectedProduct.id}
            />
            <br />

            <label>Nombre</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={selectedProduct && selectedProduct.name}
              onChange={handleChange}
            />
            <br />

            <label>Cantidad</label>
            <input
              className="form-control"
              type="number"
              name="quantity"
              value={selectedProduct && selectedProduct.quantity}
              onChange={handleChange}
            />
            <br />

            <label>Precio</label>
            <input
              className="form-control"
              type="number"
              step='0.01'
              name="price"
              value={selectedProduct &&selectedProduct.price}
              onChange={handleChange}
            />
            <br />

            <label>{errors}</label>

          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary"
          onClick={()=>update()}>
            Guardar
          </button>
          <button
            className="btn btn-danger"
            onClick={()=>setModalEdit(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete} centered>
        <ModalBody>
         <h4>¿Estás Seguro que deseas eliminar el producto "{selectedProduct && selectedProduct.name}" ?</h4>
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>deleteProduct()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalDelete(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>


</div>
  )
}

export default App;
