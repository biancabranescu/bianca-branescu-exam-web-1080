import React, { useEffect, useState } from "react";
const SERVER = "http://localhost:8080"
export default function Home() {
    const [lists, setLists] = useState([]);
    const [id, setId] = useState("");
    const [descriere, setDescriere] = useState("");
    useEffect(() => {
        const f = async () => {
            const res = await fetch(`${SERVER}/FavouriteList/all`);
            const data = await res.json();
            setLists(data);
            console.log(data);
        }
        f();
    }, []);
    const filtrare = async() =>{
        const res = await fetch(`${SERVER}/FavouriteList/filter`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({descriere,id})
        });
        const data = await res.json();
        // setLists(data);
    }
    const sortare = async() =>{
        const res = await fetch(`${SERVER}/FavouriteList/sort`);
        const data = await res.json();
        setLists(data);
    }
    const exp = async () => {
        const res = await fetch(`${SERVER}/export`)
        const data = await res.text();
        const blob = new Blob([data],{type:"text/json"});

        const a = document.createElement("a");
        a.download = "fisier.json";
        a.href = window.URL.createObjectURL(blob);
        a.click();
    }
    const imp = async(e) => {
        const file = e.target.files[0];
        const fr = new FileReader();
        fr.onload = async(e) => {
            e.preventDefault();
            const file = e.target.result;
            const data = JSON.parse(file);
            const res = await fetch(`${SERVER}/import`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({data})
            });
        }
        fr.readAsText(file)
    }
    return (
        <div className="flexbox">
        <div>
            <p>Sortare:</p>
            <button onClick={sortare}>Sortare</button>
        </div>
        <p>Filtrare:</p>
        <div>
            <label>Descriere:</label>
            <input value={descriere} onChange={e=>setDescriere(e.target.value)}></input>
        </div>
        <div>
            <label>Id:</label>
            <input type={"number"} value={id} onChange={e=>setId(e.target.value)} min="1"></input>
        </div>
        <div>
            <button onClick={filtrare}>Filtrare</button>
        </div>
        <div>
            {lists.length > 0 && lists.map((list) => {
                const sterge = async () => {
                    const res = await fetch(`${SERVER}/FavouriteList/${list.id}`, { method: "DELETE" });
                    const data = await res.json();
                    console.log(data);
                    window.location.reload();
                }
                const adauga = async () => {
                    window.location.href = "/newVideo/" + list.id;
                }
                return (
                    <div key={list.id}>
                        <p>{list.descriere}</p>
                        <p>{list.data}</p>
                        <button onClick={()=>window.location.href=`/editList/${list.id}`}>Editeaza</button>
                        <button onClick={sterge}>Sterge</button>
                        <button onClick={adauga}>Adauga video</button>
                        <p>Videouri:</p>
                        {list && list.Videos.map(video => {
                            return (
                                <div key={video.id}>
                                    <a href={`/lista/${list.id}/video/${video.id}`}>{video.titlu}</a>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
        <button onClick={exp}>Exporta json</button>
        <p>Import</p>
        <input type="file" onChange={imp}/>
        </div>
    )
}