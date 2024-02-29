export const TextWithHover = ({ displayText, active, onClick}) => {
    return (
        <div className="flex items-center justify-start cursor-pointer ">
            <div>
                <div className={`${active? "text-white border-2 bg-black p-2 rounded-lg" : "text-black"} text-sm font-semibold hover:text-white`} onClick={onClick}>{displayText}</div>
            </div>
        </div>
    )
};
