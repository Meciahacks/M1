import QRCode from 'qrcode';
import PocketBase from 'pocketbase';

import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
const pb = new PocketBase('https://meciadb.pockethost.io/');
const drawCText=(canvas, ctx, text) =>{
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    ctx.fillStyle = '#000'; // Set the text color (Fluorescent Orange)
    ctx.font = 'bold 40px Arial'; // Set the font and size

    const textMetrics = ctx.measureText(text);
    console.log(canvas.width);
    
    const textWidth = textMetrics.width;
    const textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
    const x = (canvasWidth - textWidth) / 2;
    const y = (canvasHeight + textHeight);

    console.log(x,y);    
    ctx.fillText(text, x, y+20);
}
async function generateQrCodeWithBgImage(text,  outputFilePath) {
    const canvas = createCanvas(400, 400); // Create a canvas
    const ctx = canvas.getContext('2d');
    // const bgImage = await loadImage(bgImagePath);
    await QRCode.toCanvas(canvas, text, {
        width: 400,  
        margin: 20,   
        color: {
            dark: '#000f', 
            light: '#0000' 
        }
    });






    drawCText(canvas,ctx,'hello there')
    const out = fs.createWriteStream(outputFilePath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('QR code image with background saved as:', outputFilePath));
}
// async function generateQrCode(text) {

//         QRCode.toFile(`${text}.png`, text, {
//         color: {
//             dark: '#00f',  // Blue dots
//             light: '#ffff' // Transparent background
//         }
//         }, function (err) {
//         if (err) throw err
//         console.log('done')
//         })

// }

const fetchRecord=async()=>{

    const recordList=await pb.collection('team_member').getFullList({expand:'team'})
    console.log('****',recordList)
    for await (const rr of recordList) {        
        // 
        // generateQrCode(rr.id)
        generateQrCodeWithBgImage(rr.id,'/2.jfif','test1.png')
    }
    
}

// 
// generateQrCode('Hello There')
fetchRecord()
generateQrCodeWithBgImage('text','test1.png')

