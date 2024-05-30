
import Input from "../customInt/Input.jsx";
import Button from "../customInt/Button.jsx";
import {Link, Navigate} from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Context} from "../main.jsx";
function Authorization(){
    const {allInfo} = useContext(Context)
    const token = localStorage.getItem('token')
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [errorMessage, setErrorLogin] = useState('')
    useEffect(()=>{
    allInfo.loadCurrentUser(token)
    },[])
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleLogin = (event) => {
        event.preventDefault();
        let userData = {
            email: email,
            password: password,
            status: 'active'
        };
        console.log(userData);
        axios.post('https://backforprojectreact.onrender.com/api/users/login',userData)
            .then((response)=>{
                    console.log(response)
                    localStorage.setItem('token', response.data.token);
                    setRedirectToLogin(true)
                }
            )
            .catch(e=>{
                if(e.response&&e.response.status === 401){
                    setErrorLogin('Неверная почта или пароль павторите попытку')
                }
                else if(e.response&&e.response.status === 403){
                    setErrorLogin('Аккаунт заблокирован')
                }
                else{
                    setErrorLogin('Упс, что-то пошло не так, повторите попытку позже')
                }
            })
    };
    return(
        <div className="border shadow-md rounded-2xl mt-[25vh] w-[400px] m-auto p-5">
            {redirectToLogin && <Navigate to="/account" />}
            <h1 className="text-center my-3 font-bold text-3xl">Авторизация</h1>
            <div className="flex justify-center">
                <form className="text-center">
                    <Input
                        inputType="email"
                        placeholder="Введите email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <Input
                        inputType="password"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <Button
                        onClick={handleLogin}
                    >Войти</Button>
                    {errorMessage && <h5 className="text-red-500 text-center mt-4">{errorMessage}</h5>}
                    <p className="text-xl text-center font-medium mt-3"><Link to="/registration">Зарегестрироваться</Link></p>
                </form>
            </div>
        </div>
    )
}
export default Authorization
