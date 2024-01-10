# Threads Clone

Threads clone is a MERN stack web app inspired by Threads launched by Meta. The core functionalities are as follows:

- Signup/Login
- Real-time chat: supporting sending pics, message read/unread, user online/offline real-time displaying
- Create posts with pics, like/unlike posts, comment posts
- Profile management

## App Walkthrough

### Login Page

![login page](./imgsreadme/1.png)

### Chat Page

The real-time communication was achieved by the socket server. The app can also display the online/offline state of the clients. The clients can also see if the sent messages have already been read.

#### Real-time Online/Offline State Display

##### The Client to Be Chatted with Offline

![offline display](./imgsreadme/5.png)

##### The Client to Be Chatted with online

![online display 1](./imgsreadme/6.png)

![online display 2](./imgsreadme/7.png)

#### Real-time Chat with Pics

##### Sent A Message, Unread

![send a message unread](./imgsreadme/8.png)

##### Sent A Message, Another Client Received and Read the Message

![sent and read](./imgsreadme/9.png)

![read state display](./imgsreadme/10.png)

##### Another Client Replied

![replied 1](./imgsreadme/11.png)

![replied 2](./imgsreadme/12.png)

### Post Page

![post page](./imgsreadme/2.png)

#### Create A New Post with Pics

![Create](./imgsreadme/4.png)

#### Commenting

![Comment](./imgsreadme/13.png)

![Comment2](./imgsreadme/14.png)

### User Profile Page

The clients can change the bio, name, avator and password in the profile page

![profile](./imgsreadme/3.png)
