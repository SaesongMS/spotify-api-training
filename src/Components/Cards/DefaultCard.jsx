export default function DeafultCard(props) {

    const handleClick = () => {
        props.getInfo(props.id);
    }

    return (
        <div className="h-full flex flex-col rounded-lg overflow-hidden bg-white shadow mx-6">
            <img className="w-full h-64 object-contain" src={props.url} alt=""/>
            <div className="flex-1 px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.title}</div>
                {props.genres.length!==0 && <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded mb-2">{props.genres[0]}</span>}
                <p className="text-gray-700 text-base">{props.type}</p>
            </div>
            <div className="px-6 py-4 bg-gray-100">
                <button type="button" onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Get Top Stats</button>
            </div>
        </div>
    )
}