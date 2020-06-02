
export const Viewer = {
    init: async function(canvas, pdfState) {
        //$(`#${canvas}`).scroll($(window).scroll);
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
        $('#in_page').change(function(){
            const valid = $(this).val().match(/[0-9]+/);
            if(valid != null && parseInt(valid) > 0 && parseInt(valid) <= pdfState.numPages){
                pdfState.currentState.currentPage = parseInt(valid)
                pdfState.refreshPage()
            }else
                $(this).val(`${pdfState.currentState.currentPage}`)
            
        })
        $('#btn_change_layout').click(function(){
            if($(this).attr('layout') === 'columns'){
                $(this).children().closest('i').attr('class', 'fa fa-list')
                $(this).attr('layout', 'list')
                /*
                for(let i = pdfState.currentState.currentPage-1; i>0; i--){
                    let can = document.createElement('canvas');
                    let firstcan = document.getElementById('pdf_renderer')
                    $(can).attr('id', 'pdf_renderer_'+i)
                    window.initPage(i)
                    setTimeout(()=>$('#pdf_pages').prepend(can), 500)
                }
                */

            }else{
                $(this).children().closest('i').attr('class', 'fa fa-columns')
                $(this).attr('layout', 'columns')
            }
        })
        let width = 70;
        let height = 100;
        window.updatePage = function(){
            $('#in_page').val(pdfState.currentState.currentPage)
            pdfState.refreshPage()
        }
        window.updateLabZoom = function(){
            const zoom = this.window.getZoom(width)
            pdfState.currentState.zoom = zoom;
            console.log(`Zoom = ${zoom}`);
            
            $('#lab_zoom').html(` ${width}% `)
        }
        window.getZoom = (val) => {
             switch(val){
                case 30: return 1
                default: return (5*val)/100
            }
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
    },
    isPhone: () => {
        return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    }
}

