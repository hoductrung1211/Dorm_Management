
import Image from 'next/image'; 
export default function IndexPage() {
    const myLoader = ({ src, width, height }) => {
        return `https://picsum.${src}/200/300`
    }

    return (
        <div className='w-92 h-40 relative'>
            <Image 
                loader={myLoader}
                src="photos"
                width={200}
                height={300}
                alt="test"
        />
        </div>
    )
}   