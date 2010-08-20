window.addEventListener("contextmenu", menuHandler, false);

function menuHandler(event) {
    var userInfo = event.target.href;
    if (!userInfo && event.target.parentNode) {
        userInfo = event.target.parentNode.href;
    }
    safari.self.tab.setContextMenuEventUserInfo(event, userInfo || null);
}
