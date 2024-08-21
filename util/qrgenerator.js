import QRCode from 'qrcode';

    async function generateQrCode(text) {
            QRCode.toFile('filename.png', 'Some text', {
            color: {
                dark: '#000',  // Blue dots
                light: '#ffff' // Transparent background
            }
            }, function (err) {
            if (err) throw err
            console.log('done')
            })

    }
generateQrCode('Hello There')

