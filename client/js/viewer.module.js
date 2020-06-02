
export const Viewer = {
    init: async function(canvas, pdfState) {
        $(`#${canvas}`).scroll($(window).scroll);
        $(window).scroll(function(e){
            pdfState.currentState.position.x = this.window.scrollX
            pdfState.currentState.position.y = this.window.scrollY;
            pdfState.scroll({
                width: pdfState.currentState.width,
                height: pdfState.currentState.height,
                x: pdfState.currentState.position.x,
                y: pdfState.currentState.position.y
            })
        })
        $(`#${canvas}`).swipe({
            swipe:function(event, direction, distance, duration, fingerCount) {
                if(/*direction === 'up' ||*/ direction == 'left' && pdfState.currentState.pdf != null){
                    if( pdfState.currentState.currentPage < pdfState.numPages){
                        pdfState.currentState.currentPage++
                        window.updatePage()
                    }
                }else if(direction == 'right' && pdfState.currentState.pdf != null){
                    if( pdfState.currentState.currentPage > 1){
                        pdfState.currentState.currentPage--
                        window.updatePage()
                    }
                }
            }
        })

        $('#btn_page_next').click(function(){
            if( pdfState.currentState.currentPage < pdfState.numPages){
                pdfState.currentState.currentPage++
                window.updatePage()
            }
        })
        $('#btn_page_previous').click(function(){
            if( pdfState.currentState.currentPage > 1){
                pdfState.currentState.currentPage--
                window.updatePage()
            }
        })
        let width = 70;
        let height = 100;
        window.updatePage = function(){
            $('#in_page').val(pdfState.currentState.currentPage)
            pdfState.refreshPage()
        }
        window.updateLabZoom = function(){
            $('#lab_zoom').html(` ${width}% `)
        }
        $('#btn_zoom_in').click(function(){
            if(width < 100){
                $(`canvas`).css('width', `${width+=10}%`)
                           .css('height', `${height+=10}%`)
                window.updateLabZoom()
            }
        })
        $('#btn_zoom_out').click(function(){
            if(width > 30){
                $(`canvas`).css('width', `${width-=10}%`)
                           .css('height', `${height+=10}%`)
                window.updateLabZoom()
            }
        }).click()
        window.updatePage()
    }
}

