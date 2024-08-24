import QRCode from 'qrcode';
import PocketBase from 'pocketbase';

import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
const pb = new PocketBase('https://meciadb.pockethost.io/');
async function generateQrCodeWithBgImage(text,  outputFilePath) {
    const canvas = createCanvas(400, 400); // Create a canvas
    const ctx = canvas.getContext('2d');
    // const bgImage = await loadImage(bgImagePath);
    await QRCode.toCanvas(canvas, text, {

        width: 110,  
        margin: 20,   
        color: {
            dark: '#000f', 
            light: '#0000' 
        }
    });
    ctx.fillText('Hello There', , 84);
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

