import { useLocation, useParams, useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "../customInt/Button.jsx";
import Input from "../customInt/Input.jsx";
import {Context} from "../main.jsx";
import TextArea from "../customInt/TextArea.jsx";

const CreateItem = () => {
    const {allInfo} =useContext(Context)
    const { catalogId } = useParams();
    const location = useLocation();
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
        allInfo.loadCurrentUser()
    })
    const handleInputChange = (field, subField, value) => {
        console.log(`ad`,itemData)
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
        if (!itemData.title || !itemData.tags || !Object.values(itemData.customFieldValues.customStringFieldValues).every(value => value) ||
            !Object.values(itemData.customFieldValues.customTextFieldValues).every(value => value) ||
            !Object.values(itemData.customFieldValues.customBooleanFieldValues).every(value => value !== undefined) ||
            !Object.values(itemData.customFieldValues.customDateFieldValues).every(value => value) ||
            !Object.values(itemData.customFieldValues.customNumberFieldValues).every(value => value)) {
            toast.error('Заполните все поля',{ autoClose: 1500 })
            return
        }

        try {
            await axios.post(`https://backforprojectreact.onrender.com/api/collections/${catalogId}/items`, itemData, {
                headers: {
                    'x-auth-token': token
                }
            });
            navigate(`/catalog/${catalogId}`)
        } catch (error) {
            console.error('Ошибка при добавлении айтема:', error)
        }
    };

    const renderCustomFieldsInputs = () => {
        const fields = Object.keys(customFields || {})
        let inputs = []

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
            }
            else if (field === 'textFields'){
                customFields[field].forEach((value, index) => {
                    inputs.push(
                        <div key={`${field}-${index}`} className="mb-4">
                            <label className="block mb-1">{value}</label>
                            <div className="flex">
                                <TextArea
                                    className={`border rounded p-2 w-full mr-2`}
                                    onChange={(e) => handleInputChange(`custom${field.charAt(0).toUpperCase() + field.slice(1)}`, value, e.target.value)}
                                >
                                </TextArea>
                            </div>
                        </div>
                    );
                });
            }
            else if (Array.isArray(customFields[field])) {
                customFields[field].forEach((value, index) => {
                    inputs.push(
                        <div key={`${field}-${index}`} className="mb-4">
                            <label className="block mb-1">{value}</label>
                            <Input
                                inputType={obj[field]}
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
        <div className="max-w-2xl mx-auto mt-[15vh] mb-5">
            <ToastContainer autoClose={3000} />
            <h1 className="text-2xl mb-6">Создать айтем</h1>
            <div className="grid grid-cols-2">
                <div className="mb-4">
                    <label className="block mb-1">Название</label>
                    <Input
                        inputType="text"
                        className="border rounded p-2 w-full"
                        onChange={(e) => setItemData(prevState => ({ ...prevState, title: e.target.value }))}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Тэги</label>
                    <Input
                        inputType="text"
                        className="border rounded p-2 w-full"
                        onChange={(e) => setItemData(prevState => ({ ...prevState, tags: e.target.value }))}
                    />
                </div>
                {renderCustomFieldsInputs()}

            </div>
            <div className="text-center">
                <Button  onClick={handleSubmit}>Создать</Button>
            </div>

        </div>
    );
};

export default CreateItem;
