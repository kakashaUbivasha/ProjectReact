import axios, {all} from "axios";
import {useContext, useEffect, useState} from "react";
import { useNavigate, Link } from 'react-router-dom';
import Button from "../customInt/Button.jsx";
import {Context} from "../main.jsx";
function Account(){
    const {allInfo} =useContext(Context)
    const [currentUser, setCurrentUser] = useState({})
    const [array, setArray] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    const handleCatalogClick = (catalogId) => {
        navigate(`/catalog/${catalogId}`)
    };
    function handleChangeCollection(catalogId){
        navigate(`/change-catalog/${catalogId}`)
    }
    const handleAdminRequest = () => {
        axios.get(`https://backforprojectreact-1.onrender.com/api/users/me`,{
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
            .then(r=> {
                console.log(r.data)

            })
            .catch(e=>console.error(e))
    }
    useEffect(() => {
        allInfo.loadCurrentUser()
            .then(()=>{
            setCurrentUser(allInfo.getCurrentUser)
            }
            )
        allInfo.loadUserCollections()
            .then((r)=> {
                console.log(allInfo.getUserCollections)
                setArray(prevArray => [...prevArray, ...allInfo.getUserCollections])
            }
            )
        handleAdminRequest()
    }, []);
    function handleRemove(){
        localStorage.removeItem('token')
        navigate(`/autorization`)
    }

    async function  handleDeleteRow(id){
        try {
            const response = await axios.delete(`http://localhost:5000/api/collections/${id}`, {
                headers: {
                    'x-auth-token': token
                }
            });
            setArray(prevArray => prevArray.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting collection ', error)
        }
    }

    return(
        <div>
        <div className="mt-52 flex justify-between w-[1200px] m-auto shadow-md p-5">
            <div className="">
                <img className="max-h-[100px]" src="/public/blank-profile-picture.webp" alt="picture"/>
            </div>
            <div>
            <ul>
                <li>Имя: {currentUser.name}</li>
                <li>Дата регистрации: {currentUser.registrationDate ? currentUser.registrationDate.slice(0, 10) : 'Дата не указана'}</li>
                <li>Количество коллекций: {array.length}</li>
            </ul>
                <Button additionalClasses="hover:bg-red-600 hover:text-white"
                onClick={handleRemove}
                >Выйти</Button>
            </div>
        </div>
            <div  className="w-[1200px] m-auto mt-5 shadow-md ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                <tr>
                    <th className="px-6 py-3">Number</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Name</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {array.map((item, index) => (
                    <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:shadow-[1px_0_rgba(0,0,0,0.9)]"
                        key={index}
                        >
                        <td className="px-6 py-4 cursor-pointer">{index + 1}</td>
                        <td
                            className="px-6 py-4 cursor-pointer"
                            onClick={()=>handleCatalogClick(item.id)}
                        >
                            <div >
                            {item.category}
                            </div>
                        </td>
                        <td
                            className="px-6 py-4 cursor-pointer"

                        >
                            <div onClick={()=>handleCatalogClick(item.id)}>
                                {item.name}
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex gap-3">
                                <button onClick={()=> handleChangeCollection(item.id)}>
                                  <span className="material-symbols-outlined">
                        edit
                        </span>
                                </button>
                                <button onClick={() => handleDeleteRow(item.id)}>
                                  <span className="material-symbols-outlined">
                        delete
                        </span>
                                </button>

                            </div>
                        </td>
                    </tr>

                    )
                )
                }
                </tbody>
            </table>
            </div>
            <div className="text-center">
                    <Link to="/create-catalog">
                        <Button
                            additionalClasses="m-auto text-center"
                        >
                        Создать коллекцию
                        </Button>
                    </Link>



            </div>

        </div>
    )
}

export default Account
