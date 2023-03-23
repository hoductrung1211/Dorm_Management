export default function Dashboard({
    tabs,
    selectedId,
    handleChangeTab,
    children,
}) {

    // 

    return (
        <section className="h-full flex flex-col">
            {/* Tab Navigations  */}
            <nav className="flex z-10">
            {tabs.map(tab => 
                <TabNavigation 
                    key={tab.id} 
                    tab={tab} 
                    handleChangeTab={handleChangeTab}
                    selected={tab.id === selectedId} />
            )}
            </nav>

            <section className="-mt-0.5 h-full border-ec border-2 rounded-tr-2xl rounded-b-2xl">
                {children}
            </section>
        </section>
    )
}

function TabNavigation({
    tab,
    selected,
    handleChangeTab,
}) {
    let classname = "w-40 h-14 grid place-items-center border-ec  border-2 rounded-tl-xl rounded-tr-xl bg-ec cursor-pointer";
    if (selected) 
        classname += " bg-white border-b-white"
    
    return (
        <div 
            className={classname}
            onClick={() => handleChangeTab(tab.id)}>
            {tab.text}
        </div> 
    )  
}