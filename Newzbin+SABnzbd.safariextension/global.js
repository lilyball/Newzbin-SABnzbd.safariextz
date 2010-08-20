safari.application.addEventListener("command", commandHandler, false);
safari.application.addEventListener("validate", validateHandler, false);

function commandHandler(event) {
    if (event.command == "addnzb") {
        // open the image in TinEye
        // the window is event.target.contextMenu.tab.browserWindow
        submitURLToSABnzbd(event.userInfo);
    }
}

function validateHandler(event) {
    if (event.command == "addnzb") {
        // validate the menu item
        // event.target.disabled = true to disable
        // if safari.application.activeBrowserWindow.activeTab.url is undefined, we're not on our page
        if (safari.application.activeBrowserWindow.activeTab.url) {
            event.target.disabled = !(safari.extension.secureSettings.apikey && extractNewzbinPostID(event.userInfo));
        } else {
            event.target.disabled = true;
        }
    }
}

function extractNewzbinPostID(url) {
    var re = new RegExp("^https?://(?:www\\.)newzbin\\.com/browse/post/(\\d+)");
    var match = re.exec(url)
    return match && match[1]
}

function submitURLToSABnzbd(url) {
    var host = safari.extension.settings.host;
    var apikey = safari.extension.secureSettings.apikey;
    var id = extractNewzbinPostID(url);
    if (!host || !apikey || !id) return;
    var req = new XMLHttpRequest();
    var url = "http://" + host + "/sabnzbd/api?mode=addid&name=" + escape(id) + "&output=xml&apikey=" + escape(apikey);
    req.open("GET", url);
    req.send();
}
