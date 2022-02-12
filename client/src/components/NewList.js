import React, { useEffect, useState } from "react";
const SERVER = "http://localhost:8080"
export default function NewList(){
    const [descriere,setDescriere] = useState("");
    const f = async() => {
        const res = await fetch(`${SERVER}/FavouriteList`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({descriere,data:new Date()})
        })
        const data = await res.json();
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