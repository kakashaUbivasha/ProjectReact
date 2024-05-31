import {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import HomeItem from "./HomeItem.jsx";
function HomeItems(){
    const [items,setItems] = useState([])
    const { allInfo } = useContext(Context);
    useEffect(()=>{
        allInfo.loadUserCollections()
            .then(r=>{
                console.log(`aadadad`,allInfo.getUserCollections.sort((a,b)=>b.items.length - a.items.length))
                setItems(allInfo.getUserCollections.sort((a,b)=>b.items.length - a.items.length))
            })
    },[])
    return(
        <div className="mt-5 grid grid-cols-4 gap-5">
            {
                items && (
                    items.map((item,index)=>(
                        <div key={index}>
                            <HomeItem
                            item={item}
                            />
                        </div>
                        )

                    )
                )
            }
        </div>
    )
}
export default HomeItems