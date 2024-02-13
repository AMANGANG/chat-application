Chat Application


This chat application enables users to join rooms and send messages in real-time. Built with React on the frontend and Express combined with Socket.IO on the backend, it offers a simple yet powerful platform for real-time communication.

Features



Real-time messaging,
Room-based chats,
Unique user sessions with socket ID display,
Modern UI with Material-UI components,
Prerequisites,
Before you begin, ensure you have the following installed:

Node.js (LTS version recommended)
npm or Yarn
Installation



Server Setup:



Clone the repository to your local machine.


Navigate to the server directory from the terminal.


Install the necessary packages:


npm install nodemon 


Start the server:



npm run dev



Client Setup:



Navigate to the client directory (assuming a separate directory for the client-side code).


Install the necessary packages:


npm install 



Start the client application:



npm run dev



Usage



Joining a Chat Room,
Enter the desired room name in the "Room Name" field,
Click "Join" to enter the room,
Sending Messages,
Type your message in the "Message" field,
Click "Send" to broadcast your message to the room,
Viewing Messages,
Messages are displayed in real-time as they are received. Each message is tagged with the sender's unique socket ID.



Technology Stack


Frontend: React, Socket.IO-Client, Material-UI



Backend: Node.js, Express, Socket.IO



License
This project is open-source and available under the MIT License.
