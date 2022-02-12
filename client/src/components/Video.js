import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const SERVER = "http://localhost:8080"
export default function Video(){
    const [video,setVideo] = useState(null)
    const {id,idVideo} = useParams();
    useEffect(()=>{
        const f = async() => {
            const res = await fetch(`${SERVER}/FavouriteList/${id}/video/${idVideo}`);
            const data = await res.json();
            setVideo(data);
            console.log(data);
        }
        f();
    },[]);
    const sterge = async() =>{
        const res = await fetch(`${SERVER}/FavouriteList/${id}/video/${idVideo}`,{method:"DELETE"});
            const data = await res.json();
            console.log(data);
    }
    return(
        <div>
            <p>{video?.titlu}</p>
            <p>{video?.descriere}</p>
            <p>{video?.url}</p>
            <button onClick={()=>window.location.href=`/editVideo/${id}/${idVideo}`}>Editeaza</button>
            <button onClick={sterge}>Sterge</button>
        </div>
    )
}