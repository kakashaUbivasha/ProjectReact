import {useLocation, useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../main.jsx";

function SearchResults(){
    const location = useLocation();
    const {allInfo} = useContext(Context)
    const navigate = useNavigate()
    const [result,setResult] = useState([])
    const query = new URLSearchParams(location.search).get('q');
    useEffect(()=>{
        allInfo.loadCurrentUser()
        async function handleSearch(){
            try{
                const response = await axios.get(`https://backforprojectreact.onrender.com/api/search?q=${query}`);
                setResult(response.data)
                console.log(response)
            }
            catch (e){
                console.error(e)
            }
        }
        handleSearch()
    },[query])
    function toItem(id,item) {
        navigate(`/catalog/:${id}/item/:${item}`)
    }
    return(
        <>
            <h3 className="mt-[85px] text-3xl text-center mb-16">
                Список результатов
            </h3>
            <ul>
                {
                    result.map((item,index)=>(
                            <li key={index}>
                                <div onClick={()=>toItem(item.collectionId, item.id)} className="cursor-pointer border rounded-xl w-[800px] m-auto bg-gray-100 hover:bg-gray-200 flex p-5 flex-col mb-5">
                                    <p>Название: {item.title}</p>
                                    <p>Тэги: {item.tags}</p>
                                </div>

                            </li>
                    )
                    )}
            </ul>
            <div>{
                !result.length&&(
                    <div>
                        <p className="text-center text-xl">Упс, похоже мы ничего не нашли по ключевому слову <i>{query}</i>, попробуйти ввести что-нибудь другое</p>
                        <img src="/public/unresult.jpg" alt="unresult" className="m-auto mt-5"/>
                    </div>

                )
            }</div>
        </>
    )
}
export default SearchResults