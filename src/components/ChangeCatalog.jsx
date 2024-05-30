import {useContext, useEffect, useState} from "react";
import {Context} from "../main.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Input from "../customInt/Input.jsx";
import TextArea from "../customInt/TextArea.jsx";
import Select from "../customInt/Select.jsx";
import Button from "../customInt/Button.jsx";

function ChangeCatalog(){
    const {allInfo} =useContext(Context)
    const { catalogId } = useParams();
    let navigate = useNavigate()
    const options = [
        { value: 'books', label: 'Книги' },
        { value: 'songs', label: 'Песни' },
        { value: 'films', label: 'Фильмы' },
        { value: 'others', label: 'Другое' },
    ];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(options[0].value);
    const [littleWord, setLittleWord] = useState('');
    const [littleWords, setLittleWords] = useState([]);
    const [bigWord, setBigWord] = useState('');
    const [bigWords, setBigWords] = useState([]);
    const [forBool, setForBool] = useState('');
    const [forBools, setForBools] = useState([]);
    const [date, setDate] = useState('');
    const [dates, setDates] = useState([]);
    const [userNumber, setUserNumber] = useState('');
    const [userNumbers, setUserNumbers] = useState([]);
    const [showMaxMessage, setShowMaxMessage] = useState(false);
    useEffect(()=>{
        allInfo.loadUserCollections()
            .then(()=>{
                setTitle(allInfo.getUserCollections.find(item => item.id === catalogId).name)
                setDescription(allInfo.getUserCollections.find(item => item.id === catalogId).description)
                setCategory(allInfo.getUserCollections.find(item => item.id === catalogId).category)
                setLittleWords(allInfo.getUserCollections.find(item => item.id === catalogId).customFields.stringFields)
                setUserNumbers(allInfo.getUserCollections.find(item => item.id === catalogId).customFields.integerFields)
                setBigWords(allInfo.getUserCollections.find(item => item.id === catalogId).customFields.textFields)
                setForBools(allInfo.getUserCollections.find(item => item.id === catalogId).customFields.booleanFields)
                setDates(allInfo.getUserCollections.find(item => item.id === catalogId).customFields.dateFields)
                console.log(allInfo.getUserCollections.find(item => item.id === catalogId).name)
            })

    },[])
    const handleTitleChange = (e) =>
        setTitle(e.target.value)
    console.log(title)
    ;
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCategoryChange = (e) => {
            setCategory(e.target.value)
            console.log(category)
        }
    ;
    const handleLittleChange = (e) => setLittleWord(e.target.value);
    const handleNumberChange = (e) => setUserNumber(e.target.value);
    const handleBoolChange = (e) => setForBool(e.target.value);
    const handleBigChange = (e) => setBigWord(e.target.value);
    const handleDate = (e) => setDate(e.target.value);

    const addLittle = (e) => {
        e.preventDefault();
        if (littleWord.trim() !== '' && littleWords.length < 3) {
            setLittleWords([...littleWords, littleWord.trim()]);
            setLittleWord('');
        } else handleMaxMessage();
    };

    const addBool = (e) => {
        e.preventDefault();
        if (forBool.trim() !== '' && forBools.length < 3) {
            setForBools([...forBools, forBool.trim()]);
            setForBool('');
        } else handleMaxMessage();
    };

    const addDate = (e) => {
        e.preventDefault();
        if (date.trim() !== '' && dates.length < 3) {
            setDates([...dates, date.trim()]);
            setDate('');
        } else handleMaxMessage();
    };

    const addNumbers = (e) => {
        e.preventDefault();
        if (userNumber.trim() !== '' && userNumbers.length < 3) {
            setUserNumbers([...userNumbers, userNumber.trim()]);
            setUserNumber('');
        } else handleMaxMessage();
    };

    const addBig = (e) => {
        e.preventDefault();
        if (bigWord.trim() !== '' && bigWords.length < 3) {
            setBigWords([...bigWords, bigWord.trim()]);
            setBigWord('');
        } else handleMaxMessage();
    };

    const handleMaxMessage = () => {
        setShowMaxMessage(true);
        setTimeout(() => {
            setShowMaxMessage(false);
        }, 1000);
    };
    const handleDeleteLittleWord = (index) => {
        setLittleWords(littleWords.filter((_, i) => i !== index));
    };

    const handleDeleteBool = (index) => {
        setForBools(forBools.filter((_, i) => i !== index));
    };

    const handleDeleteDate = (index) => {
        setDates(dates.filter((_, i) => i !== index));
    };

    const handleDeleteNumber = (index) => {
        setUserNumbers(userNumbers.filter((_, i) => i !== index));
    };

    const handleDeleteBigWord = (index) => {
        setBigWords(bigWords.filter((_, i) => i !== index));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const customFields = {
            stringFields: littleWords,
            integerFields: userNumbers,
            textFields: bigWords,
            booleanFields: forBools,
            dateFields: dates,
        };

        const collectionData = {
            name: title,
            description: description,
            category: category,
            customFields,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://backforprojectreact-1.onrender.com/api/collections/${catalogId}`, collectionData, {
                headers: {
                    'x-auth-token': token,
                },
            });
            console.log('Collection created:', response.data);
            setTitle('');
            setDescription('');
            setCategory(options[0].value);
            setLittleWords([]);
            setUserNumbers([]);
            setBigWords([]);
            setForBools([]);
            setDates([]);
            navigate('/account')
        } catch (error) {
            console.error('Error creating collection:', error);
        }
    };

    return (
        <div className="">
            <form onSubmit={handleSubmit}>
                <div className="flex mt-52 gap-[50px] justify-center">
                    <div className="flex flex-col w-[400px]">
                        <h3>Обязательно</h3>
                        <Input
                            placeholder="Введите название"
                            value={title}
                            onChange={handleTitleChange}
                        />
                        <TextArea
                            placeholder="Введите описание"
                            value={description}
                            onChange={handleDescriptionChange}
                        />
                        <label htmlFor="1" className="mr-2 mt-3">
                            Выберите категорию:
                        </label>
                        <Select
                            id="1"
                            options={options}
                            value={options.find(option => option.value === category)}
                            onChange={handleCategoryChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3>Необязательно</h3>
                        <div className="relative cursor-pointer">
                            <Input
                                placeholder="Название для доп. строковой информации"
                                onChange={handleLittleChange}
                                value={littleWord}
                            />
                            <div className="absolute right-[-50px] top-5">
                                <span title="Добавляет вашем айтемам доп. поле с возможностью ввести небольшой текст" className="material-symbols-outlined">
                                    info
                                </span>
                                <button onClick={addLittle}>
                                    <span className="material-symbols-outlined">
                                        add
                                    </span>
                                </button>
                            </div>
                            <div className="mt-3">
                                {littleWords.slice(0, 3).map((word, index) => (
                                    <div key={index}>{word}
                                        <button onClick={() => handleDeleteLittleWord(index)}>
                                            <span className="material-symbols-outlined text-red-600 ml-2 align-middle">
                                                remove_circle
                                            </span>
                                        </button>
                                    </div>
                                ))}
                                {littleWords.length > 2 && showMaxMessage && (
                                    <div className="text-red-600 text-center font-medium text-xl">Максимум 3 элемента</div>
                                )}
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <Input
                                placeholder="Название для доп. числовой информации"
                                value={userNumber}
                                onChange={handleNumberChange}
                            />
                            <div className="absolute right-[-50px] top-5">
                                <span title="Добавляет вашем айтемам доп. поле с возможностью  ввести числовую информацию" className="material-symbols-outlined">
                                    info
                                </span>
                                <span
                                    onClick={addNumbers}
                                    className="material-symbols-outlined">
                                    add
                                </span>
                            </div>
                            <div className="mt-3">
                                {userNumbers.slice(0, 3).map((word, index) => (
                                    <div key={index}>{word}
                                        <button onClick={() => handleDeleteNumber(index)}>
                                            <span className="material-symbols-outlined text-red-600 ml-2 align-middle">
                                                remove_circle
                                            </span>
                                        </button>
                                    </div>
                                ))}
                                {userNumbers.length > 2 && showMaxMessage && (
                                    <div className="text-red-600 text-center font-medium text-xl">Максимум 3 элемента</div>
                                )}
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <Input
                                placeholder="Название для доп. текста"
                                value={bigWord}
                                onChange={handleBigChange}
                            />
                            <div className="absolute right-[-50px] top-5">
                                <span title="Добавляет вашем айтемам доп. поле с возможностью ввести большой текст" className="material-symbols-outlined">
                                    info
                                </span>
                                <span
                                    onClick={addBig}
                                    className="material-symbols-outlined">
                                    add
                                </span>
                            </div>
                            <div className="mt-3">
                                {bigWords.slice(0, 3).map((word, index) => (
                                    <div key={index}>{word}
                                        <button onClick={() => handleDeleteBigWord(index)}>
                                            <span className="material-symbols-outlined text-red-600 ml-2 align-middle">
                                                remove_circle
                                            </span>
                                        </button>
                                    </div>
                                ))}
                                {bigWords.length > 2 && showMaxMessage && (
                                    <div className="text-red-600 text-center font-medium text-xl">Максимум 3 элемента</div>
                                )}
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <Input
                                placeholder="Название для да/нет"
                                value={forBool}
                                onChange={handleBoolChange}
                            />
                            <div className="absolute right-[-50px] top-5">
                                <span title="Добавляет вашем айтемам доп. поле с возможностью указать два варианта да или нет" className="material-symbols-outlined">
                                    info
                                </span>
                                <span
                                    onClick={addBool}
                                    className="material-symbols-outlined">
                                    add
                                </span>
                            </div>
                            <div className="mt-3">
                                {forBools.slice(0, 3).map((word, index) => (
                                    <div key={index}>
                                        {word}
                                        <button onClick={() => handleDeleteBool(index)}>
                                            <span className="material-symbols-outlined text-red-600 ml-2 align-middle">
                                                remove_circle
                                            </span>
                                        </button>
                                    </div>
                                ))}
                                {forBools.length > 2 && showMaxMessage && (
                                    <div className="text-red-600 text-center font-medium text-xl">Максимум 3 элемента</div>
                                )}
                            </div>
                        </div>
                        <div className="relative cursor-pointer">
                            <Input
                                placeholder="Название для доп. даты"
                                value={date}
                                onChange={handleDate}
                            />
                            <div className="absolute right-[-50px] top-5">
                                <span title="Добавляет вашем айтемам доп. поле с возможностью указать дату" className="material-symbols-outlined">
                                    info
                                </span>
                                <span
                                    onClick={addDate}
                                    className="material-symbols-outlined">
                                    add
                                </span>
                            </div>
                            <div className="mt-3">
                                {dates.slice(0, 3).map((word, index) => (
                                    <div key={index}>
                                        {word}
                                        <button onClick={() => handleDeleteDate(index)}>
                                            <span className="material-symbols-outlined text-red-600 ml-2 align-middle">
                                                remove_circle
                                            </span>
                                        </button>
                                    </div>
                                ))}
                                {dates.length > 2 && showMaxMessage && (
                                    <div className="text-red-600 text-center font-medium text-xl">Максимум 3 элемента</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-5">
                    <Button type="submit">

                        Изменить

                    </Button>
                </div>
            </form>
        </div>
    );
}
export default ChangeCatalog