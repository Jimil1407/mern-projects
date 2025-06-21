import { useEffect, useState } from "react";

function Topbar() {
    const [currentTab, setCurrentTab] = useState(1);
    const [tabData, setTabData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchTabData = async (tabId) => {
        setLoading(true);
        try {
            const res = await fetch("https://jsonplaceholder.typicode.com/todos/" + tabId);
            const json = await res.json();
            setTabData(json);
        } catch (error) {
            console.error("Failed to fetch tab data", error);
        }
        setLoading(false);
    };

    const changeTab = (tabId) => {
        setCurrentTab(tabId);
        fetchTabData(tabId);
    };

    // Fetch the default tab (only on first render)
    useEffect(() => {
        fetchTabData(currentTab);
    }, []); // Empty dependency array: only runs once

    return (
        <div>
            {[1, 2, 3, 4].map((tab) => (
                <button
                    key={tab}
                    onClick={() => changeTab(tab)}
                    style={{ color: currentTab === tab ? "red" : "black" }}
                >
                    Todo {tab}
                </button>
            ))}
            <br />
            {loading ? "loading..." : tabData.title}
        </div>
    );
}

export default Topbar;
