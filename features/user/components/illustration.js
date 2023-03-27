import Image from "next/image"

export default function Illustration({imgUrls}) {
    return (
        <div className='relative flex'>
            {imgUrls.map(url => 
                <Image
                    className='object-fit'
                    src={url}
                    alt='dorm illustration'
                    width={350}
                    height={525}
                />
            )}
        </div>
    )
}