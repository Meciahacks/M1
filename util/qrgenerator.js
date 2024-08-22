import QRCode from 'qrcode';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://meciadb.pockethost.io/');
async function generateQrCode(text) {

        QRCode.toFile(`${text}.png`, text, {
        color: {
            dark: '#000',  // Blue dots
            light: '#ffff' // Transparent background
        }
        }, function (err) {
        if (err) throw err
        console.log('done')
        })

}
const fetchRecord=async()=>{

    const recordList=await pb.collection('team_member').getFullList({expand:'team'})
    console.log('****',recordList)
    for await (const rr of recordList) {        
        generateQrCode(rr.id)
    }
    
}

// 
// generateQrCode('Hello There')
fetchRecord()