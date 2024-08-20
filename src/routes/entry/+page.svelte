<script>	
import {Html5QrcodeScanner,Html5QrcodeScanType} from "html5-qrcode"
	import { onMount } from "svelte";

let html5QrcodeScanner,decodedText
let config = {
        fps: 10,
        qrbox: {width: 100, height: 100},
        rememberLastUsedCamera: true,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };


	const onScanSuccess=(decodedText1, decodedResult)=>{
            console.log('****',decodedResult.toString(),'****',decodedText1)

            decodedText=decodedText1
            // const decryptedText=CryptoJS.AES.decrypt(decodedText,"ihavesecret").toString(CryptoJS.enc.Utf8)
            // text=decryptedText
            html5QrcodeScanner.clear()          
    }
	const onScanFailure=(error)=>{
        console.log('****',error)
    }
	onMount(async()=>{
        html5QrcodeScanner = new Html5QrcodeScanner("reader", config,false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);        
})
</script>










<div>
	<h1 class='bg-slate-800 text-white p-2 text-xl uppercase font-bold'>QR Code Scanner</h1>
    <p class="bg-orange-800 text-white text-xl font-bold">{JSON.stringify(decodedText)}</p>
	<div id="reader" width="800"/>
</div>
