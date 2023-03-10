export default function MyDynamicPage({ example }) {
    return <div>My example is {example}</div>
}

MyDynamicPage.getInitialProps = ({ query: {example}}) => {
    return {example}
}