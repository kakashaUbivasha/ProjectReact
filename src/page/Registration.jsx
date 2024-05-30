import Input from "../customInt/Input.jsx";
import Button from "../customInt/Button.jsx";
import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
function Registration(){
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const[successR,setSuccessR] = useState('')
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', {
                name: name,
                email: email,
                password: password,
            });

            localStorage.setItem('token', response.data.token);

            setSuccessR('Вы успешно зарегистрировались');

            setRedirectToLogin(true);
        } catch (error) {
            console.log(error)
            if (error.response && error.response.status === 409) {
                setErrorMessage('Пользователь уже зарегистрирован.');

            } else {
                console.log(error)
                setErrorMessage('Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.');
            }
        }
    };
    return(
        <div className="border shadow-md rounded-2xl mt-[25vh] w-[400px] m-auto p-5">
            {redirectToLogin && <Navigate to="/account" />}
            <h1 className="text-center my-3 font-bold text-3xl">Регистрация</h1>
            <div className="flex justify-center">
                <form className="text-center">
                    <Input
                        onChange={e=>setEmail(e.target.value)}
                        inputType="email"
                        placeholder="Введите email"
                        value={email}
                    />
                    <Input
                        onChange={e=>setName(e.target.value)}
                        inputType="email"
                        placeholder="Введите имя"
                        value={name}
                    />
                    <Input
                        onChange={e=>setPassword(e.target.value)}
                        value={password}
                        inputType="password"
                        placeholder="Введите пароль" />
                    <Button
                        onClick={handleLogin}
                    >Зарегистрироваться</Button>
                    {errorMessage && <p className="text-danger text-center mt-2">{errorMessage}</p>}
                    {successR && <p className="text-success text-center mt-2">{successR}</p>}
                    <p className="text-center font-medium mt-3"><Link to="/autorization">Войти</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Registration