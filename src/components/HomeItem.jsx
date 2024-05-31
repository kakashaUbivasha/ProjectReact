import Button from "../customInt/Button.jsx";
import {useNavigate} from "react-router-dom";
import Blank from "/public/blank-profile-picture.webp"
function HomeItem({item}){
    const navigate = useNavigate()
    function truncateString(str) {
        if (str.length > 20) {
            return str.substring(0, 20) + '...';
        }
        return str;
    }
    function toItem(item){
        navigate(`/catalog/${item}`)
    }
    return(
        <div className="flex flex-col items-center mb-5 border border-purple-300 w-[250px] p-5 min-h-[500px] relative ">
            <img className="max-h-[200px] max-w-[200px] mb-2" src={Blank} alt="blank-picture"/>
            <p>Название: {item.name}</p>
            <p title={item.description}>Описание: {truncateString(item.description)}</p>
            <p>Категория: {item.category}</p>

                <Button
                    onClick={()=>toItem(item.id)}
                    additionalClasses="absolute bottom-5 z-20 bg-white"
                >
                    Перейти
                </Button>


        </div>
    )
}
export default HomeItem