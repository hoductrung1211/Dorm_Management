import { useRouter } from "next/router"
export default function MessageDialog({
    title,
    desc,
    buttonName,
    url
}){
    
    const router= useRouter()

    return(
        <div className="bg-gray-200 flex h-screen items-center justify-center">
            <div class="w-full md:w-1/3 mx-auto">
                <div class="flex p-5 rounded-lg shadow bg-white">
                    <div>
                        <svg class="w-6 h-6 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"/></svg>
                    </div>
                    <div class="ml-3">
                        <h2 class="font-semibold text-2xl text-gray-800">{title}</h2>
                        <p class="mt-2 text-lg text-gray-600 leading-relaxed">{desc}</p>
                    </div>
                </div>
                {buttonName != undefined && (
                    <div class="flex items-center mt-3">
                        <button onClick={()=>{
                            router.push(url)
                        }} class="flex-1 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium rounded-md">
                            {buttonName}
                        </button>
                    </div>
                )}
            </div>
        </div>  
    )
}