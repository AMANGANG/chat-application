// import React, { useEffect, useState } from 'react';
// import io from "socket.io-client";
// import { Button, Container, TextField, Typography, Box,Stack } from '@mui/material';

// const App = () => {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState('');
//   const [room, setRoom] = useState(""); // Corrected variable name
//   const[socketID,setsocketID]=useState("");
//   const[messages,setmessages]=useState([]);
//   const [roomName, setRoomName] = useState("");
//   useEffect(() => {
//     const newSocket = io("http://localhost:3000");
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (socket) {
//       socket.emit("message", { message, room }); // Corrected variable name
//       setMessage('');
//        // Clear room after submitting
//     }
//   };
//   const joinRoomHandler = (e) => {
//     e.preventDefault();
//     socket.emit("join-room", roomName);
//     setRoomName("");
//   };

//   useEffect(() => {
//     if (socket) {
//       socket.on("connect", () => {
//         setsocketID(socket.id);
//         console.log("connected", socket.id);
//       });
//       socket.on("receive-message", (data) => {
//         console.log(data);
//         setmessages((messages)=>[...messages,data]);
//       });
//     }
//   }, [socket]);

//   return (
//     <Container maxWidth="sm">
//          <Box sx={{ height: 300 }} />

//       <Typography variant="h6" component="div" gutterBottom>
//         {socketID} 
//       </Typography>

//       <form onSubmit={joinRoomHandler}>
//         <h5>Join Room</h5>
//         <TextField
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           id="outlined-basic"
//           label="Room Name"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Join
//         </Button>
//       </form>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           id="outlined-basic"
//           label="Outlined"
//           variant="outlined"
//         />
//         <TextField
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           id="outlined-basic"
//           label="Room"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Send
//         </Button>
//       </form>
//         <Stack>
//         {messages.map((m, i) => (
//           <Typography key={i} variant="h6" component="div" gutterBottom>
//             {m}
//           </Typography>
//         ))}
//       </Stack>
//     </Container>
//   );
// }

// export default App;
import React, { useEffect, useState } from 'react';
import io from "socket.io-client";
import { Button, Container, TextField, Typography, Box, Stack, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState("");
  const [socketID, setsocketID] = useState("");
  const [messages, setmessages] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("message", { message, room });
      setMessage('');
    }
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit("join-room", roomName);
      setRoomName("");
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        setsocketID(socket.id);
      });
      socket.on("receive-message", (data) => {
        setmessages((prevMessages) => [...prevMessages, data]);
      });
    }
  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Chat Room: {socketID}
        </Typography>

        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <form onSubmit={joinRoomHandler} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <TextField
              fullWidth
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              label="Room Name"
              variant="outlined"
              size="small"
            />
            <Button type="submit" variant="contained" color="primary">
              Join
            </Button>
          </form>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              label="Message"
              variant="outlined"
              size="small"
            />
            <TextField
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              label="Room"
              variant="outlined"
              size="small"
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Paper>

        <List sx={{ mt: 3, maxHeight: 300, overflow: 'auto' }}>
          {messages.map((m, i) => (
            <React.Fragment key={i}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography variant="body1">{m}</Typography>}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
