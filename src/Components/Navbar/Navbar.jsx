import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar(){

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }
    const handleArtistClick = () => {
        navigate("/artist");
    }
    const handleProfileClick = () => {
        navigate("/profile");
    }

    const [open, setOpen] = useState(false);

    return(
        <div className='shadow-md w-full sticky top-0 left-0 bg-gray-900'>
           <div className='md:flex items-center justify-between py-4 md:px-10 px-7 max-w-7xl mx-auto'>
            {/* logo section */}
            <div className='font-bold text-2xl cursor-pointer flex items-center gap-1' onClick={handleClick}>
                <img src="Spotify_Icon_RGB_Green.png" alt="Spotify Logo"  className="h-8 mr-3"/>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Spotify API</span>
            </div>
            {/* Menu icon */}
            <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-800 hover:text-blue-400 duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {
                    open ? 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                    : 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />

                }
                </svg>
            </div>
            {/* linke items */}
            <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                <li>
                    <button className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:ml-8 md:my-0 my-7 font-semibold" onClick={handleArtistClick}>Artists</button>
                </li>
                <li>
                    <button className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:p-0 md:ml-8 md:my-0 my-7 font-semibold" onClick={handleProfileClick}>Profile</button>
                </li>
            </ul>
           </div>
        </div>
    );
}

export default Navbar;