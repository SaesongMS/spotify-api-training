export default function ArtistCard(props) {
    return (
        <div className="h-128 flex flex-col rounded-lg overflow-hidden bg-white shadow">
            <img className="w-full h-64 object-contain" src={props.url} alt=""/>
            <div className="flex-1 px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.title}</div>
                {props.genres.length!==0 && <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded mb-2">{props.genres[0]}</span>}
                <div className="text-gray-700 text-base flex flex-col">
                    <span className="font-bold">Followers: {props.followers}</span>
                    <span className="font-bold">Popularity: {props.popularity}</span>
                </div>
            </div>
        </div>
    )
}