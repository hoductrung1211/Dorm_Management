
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function IndexPage() {
    const [value, setValue] = useState('')
    const router = useRouter();

    function handleClick() {
        if (value == '123'){
            router.push({
                pathname: "",
                
            })
        } // thanh cong
        else {

        }
    }

    return (
        <>
            <input onChange={e => setValue(e.target.value)} value={value} />
            <button onClick={handleClick}>
                Click
            </button>
            <br />
            <Link href={{
                pathname: "test/about",
                query: {
                    username: 'n19dccn'
                }
            }}>
                This is a Link compoent 
            </Link>
        </>
    )
}   