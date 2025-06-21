import { useState } from "react";

const ToggleMessage = () => {
    let [notificationCount, setNotification] = useState(0);

    console.log("re-render");
    function increment(){
        setNotification(notificationCount+1);
    }

    return (
        <div>
            <button onClick={increment}>
                Increase Count
            </button>
            {notificationCount}
        </div>
    )
}

export default ToggleMessage;

