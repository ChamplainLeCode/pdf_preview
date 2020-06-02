import { Viewer } from "./viewer.module.js";

export const pdfState = {
    numPages: 0,
    canvasId: '',
    canSendPosition: false,
    canSendPage: false,
    canApplyPosition: false,
    currentState : {
        pdf: null,
        zoom: 4.5,
        currentPage: 0,
        height: 0,
        width: 0,
        position: {
            x: 0,
            y: 0
        },
    },
    set: function(pdfStateItem, pdfStateValue){
        this[pdfStateItem] = pdfStateValue;
        return this;
    },
    refreshPage: function() {
        this.currentState.pdf.getPage(this.currentState.currentPage).then((page) => {
            let canvas = document.getElementById(this.canvasId);
            let ctx = canvas.getContext('2d');
            console.log(`Zoom = ${this.currentState.zoom}`);
            console.log(Viewer.isPhone())
            let viewport = page.getViewport( Viewer.isPhone() ? 1 : this.currentState.zoom);
    //        console.log(viewport);
            canvas.width = viewport.width;
            canvas.height = viewport.height;
    
            this.currentState.height = viewport.height
            this.currentState.width = viewport.width
            page.render({
                canvasContext: ctx,
                viewport: viewport
            });
            this.pageChanged()
            
    
        });
    },
    updateNbrUsers: (pas) => {
        console.log(pas)
        $('#nb_users p').html(`${parseInt(pas)}`)
    },
    pageChanged: function(){if(this.canSendPage && this.onPageChange !== null)this.onPageChange({page: this.currentState.currentPage})},
    onPageChange: (e) => console.log(e),
    scroll: async function(e) { if(this.onscroll !== null && this.canSendPosition == true) await this.onscroll(e)},
    onscroll: async (e) => console.log(e),
    doscroll: function(e){
        document.getElementById('pdf_parent').parentElement.style.width = e.width
        document.getElementById('pdf_parent').parentElement.style.height = e.height
        if(this.canApplyPosition) $(window).scrollTop(e.y)
    }
}
