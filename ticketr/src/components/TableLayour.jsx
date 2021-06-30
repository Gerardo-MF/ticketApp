import { render } from '@testing-library/react'
import React,{useState,useRef} from 'react'


const TableLayout = ()=>{
    const listData = [{name:"Fritos",quantity:2,price:12.29,quanXprice:24.58},{name:"Fritos",quantity:2,price:12.29,quanXprice:24.58},{name:"Fritos",quantity:2,price:12.29,quanXprice:24.58}]
    const [list,SetList] = useState([])
    const [product,SetProduct]=useState({})

    return (
    <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {
                listData.map(element=>(
                    <tr>
                        <td>{element.name}</td>
                        <td>{element.quantity}</td>
                        <td>{element.price}</td>
                        <td>{element.quanXprice}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    )
}

export default TableLayout