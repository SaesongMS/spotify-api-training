export default function UserCard(props) {
    return (
        <div className="h-128 flex flex-col rounded-lg overflow-hidden bg-white shadow">
            <img className="w-full h-64 object-contain" src={props.url} alt=""/>
            <div className="flex-1 px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <div className="text-gray-700 text-base flex flex-col">
                    <span className="font-bold">Followers: {props.followers}</span>
                </div>
            </div>
        </div>
    )
}