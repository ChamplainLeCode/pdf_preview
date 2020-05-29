var socket = io();
let file = null;

export const pipe = {
    init: (url, pdfState) => {
        file = url
        if(pdfState.canApplyPage)
            socket.on('/sweet/viewer/page?'+url, (msg) => {
                console.log('Page received from server ');
                pdfState.currentState.currentPage = msg.data.page;
                pdfState.refreshPage();
                window.updatePage()
            });
        if(pdfState.canApplyPosition)
            socket.on('/sweet/viewer/position?'+url, (msg) => {
                console.log('Position received from server ');
                pdfState.doscroll(msg.data);
                //pdfState.refreshPage();
            })
    },
    sendPosition: async (e) => {
        console.log('Data to send'+JSON.stringify(e));
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