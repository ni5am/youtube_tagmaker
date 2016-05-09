chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        console.log(url);

        //이게 유튜브면 활성화~ 아이콘 색변경하기
        //
    });
});

