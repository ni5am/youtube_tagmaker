chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        chrome.tabs.create({
            url: chrome.extension.getURL("options.html")
        });
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if(changeInfo && changeInfo.status == "complete") {
        change();
    }
});

chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    change();
});

function change(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        console.log(url);

        var re = new RegExp("(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=([a-zA-Z0-9\-_]+)");
        if (re.test(url)) {
            chrome.browserAction.setIcon({path: '/icon/icon_48.png'});
            localStorage.setItem('url', url);
        } else {
            chrome.browserAction.setIcon({path: '/icon/icon_48_gray.png'});
            localStorage.removeItem('url');
        }
    });
}

