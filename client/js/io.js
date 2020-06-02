var socket = io();
let file = null;

export const pipe = {
    init: (url, pdfState) => {
        file = url
        socket.emit('/sweet/viewer/init', {file: url})

        socket.on('/sweet/viewer/new?'+url, (msg) => {
            console.log(msg);
            pdfState.updateNbrUsers(parseInt(msg.data))
        })
        if(pdfState.canApplyPage)
            socket.on('/sweet/viewer/page?'+url, (msg) => {
                pdfState.currentState.currentPage = msg.data.page;
                pdfState.refreshPage();
                window.updatePage()
            });
        if(pdfState.canApplyPosition)
            socket.on('/sweet/viewer/position?'+url, (msg) => {
                pdfState.doscroll(msg.data);
                //pdfState.refreshPage();
            })
    },
    sendPosition: async (e) => {
        socket.emit('/sweet/viewer/position', {
            file: file,
            data: e
        })
    },
    sendPage: async (pageData) => {
        socket.emit('/sweet/viewer/page', {
            file: file,
            data: pageData
        })
        
    }
};