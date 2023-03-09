export default function Container({ children, className='' }) {
    return ( 
        // <div className={'flex justify-between max-w-7xl mx-auto' + ' ' + className }>
        <div className={className + ' ' + 'max-w-7xl mx-auto'}>
            {children}
        </div>
    )
}