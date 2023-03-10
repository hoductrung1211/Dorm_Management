import Link from "next/link";
import { useRouter } from "next/router";

export default function AboutPage() {
    const router = useRouter();

    const {
        query: {id},
    } = router;

    return (
        <>
            <div>About us: {id}</div>
            <Link href={{
                pathname: '/test',
            }}>Go back to test</Link>
        </>
    )
}