import dt from './dt.js'
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://meciadb.pockethost.io/');
const loadrecord=async()=>{
for (let indx = 0; indx < dt.dt.length; indx++) {
    const record = dt.dt[indx];
    await pb.collection('team_details').create(record);    
}
}
loadrecord()
