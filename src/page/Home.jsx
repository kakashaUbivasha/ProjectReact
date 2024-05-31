import {Link, useNavigate} from "react-router-dom";
import Button from "../customInt/Button.jsx";
import {useContext, useEffect} from "react";
import {Context} from "../main.jsx";
import HomeItems from "../components/HomeItems.jsx";
function Home(){
    const navigate = useNavigate();
    const {allInfo} =useContext(Context)
    useEffect(()=>{
        allInfo.loadCurrentUser()
    })
    return(
        <div className="mt-52 flex flex-col items-center text-center w-[1200px] m-auto">
            <h1 className="font-medium text-5xl">ItemVault</h1>
            <p className="mt-5">Добро пожаловать ItemVault, веб-приложение для создания коллекций! Здесь вы можете легко и удобно организовывать свои коллекции различных предметов, будь то любимая музыка, увлекательные книги, ценные марки или что-то еще.</p>
            <p className="mt-5">Создайте свои собственные коллекции, добавляйте новые айтемы, редактируйте их информацию и делитесь своими коллекциями с друзьями. Наше приложение предлагает простой и интуитивно понятный интерфейс, который позволит вам легко управлять вашими коллекциями, а также наслаждаться процессом создания и обновления вашего собственного архива.</p>
            <p className="mt-5">Независимо от того, являетесь ли вы коллекционером-энтузиастом или просто любите сохранять важные для вас вещи, наше веб-приложение для создания коллекций станет вашим надежным помощником в организации и управлении вашими увлечениями и интересами. Давайте вместе создадим уникальные и вдохновляющие коллекции</p>
            {/*<Button onClick={handleCreate} additionalClasses="text-center mb-3">Создать коллекцию</Button>*/}
           <Link to="/account"> <Button additionalClasses="text-center mb-3">Создать коллекцию</Button></Link>
            <HomeItems/>
        </div>
    )
}
export default Home