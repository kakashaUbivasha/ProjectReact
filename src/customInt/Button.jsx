import PropTypes from 'prop-types';
function Button({children, onClick, additionalClasses}){
    const classNames = `bg-transparent mt-3 hover:bg-purple-200 text-purple-700 font-semibold hover:text-black py-2 px-4 border border-purple-500 hover:border-transparent rounded ${additionalClasses}`;
    return(
        <button
            className={classNames}
            style={{ width: '200px' }}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.string,
    onClick: PropTypes.func,
    additionalClasses: PropTypes.string
};
export default Button