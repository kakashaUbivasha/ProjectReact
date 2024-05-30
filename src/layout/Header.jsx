import Search from "../customInt/Search.jsx";
import {Link, useNavigate} from "react-router-dom";
import {Context} from "../main.jsx";
import {useContext, useEffect} from "react";
import {observer} from "mobx-react";
const Header = observer(()=>{
const {allInfo} =useContext(Context)
    const navigate = useNavigate()
let token = localStorage.getItem('token')
    let addStyles = `material-symbols-outlined cursor-pointer text-black `
useEffect(()=> {
    },[allInfo.status||token]
)
    if(!allInfo.getUserStatus||token){
    addStyles = addStyles + `mt-2`
    }
    return(
        <div className="z-50 absolute top-0 right-0 left-0 bg-gradient-to-b from-purple-300 to-blue-300 p-2">
            <div className="flex justify-between mx-5">
            <div className="items-center flex">
                <Link to="/">
                <span className="material-symbols-outlined text-2xl text-black cursor-pointer">
                home
                </span>
                </Link>
            </div>
            <Search/>
            <div className="flex flex-col items-center">
                <div className="flex items-center">
                <Link to="/account">
                    <span className={addStyles}>
                person
                </span>
                </Link>


                </div>

                {allInfo.getUserStatus && <p className=""><Link to="/autorization">войти</Link>/<Link to="/registration">зарегистрироваться</Link></p>}
            </div>
            </div>
        </div>
    )
})
export default Header