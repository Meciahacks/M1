<script>	
import {Html5QrcodeScanner,Html5QrcodeScanType} from "html5-qrcode"

import { onMount } from "svelte";
import {pb} from '../../auth'
let html5QrcodeScanner,decodedText
let dt
let config = {
        fps: 10,
        qrbox: {width: 100, height: 100},
        rememberLastUsedCamera: true,


        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
    };

    const fetchRecord=async(decodedText)=>{
        console.log(decodedText);        

        try {            
            const record = await pb.collection('team_member').getOne(decodedText, {
                    expand: 'team',
            });
            console.log(record)
            dt=record

        } catch (error) {            
            console.log('****',error);
            dt='User !Found'            
        }
    }
	const onScanSuccess=(decodedText1, decodedResult)=>{
            console.log('****',decodedResult.toString(),'****',decodedText1)
            decodedText=decodedText1
            fetchRecord(decodedText)
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

    <div class="bg-orange-800 text-white text-xl font-bold overflow-x-scroll">{JSON.stringify(dt)}</div>
	<div id="reader" width="800"/>
    <input on:blur={(event)=>fetchRecord(event.target.value)} type="text">
</div>