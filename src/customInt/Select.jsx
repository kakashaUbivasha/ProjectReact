function Select({ options,onChange }){
    return(
        <select className="border border-gray-300 rounded px-3 py-1 mt-3 w-[200px]" onChange={onChange}>
            {options.map((option, index) => (
                <option className="hover:bg-purple-300" key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}
export default Select