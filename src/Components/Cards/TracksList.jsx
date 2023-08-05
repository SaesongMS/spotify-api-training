export default function TrackList(props){
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
                        {props.album}
                    </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {props.preview && <button className="focus:outline-none" onClick={() => props.preview ? window.open(props.preview) : alert("No preview available")}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500 hover:text-green-600 dark:hover:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                    </button>}
                </div>
            </div>
        </li>
    )
}