import QRCode from 'qrcode';
import PocketBase from 'pocketbase';

import { createCanvas, loadImage } from 'canvas'
import fs from 'fs'
const pb = new PocketBase('https://meciadb.pockethost.io/');
async function generateQrCodeWithBgImage(text, bgImagePath, outputFilePath) {
    const canvas = createCanvas(400, 400); // Create a canvas
    const ctx = canvas.getContext('2d');
    const bgImage = await loadImage(bgImagePath);
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    await QRCode.toCanvas(canvas, text, {

        width: 110,  
        margin: 20,   
        color: {
            dark: '#000f', 
            light: '#0000' 
        }
    });
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
        generateQrCodeWithBgImage(rr.id,'../src/lib/images/svelte-welcome.png','test1.png')
    }
    
}

// 
// generateQrCode('Hello There')
fetchRecord()