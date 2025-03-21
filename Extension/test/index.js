async function sayHello() {
    let [tab] = await chrome.tabs.query({
        active: true
    });

    chrome.scripting.executeScript({
        target: { tabId: tab.id},
        function: () => {
            alert("Hello From My Extension");
        }
    });
}

document.getElementById("button").addEventListener("click", sayHello);