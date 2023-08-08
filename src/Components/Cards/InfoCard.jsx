export default function InfoCard(props) {
    return (
        <div className="h-128 flex flex-col rounded-lg overflow-hidden bg-white shadow mx-4" onClick={props.onClick}>
            <img className=" w-full h-52 object-contain" src={props.url} alt=""/>
            <div className="flex-1 px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <div className="text-gray-700 text-base flex flex-col">
                    <span className="">{props.text}</span>
                </div>
            </div>
        </div>
    )
}