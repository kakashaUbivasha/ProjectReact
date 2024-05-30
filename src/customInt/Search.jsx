import {useState} from "react";
import {useNavigate} from "react-router-dom";
function Search(){
    const [search, setSearch] = useState('')
    let navigate = useNavigate()
    function handleSearch(s){
        navigate(`/search-results?q=${s}`)
    }
    return(
        <div className="flex relative">
            <div className="relative flex justify-between items-center m-auto">
                <input
                    placeholder="Найти коллекцию"
                    className="w-[400px] p-2 border rounded-3xl border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                    type="text"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button
                onClick={()=>handleSearch(search)}
                >
                    <span className="material-symbols-outlined absolute right-[10px] top-1/2 transform -translate-y-1/2 ">
        search
    </span>
                </button>

            </div>

        </div>
    )
}
export default Search