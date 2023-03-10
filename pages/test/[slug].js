import { useRouter } from "next/router";

export default function DynamicPage() {
    const router = useRouter();
    const {
        query: {id},
    } = router;

    return <div>The dynamic route is {id}</div>
}