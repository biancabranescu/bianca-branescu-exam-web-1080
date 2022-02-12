import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SERVER = "http://localhost:8080"
export default function EditList(){
    const [descriere,setDescriere] = useState("");
    const {id} = useParams();
    useEffect(()=>{
        const f = async() =>{
            const res = await fetch(`${SERVER}/FavouriteList/${id}`);
            const data = await res.json();
            setDescriere(data.descriere);
        }
        f();
    },[])
    const f = async() => {
        const res = await fetch(`${SERVER}/FavouriteList/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({descriere})
        })
        const data = await res.json();
        if(res.ok) window.location.href = "/"
        console.log(data);
    }
    return(
        <div>
            <label>Descriere:</label>
            <input value={descriere} onChange={e=>setDescriere(e.target.value)}/>
            <button onClick={f}>Send</button>
        </div>
    )
}