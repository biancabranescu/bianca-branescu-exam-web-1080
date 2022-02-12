import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SERVER = "http://localhost:8080"
export default function NewVideo(){
    const [titlu,setTitlu] = useState("");
    const [descriere,setDescriere] = useState("");
    const [url,setUrl] = useState("");
    const {id} = useParams();
    const f = async() => {
        const res = await fetch(`${SERVER}/FavouriteList/${id}/video`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({titlu,descriere,url,FavouriteListId:id})
        })
        const data = await res.json();
        console.log(data);
    }
    return(
        <div>
            <div>
            <label>Titlu:</label>
            <input value={titlu} onChange={e=>setTitlu(e.target.value)}/>
            </div>
            <div>
            <label>Descriere:</label>
            <input value={descriere} onChange={e=>setDescriere(e.target.value)}/>
            </div>
            <div>
            <label>Url:</label>
            <input value={url} onChange={e=>setUrl(e.target.value)}/>
            </div>
            <button onClick={f}>Send</button>
        </div>
    )
}