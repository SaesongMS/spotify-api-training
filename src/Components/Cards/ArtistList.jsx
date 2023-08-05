export default function ArtistsList(props){
    return(
        <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <a href={props.url}>
                        <img className="w-8 h-8 rounded-full" src={props.image} alt={props.name +" picture"}/>
                    </a>
                </div>
                <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                    <a href={props.url}>
                        {props.name}
                    </a>
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {props.genres.length!==0 && props.genres[0]}
                </p>
                </div>
            </div>
        </li>
    )
}