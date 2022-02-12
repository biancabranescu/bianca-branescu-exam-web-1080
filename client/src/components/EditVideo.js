import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SERVER = "http://localhost:8080"
export default function EditVideo(){
    const [titlu,setTitlu] = useState("");
    const [descriere,setDescriere] = useState("");
    const [url,setUrl] = useState("");
    const {id,idVideo} = useParams();
    useEffect(()=>{
        const f = async() =>{
            const res = await fetch(`${SERVER}/FavouriteList/${id}/video/${idVideo}`);
            const data = await res.json();
            setDescriere(data.descriere);
            setTitlu(data.titlu);
            setUrl(data.url);
        }
        f();
    },[])
    const f = async() => {
        const res = await fetch(`${SERVER}/FavouriteList/${id}/video/${idVideo}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({descriere,titlu,url})
        })
        const data = await res.json();
        if(res.ok) window.location.href = `/lista/${id}/video/${idVideo}`;
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