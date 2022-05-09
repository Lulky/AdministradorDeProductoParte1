import React, {useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

const ActualizarProducto = () => {

    const{id}= useParams();
    const[nombre, setNombre]= useState("");
    const[precio, setPrecio]= useState("");
    const[descripcion, setDescripcion]=useState("");
    const history = useHistory();

    useEffect( ()=>{
        axios.get("http://localhost:8000/api/productos/"+id)
            .then(res => {
                console.log(res.data);
                setNombre(res.data.nombre);
                setPrecio(res.data.precio);
                setDescripcion(res.data.descripcion);
            })
            .catch(err => console.log(err));
    },[])

    const actualizarProducto = e =>{
        e.preventDefault();
        axios.put("http://localhost:8000/api/productos/"+id, {
            nombre,
            precio,
            descripcion
        })
            .then(res => history.push("/"))
            .catch(err=>console.log(err));
    }
    

    

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={actualizarProducto}>
                
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" type="text" className="form-control" onChange={(e)=>setNombre(e.target.value)}  value={nombre} />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="precio">Precio</label>
                    <input id="precio" name="precio" type="number" className="form-control" onChange={(e)=>setPrecio(e.target.value)}  value={precio} />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripcion</label>
                    <input id="descripcion" name="descripcion" type="text" className="form-control" onChange={(e)=>setDescripcion(e.target.value)}  value={descripcion} />
                    
                </div>
                <input type="submit" className="btn btn-success" value="Guardar"/>
                
            
            </form>
        </div>
    )

    

}

export default ActualizarProducto;