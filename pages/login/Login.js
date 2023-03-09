import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';


export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <section>

            </section>
            <section>
                <form method='post'>
                    <InputGroup
                        text="Identifier"
                        textValue={id}
                        onChange={textValue => setId(textValue)}
                    >
                        <Image 
                            style={{
                                fill: 'red',
                                
                            }}
                            src="/input/user-solid.svg"
                            width={20}
                            height={20}
                        />
                    </InputGroup>

                    <InputGroup
                        text="Password"
                        textValue={password}
                        onChange={textValue => setPassword(textValue)}
                    >
                        
                    </InputGroup>
                </form>
            </section>
        </>
    )
}

function InputGroup({
    text, 
    textValue,
    onChange,
    children,
}) {
    return (
        <div className='input-group'>
            <p>{text}</p>
            <input 
                value={textValue}
                onChange={e => onChange(e.target.value)}
            />
            {children}
        </div>
    )
}