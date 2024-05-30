import {useNavigate, useParams} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../main.jsx";
import { observer } from "mobx-react";
import Books from "/public/books.jpg"
import Films from "/public/films.jpg"
import Songs from "/public/songs.png"
import Other from "/public/others.jpg"
import Button from "../customInt/Button.jsx";
import axios from "axios";

const Catalog = observer(() => {
    let { catalogId } = useParams();
    const [lolo, setLolo] = useState({});
    const { allInfo } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(catalogId)
        allInfo.loadCurrentUser()
        allInfo.loadUserCollections().then(() => {
            setLolo(allInfo.getUserCollections.find(item => item.id === catalogId));

        });
    }, []);

    const renderCustomFields = () => {
        const fields = Object.keys(lolo.customFields || {});
        let columns = [];

        fields.forEach(field => {
            lolo.customFields[field].forEach((value, index) => {
                columns.push(
                    <th key={`${field}-${index}`} className="py-2 px-4 border-b">{value}</th>
                );
            });
        });

        return columns;
    };
    function toItem(itemId){
        navigate(`/catalog/:${catalogId}/item/:${itemId}`)
    }
    function truncateString(str) {
        if (str.length > 10) {
            return str.substring(0, 10) + '...';
        }
        return str;
    }
    const renderRows = () => {
        return (lolo.items || []).map((item, rowIndex) => (
            <tr key={rowIndex} className="">
                <td className="py-2 px-4 border-b">{item.id}</td>
                <td onClick={()=>toItem(item.id)} className="py-2 px-4 border-b cursor-pointer">{item.title}</td>
                <td title={item.tags} className="py-2 px-4 border-b">{truncateString(item.tags)}</td>
                {
                    Object.keys(lolo.customFields || {}).flatMap(field =>
                    lolo.customFields[field].map((subField, index) => (
                        <td key={`${rowIndex}-${field}-${index}`} className="py-2 px-4 border-b">
                            {truncateString(item.customFieldValues[`custom${field.charAt(0).toUpperCase() + field.slice(1)}`]?.[subField] || '')}
                        </td>
                    ))
                )}
                <td className="py-2 px-4 border-b text-center ">
                    <span onClick={()=>toChangeItem(item.id)} className="material-symbols-outlined cursor-pointer mr-2">
                        edit
                    </span>
                    <span onClick={()=>removeItem(item.id)} className="material-symbols-outlined cursor-pointer">
                    delete
                    </span>
                </td>
            </tr>
        ));
    };
    const toChangeItem = (itemId) =>{
        const serializedCustomFields = JSON.stringify(lolo.customFields);
        navigate(`/catalog/:${catalogId}/change-item/:${itemId}`,{ state: { customFields: serializedCustomFields } })
    }

    const removeItem = async (id) =>{
        const token = localStorage.getItem('token');

        try {
            await axios.delete(`http://localhost:5000/api/collections/${catalogId}/items/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });

            setLolo(prevState => ({
                ...prevState,
                items: prevState.items.filter(item => item.id !== id)
            }));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    }
    const getCategoryImage = (category) => {
        switch (category) {
            case 'books':
                return Books;
            case 'songs':
                return Songs;
            case 'films':
                return Films;
            default:
                return Other;
        }
    }

    const handleAddItem = () => {
        const serializedCustomFields = JSON.stringify(lolo.customFields);
        navigate(`/catalog/${catalogId}/create-item`, { state: { customFields: serializedCustomFields } });
    };

    return (
        <div className="relative w-[1800px] m-auto mb-52">
            <div className="mt-52 flex flex-col justify-center">
                <div className="flex flex-col text-center">
                    <h1 className="text-4xl mb-5 font-bold uppercase">{lolo.name}</h1>
                    {lolo.category && (
                        <img className="w-[200px] m-auto" src={getCategoryImage(lolo.category)} alt={lolo.category} />
                    )}
                    <p className="text-xl font-medium uppercase">Категория</p>
                    <p className="uppercase">{lolo.category}</p>
                    <h1 className="text-xl font-medium uppercase">Описание</h1>
                    <p>{lolo.description}</p>
                </div>
                <div className="w-[1800px] m-auto mt-5">
                    <table className="w-full text-sm text-left rtl:text-right border dark:text-gray-400">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">ID</th>
                            <th className="py-2 px-4 border-b">Название</th>
                            <th className="py-2 px-4 border-b">Тэги</th>
                            {renderCustomFields()}
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderRows()}
                        </tbody>
                    </table>
                </div>
                <div className="absolute bottom-[-60px] right-0">
                    <Button onClick={handleAddItem}>Добавить айтем</Button>
                </div>
            </div>
        </div>
    );
});

export default Catalog;
