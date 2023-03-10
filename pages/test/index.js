
import Link from 'next/link';

export default function IndexPage() {
    return (
        <ul>
            <li>
                <Link href='/test'>Home</Link>
            </li>

            <li>
                <Link 
                    href={{
                        pathname: '/test/[slug]',
                        query: {
                            id: "123"
                        }
                    }}
                    as='test/my-slug'
                >First Route
                </Link>
            </li>

            <li>
                <Link 
                    href={{
                        pathname: '/test/my-folder/[id]',
                        query: {
                            example: "aaa"
                        }
                    }}
                    as='test/my-folder/my-id'
                >Second Route
                </Link>
            </li>

        </ul>
    )
}