import Link from "next/link";
import { useRouter } from "next/router";

export default function AboutPage() {
    const router = useRouter();
    const username = router.pathname

    return (
        <>
            This is {username}
        </>
    )
}