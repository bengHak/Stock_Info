(function () {
    `use strict`;

    const DOM = {};
    const isIncognito = whale.extension.inIncognitoContext;

    function init() {
        initElement();
        initEvent();
        restoreSidebarPlayer()
            .then(updateUI);
    }

    function initElement() {
        DOM.playerModeCheckbox = document.getElementById(`player-mode-checkbox`);
        DOM.bringHereWrapper = document.getElementById(`bring-player-here`);
        DOM.openLocalMusicPlayer = document.getElementById(`local-musicplayer`);
        DOM.playerModeWrapper = document.getElementById(`setting-bar`);

        if (isIncognito) {
            DOM.openLocalMusicPlayer.querySelector(`span.desc1`).textContent = whale.i18n.getMessage(`INCOGNITO_NOT_SUPPORTED`);
            DOM.openLocalMusicPlayer.querySelector(`span.action`).style.display = `none`;
        }
    }

    function initEvent() {
        DOM.playerModeCheckbox.addEventListener(`change`, onChangeCheckBox, false);
        DOM.bringHereWrapper.addEventListener(`click`, bringPlayerHere, false);
        if (isIncognito === false) {
            DOM.openLocalMusicPlayer.addEventListener(`click`, openLocalMusicPlayer, false);
        }
        window.addEventListener(`dragover`, preventLinkDragNDrop, false);
        window.addEventListener(`drop`, preventLinkDragNDrop, false);
        document.querySelectorAll(`.servcie-links button`).forEach(node => {
            node.addEventListener(`click`, onClickServiceLink, false);
        });
        wl.Storage.listen([`mode`, `parentWindowId`, `playerWindowId`], updateUI);
    }

    function refinePlayerUrl(playerUrl) {
        let result = playerUrl;
        if (playerUrl.includes(`music.bugs.co.kr`)) {
            // [whale-bug/#320] when restoring music.bugs.co.kr music player,
            // if trackId=xxxxxx is included in url parameter
            // new music is added to list every time player is reloaded
            //result = playerUrl.replace(/trackId=[A-Za-z0-9]+&/, ``);

            // [whale-bug/#2066]
            // there are cases with more complex url patterns
            // just use the basic player URL on bugs
            result = `https://music.bugs.co.kr/newPlayer?autoplay=true&html5=true`;
        } else if (playerUrl.includes(`www.mnet.com`)) {
            // [whale-bug/#2066]
            // same problem with mnet player
            result = `http://www.mnet.com/player/aod/`;
        }
        return result;
    }

    function restoreSidebarPlayer() {
        return getPlayerMode()
            .then(result => {
                if (result.playerUrl && result.currentlyDocked !== true) {
                    return wl.Storage.set({
                        mode: `sidebar`
                    }).then(() => {
                        whale.windows.create({
                            type: `popup`,
                            url: refinePlayerUrl(result.playerUrl)
                        });
                    });
                }
                return false;
            });
    }

    function updateUI() {
        getPlayerMode().then(result => {
            const isSidebarMode = result.mode === `sidebar`;
            DOM.playerModeCheckbox.checked = isSidebarMode;

            if (result.currentlyDocked === true) {
                DOM.playerModeWrapper.style.display = `none`;
                DOM.bringHereWrapper.style.display = `block`;
            } else {
                DOM.playerModeWrapper.style.display = `block`;
                DOM.bringHereWrapper.style.display = `none`;
            }
        });
    }

    function getPlayerMode() {
        return wl.RuntimeMessage.send(`musicplayer`, {
            action: `getPlayerMode`
        });
    }

    function bringPlayerHere() {
        whale.windows.getCurrent(windowInfo => {
            wl.RuntimeMessage.send(`musicplayer`, {
                action: `moveSidebarPlayer`,
                windowId: windowInfo.id
            });
        });
    }

    function openLocalMusicPlayer() {
        // TODO, make local music player singleton
        location.href = whale.runtime.getURL(`local-player/index.html`);
    }

    function onClickServiceLink(event) {
        wl.RuntimeMessage.send(`musicplayer`, {
            action: `getServiceInfo`,
            param: {
                id: event.currentTarget.className
            }
        }).then(result => {
            whale.tabs.create({
                url: result.serviceUrl
            });
        });
    }

    function onChangeCheckBox(event) {
        event.preventDefault();
        wl.Storage.set({
            mode: event.currentTarget.checked ? `sidebar` : `popup`
        });
        return false;
    }

    function preventLinkDragNDrop(e) {
        e = e || event;
        e.preventDefault();
        e.dataTransfer.effectAllowed = `none`;
        e.dataTransfer.dropEffect = `none`;
    }

    window.addEventListener(`load`, init, false);
})();
