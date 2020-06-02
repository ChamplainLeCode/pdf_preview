import { } from "../node_modules/jquery/dist/jquery.js"
import { } from "../node_modules/jquery-touchswipe/jquery.touchSwipe.js"
import { pipe } from './io.js'
import { pdfState } from './pdf.module.js'
import { Viewer } from './viewer.module.js'

let canvasId = "pdf_renderer"


let query = buildQuery(location.search);
let url = query.url || '';

/**
 * Indique sur quel canvas insérer le visuel
 */
pdfState.set('canvasId', canvasId)
/**
 * Indique si on peut accepter la position du scroll
 */
        .set('canApplyPosition', query.receive == 'true' || false)
/**
 * Indique si on peut accepter la page du remote viewer
 */
        .set('canApplyPage', query.receive == 'true' || false)
/**
 * Indique si on peut envoyer la position du scroll dans la socket
 */
        .set('canSendPosition', query.send == 'true' || false)
/**
 * Indique si on peut envoyer la nouvelle page en cas de changement dans la socket
 */
        .set('canSendPage', query.send == 'true' || false)
/**
 * Ici on ecrit la position du scroll dans la socket 
 */
        .set('onscroll', pipe.sendPosition)
/**
 * Ici on ecrit les données en cas de changement de la page en cours dans la socket
 */
        .set('onPageChange', pipe.sendPage)

        

//console.log('Print start');

pdfjsLib.getDocument(url).then(async (pdf) => {
    pdfState.currentState.pdf = pdf
    pdfState.numPages = pdf._pdfInfo.numPages
    pdfState.currentState.currentPage = 1
    if(pdfState.numPages > 0){
        //pdfState.refreshPage()
        Viewer.init(canvasId, pdfState)
        pipe.init(url, pdfState)
    }
    $('#lab_nb_pages').html(pdfState.numPages)
    
});

function buildQuery(searchParams){
        searchParams = searchParams.split('?').join('')
        searchParams = searchParams.split('&').join('","')
        searchParams = searchParams.split('=').join('":"')
        return JSON.parse('{"'+searchParams+'"}')
}