import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import Input from "../customInt/Input.jsx";
import Button from "../customInt/Button.jsx";
import allInfo from "../store/store.js";
import {Context} from "../main.jsx";

function ChangeItem(){
    const { catalogId, itemId } = useParams();
    let id = catalogId.substr(1,catalogId.length)
    let item = itemId.substr(1, itemId.length)
    const { allInfo } = useContext(Context);
    const location = useLocation();
    const [lolo,setLolo] = useState({})
    const { customFields: serializedCustomFields } = location.state || {};
    const customFields = JSON.parse(serializedCustomFields || "{}");
    const [itemData, setItemData] = useState({
        title: '',
        tags: '',
        customFieldValues: {
            customStringFieldValues: {},
            customTextFieldValues: {},
            customBooleanFieldValues: {},
            customDateFieldValues: {},
            customNumberFieldValues: {}
        }
    });
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const obj =
        {
            stringFields: 'text',
            integerFields: 'number',
            textFields: 'text',
            dateFields: 'date'
        }
        useEffect(()=>{
            console.log(`adadad`,typeof item)
            allInfo.loadCurrentUser()
            allInfo.loadUserCollections()
                .then(()=>{
                    setItemData(prevState => ({ ...prevState, title: allInfo.getUserCollections.find(item => item.id === id).items.find(i=>i.id===item).title}))
                    setItemData(prevState => ({ ...prevState, tags: allInfo.getUserCollections.find(item => item.id === id).items.find(i=>i.id===item).tags}))
                    setItemData(prevState => ({ ...prevState, customFieldValues: allInfo.getUserCollections.find(item => item.id === id).items.find(i=>i.id===item).customFieldValues}))
                })
        },[])
    const handleInputChange = (field, subField, value) => {
        console.log(itemData)
        setItemData(prevState => ({
            ...prevState,
            customFieldValues: {
                ...prevState.customFieldValues,
                [field]: {
                    ...prevState.customFieldValues[field],
                    [subField]: value
                }
            }
        }));
    };

    const handleBooleanChange = (field, subField, value) => {
        setItemData(prevState => ({
            ...prevState,
            customFieldValues: {
                ...prevState.customFieldValues,
                [field]: {
                    ...prevState.customFieldValues[field],
                    [subField]: value
                }
            }
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`https://backforprojectreact.onrender.com/api/collections/${id}/items/${item}`, itemData, {
                headers: {
                    'x-auth-token': token
                }
            });
            navigate(`/catalog/${id}`);
        } catch (error) {
            console.error('Ошибка при добавлении айтема:', error);
        }
    };

    const renderCustomFieldsInputs = () => {
        const fields = Object.keys(customFields || {});
        let inputs = [];

        fields.forEach(field => {
            if (field === 'booleanFields') {
                customFields[field].forEach((value, index) => {
                    inputs.push(
                        <div key={`${field}-${index}`} className="mb-4">
                            <label className="block mb-1">{value}</label>
                            <div className="flex">
                                <button
                                    type="button"
                                    className={`border rounded p-2 w-full mr-2 ${itemData.customFieldValues.customBooleanFieldValues[value] === true ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handleBooleanChange('customBooleanFieldValues', value, true)}
                                >
                                    Да
                                </button>
                                <button
                                    type="button"
                                    className={`border rounded p-2 w-full ${itemData.customFieldValues.customBooleanFieldValues[value] === false ? 'bg-blue-500 text-white' : ''}`}
                                    onClick={() => handleBooleanChange('customBooleanFieldValues', value, false)}
                                >
                                    Нет
                                </button>
                            </div>
                        </div>
                    );
                });
            } else if (Array.isArray(customFields[field])) {
                customFields[field].forEach((value, index) => {
                    inputs.push(
                        <div key={`${field}-${index}`} className="mb-4">
                            <label className="block mb-1">{value}</label>
                            <Input
                                inputType={obj[field]}
                                value={field[value]}
                                className="border rounded p-2 w-full"
                                onChange={(e) => handleInputChange(`custom${field.charAt(0).toUpperCase() + field.slice(1)}`, value, e.target.value)}
                            />
                        </div>
                    );
                });
            }
        });

        return inputs;
    };

    return (
        <div className="max-w-2xl mx-auto mt-[15vh]">
            <h1 className="text-2xl mb-6">Изменить айтем</h1>
            <div className="mb-4">
                <label className="block mb-1">Название</label>
                <Input
                    inputType="text"
                    className="border rounded p-2 w-full"
                    placeholder={lolo.title}
                    onChange={(e) => setItemData(prevState => ({ ...prevState, title: e.target.value }))}
                />
            </div>
            <div className="mb-4">
                <label className="block mb-1">Тэги</label>
                <Input
                    inputType="text"
                    className="border rounded p-2 w-full"
                    placeholder={lolo.tags}
                    onChange={(e) => setItemData(prevState => ({ ...prevState, tags: e.target.value }))}
                />
            </div>
            {renderCustomFieldsInputs()}
            <Button onClick={handleSubmit}>Изменить</Button>
        </div>
    );
}
export default ChangeItem