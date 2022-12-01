<h1 align="center">Indian Social Media App</h1>

<h3 align="center">It's a fully responsive MERN Stack social-media web application with all the major functionalities</h3>

<br />

<h2 align="center">🖥️ Tech Stack</h2>


<h4 align="center">Frontend:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactjs" />
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="redux" />
   <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="react-router" />
  <img src="https://img.shields.io/badge/Chakra%20UI-3bc7bd?style=for-the-badge&logo=chakraui&logoColor=white" alt="chakra-ui" />
  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascript" />
  <img src="https://img.shields.io/badge/Rest_API-02303A?style=for-the-badge&logo=react-router&logoColor=white" alt="restAPI" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="css3" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="html5" />
</p>


<h4 align="center">Backend:</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="nodejs" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="expressjs" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="mongodb" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JsonWebToken" />

</p>

<h4 align="center">React-time-chatting</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" alt="socket.io" />
</p>



<h1>View Deployment</h1>
</hr>
<h4>Checkout live website: https://indian-social-media.vercel.app/</h4>
</hr>




<br />

## 🚀 Responsiveness

<h4 align="center">All Pages are fully responsive for all screen sizes</h4>

![mockup](https://user-images.githubusercontent.com/101813593/204578055-46c1e240-7290-4b2e-9873-5a767b558e81.png)




## 🚀 Features
- Signup Login and Logout User Account
- JWT (Json Web Token) Authentication and BcryptJS Password Hashing 
- Forget and Reset-Password functionality by sending a link to the mail
- Authorisation for 
- Users can do all the CRUD operations with their posts 
- Authorisation for all types of CRUD operations
- Users can like and dislike other users' posts.
- Users can update their profile picture, cover picture and also their profile.
- Users can able to change their password and delete their account from the website
- Users can follow and unfollow other users and their timeline posts get updated accordingly.
- Users can create chats with any of the other users and do real-time chatting with them.
- Darkmode available



<br />

## 🚀 Performance optimisation

- Able to optimise the performance by not making a single extra api call in the whole app unless it necessary.
- Used useCallback, useMemo and React.memo where ever required.
- Used Shallequal from react-redux to avoid unnecessery rendering.
- Used react-lazy-load-image-component library for loading the images lazy.
- where ever possible written the cleanup inside the UseEffect in case of setting the data.
- Converting the images into the webp format by using the webp convertor before uploading to the cloudinary server.
- Applied gzip compression for compressing the serverData before sending to the client.
- Applied custom indexing in MongoDb for faster query processing. 

<br />

<h1>Some visuals of my project </h1>
 </hr>

<h3>Home page: </h3>

![homeFull](https://user-images.githubusercontent.com/101813593/204586647-e061b0ad-e7e0-4bbf-8f87-23989a6996e5.png)

<h3>Profile page: </h3>

![Profilefull](https://user-images.githubusercontent.com/101813593/204586696-cd5937ee-a789-4e08-9a39-04c52f8ca6db.png)

<h3>Chat page: </h3>

![mychatfull](https://user-images.githubusercontent.com/101813593/204588758-6dbdd9d4-a5af-4aa6-bb84-45969e84e7dc.png)

<h3>Reat-time-chatting: </h3>

![Real-time-chatting](https://user-images.githubusercontent.com/101813593/204590112-d3666ce7-1f10-46ac-ba31-fc81df29f613.png)

<h3>Users page: </h3>

![Users Page](https://user-images.githubusercontent.com/101813593/204588942-959995a7-80db-42a3-a10d-1c909e2a9102.png)

<h3>Signup page: </h3>

![Signup](https://user-images.githubusercontent.com/101813593/204589014-9252a2de-093d-4d41-a356-d0b128768395.png)

<h3>Login page: </h3>

![Login](https://user-images.githubusercontent.com/101813593/204589096-371b4c74-1e42-48c6-bd78-cb6ff84716bb.png)

<h3>forget password page: </h3>

![forgetPassword](https://user-images.githubusercontent.com/101813593/204589235-d9c1bbdf-c2dc-4d15-9425-5cad446c93e4.png)

<h3>Change password page: </h3>

![change password](https://user-images.githubusercontent.com/101813593/204589858-b151ef65-f281-40a2-9cea-acefd72aefb4.png)


<br />


### Environment Variables

To run this project, you will need to add the following environment variables to your .env file in server folder

`MONGO_URL`

`JWT_SECRET_KEY`

`EMAIL_HOST`

`EMAIL_PORT`

`EMAIL_USER`

`EMAIL_PASS`

`EMAIL_FROM`

`CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`



### Steps to run this Project:-

1. Create a folder on your system.

2. Open with Visual Studio Code.

3.  clone the repo using
``` 
 git clone https://github.com/gkomsai/Social-media-app.git
```

4. Do "yarn install" in frontend and "npm install" in the backend and socket folder  (To install all the dependencies)

5. Then "yarn start" in the frontend and "npm start" in the backend and socket folder to run the project on your local system


## Contact

If you want to contact me, you can reach me through below handles.

[![LinkedIn](https://camo.githubusercontent.com/a80d00f23720d0bc9f55481cfcd77ab79e141606829cf16ec43f8cacc7741e46/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4c696e6b6564496e2d3030373742353f7374796c653d666f722d7468652d6261646765266c6f676f3d6c696e6b6564696e266c6f676f436f6c6f723d7768697465)](https://linkedin.com/in/gautam-kumar-9bba54222/) 

[![Gmail](https://user-images.githubusercontent.com/101813593/185589447-6fb65c33-987a-4ecc-b467-03333934276b.png)](mailto:gkomsai788@gmail.com)


## Show your support

Give a ⭐️ if you like this project!
