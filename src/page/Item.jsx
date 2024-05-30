import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../main.jsx";
import CreateComments from "../components/CreateComments.jsx";

function Item() {
    const { allInfo } = useContext(Context);
    const { catalogId, itemId } = useParams();
    const [itemData, setItemData] = useState({});
    let id = catalogId.substr(1, catalogId.length);
    let item = itemId.substr(1, itemId.length);
    useEffect(() => {
        allInfo.loadCurrentUser()

        const fetchItemDetails = async () => {
            try {
                const response = await axios.get(`https://backforprojectreact.onrender.com/api/collections/${id}/items/${item}`);
                setItemData(response.data)
            } catch (err) {
                console.error(err)
            }
        };
        fetchItemDetails()
    }, []);

    const renderLeafNodes = (obj) => {
        const leafNodes = [];
        const findLeafNodes = (currentObj, prefix = '') => {
            Object.entries(currentObj).forEach(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    findLeafNodes(value, `${prefix}${key}.`);
                } else {
                    leafNodes.push({ key: `${key}`, value });
                }
            });
        };
        findLeafNodes(obj)
        return (
            <ul>
                {leafNodes.map(({ key, value }) => (
                    <li key={key}>
                        <p className="text-2xl">{key}</p>
                        <p className="mb-2">{value}</p>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="relative min-h-[100vh]">
            <img src="/public/back5.jpg" className="absolute inset-0 z-0 w-full h-full object-cover blur-sm" alt=""/>
            <div className=" relative z-10 w-[1200px] min-h-[100vh] pt-52 m-auto text-center shadow-lg bg-white bg-opacity-95">
                <div className="flex flex-col items-center justify-between">
                    <h1 className="text-4xl font-bold mb-4">{itemData.title}</h1>
                    <p>тэги: <span className="">{itemData.tags}</span></p>
                    <div >
                        {itemData.customFieldValues && renderLeafNodes(itemData.customFieldValues)}
                    </div>
                    <h3 className="mb-5 text-xl">Комментарии</h3>

                        <CreateComments
                            itemId={item}
                            collectionId={id}
                        />


                </div>

            </div>
        </div>
    );
}

export default Item;
