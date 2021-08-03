import {io} from 'socket.io-client'
const URL = "http://localhost:3000"
const socket = io(URL);
// const socket = io("http://localhost:3000");

// socket.on("selected conversation", selectedConvId => {
//     console.log(selectedConvId)
// });


export default socket;