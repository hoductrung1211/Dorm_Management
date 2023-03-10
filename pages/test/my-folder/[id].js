export default function MyDynamicPage({ id }) {
    return <div>My example is {id}</div>
}

MyDynamicPage.getInitialProps = ({ query: {id}}) => {
    return {id}
}