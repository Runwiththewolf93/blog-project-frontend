## Project Name & Pitch
## My Blog - share your ideas with the world!

#### Example:

TweetWorld 
My Blog

An application used to filter data form Twitter based on user preference, built with React, Redux, JavaScript, and CSS.
An application with CRUD functionality, via which users can create and modify blog posts, comments, votes and more! Built with React, JavaScript, and Bootstrap. 

## Project Status
(only necessary if incomplete)

#### Example:

This project is currently in development. Users can filter tweets by username and keyword and see visual data representation. Functionality to sort by additional parameters is in progress.
This project is complete. Tests remain to be conducted on some components, but the project should be fully functional and working without any pending issues. 

## Project Screen Shot(s)

#### Example:   

Before login
![Screenshot](./public/assets/Frontend-1.png)

Login
![Screenshot](./public/assets/Frontend-2.png)

Logged in
![Screenshot](./public/assets/Frontend-3.png)

Add blog post modal
![Screenshot](./public/assets/Frontend-4.png)

Profile Page
![Screenshot](./public/assets/Frontend-5.png)

Interests Page
![Screenshot](./public/assets/Frontend-6.png)

Information Page - part 1
![Screenshot](./public/assets/Frontend-7.png)

Information Page - part 2
![Screenshot](./public/assets/Frontend-8.png)

Information Page - part 3
![Screenshot](./public/assets/Frontend-9.png)

Information Page - part 4
![Screenshot](./public/assets/Frontend-10.png)


## Installation and Setup Instructions

#### Example:  

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Run Test Suite:  

`npm test`  

To Start Server:

`npm start`  

To Visit App:

`localhost:3000/ideas`  

## Reflection

  - What was the context for this project? (ie: was this a side project? was this for Turing? was this for an experiment?)
  - What did you set out to build?
  - Why was this project challenging and therefore a really good learning experience?
  - What were some unexpected obstacles?
  - What tools did you use to implement this project?
      - This might seem obvious because you are IN this codebase, but to all other humans now is the time to talk about why you chose webpack instead of create react app, or D3, or vanilla JS instead of a framework etc. Brag about your choices and justify them here.  

#### Example:  

This was a 3 week long project built during my third module at Turing School of Software and Design. Project goals included using technologies learned up until this point and familiarizing myself with documentation for new features.  

Originally I wanted to build an application that allowed users to pull data from the Twitter API based on what they were interested in, such as 'most tagged users'. I started this process by using the `create-react-app` boilerplate, then adding `react-router-4.0` and `redux`.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

At the end of the day, the technologies implemented in this project are React, React-Router 4.0, Redux, LoDash, D3, and a significant amount of VanillaJS, JSX, and CSS. I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in diving into weird technological rabbit holes. In the next iteration I plan on handrolling a `webpack.config.js` file to more fully understand the build process.
