interface props {
    label : string,
    placeholder : string,
    className : string,
    value : string,
    setValue : any
}
const TextInputArea = ({label , placeholder, className, value, setValue} : props) => {
    return (
        <div className={`textInputDiv flex flex-col space-y-2 w-full font-mono`}>
            <label className={`font-semibold ${label}`}>{label}</label>
            <textarea id={label} value = {value} onChange = {(e) => { setValue(e.target.value);}} placeholder={placeholder} className={`p-2 border text-black border-gray-400 border-solid rounded placeholder-gray-500 ${className}`}/>
        </div>
        
    ) 
    
};

export default TextInputArea;