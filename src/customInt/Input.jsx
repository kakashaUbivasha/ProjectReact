import PropTypes from 'prop-types';
function Input({ inputType, placeholder, onChange,value, additionalClasses }){
    const classNames = `border w-[300px] rounded p-2 block mt-3 border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-purple-500 ${additionalClasses}`
    return (
        <input
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={classNames}
        />
    );

}
Input.propTypes= {
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func
}
export default Input