# real-estate-ads

## Overview

This React.js application is designed to facilitate the management and advertisement of real estate properties. It features a user-friendly interface developed with Material UI, ensuring a responsive design. The application consists of two main pages:

Home Page: Displays a list of all properties that have been added to the platform.
New Property Page: Provides a form where users can submit information about their property to create a new advertisement. The form includes fields for property title, type, price, negotiability, description, and availability date.
Behind the scenes, the app leverages Redux Saga for efficient state management, ensuring that the application's state is updated in real-time. This allows newly created property ads to be immediately visible on the Home page.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 16.x or higher recommended)
- npm (comes with Node.js)
  
## Installation

To set up the project locally, follow these steps:

- Clone the project : https://github.com/MariaKritou/real-estate-ads-api.git
- npm install
- Create an .env file (or rename the env.example) at the root of the project and paste the mongo uri : MONGO_URI=mongodb+srv://publicUser:fTc8bvKBSw5wCCnd@real-estate-ads.ig9c6q7.mongodb.net/?retryWrites=true&w=majority
- npm start (localhost:3000 this is used from the API_URL in the frontend as well)

## General Information

- If you face any issues with connecting to the db you can contact me 
- I wanted to create unit tests but unfortunately due to my schedule and time limitation I could not continue, I created a new branch called "testing" in which I will continue testing the application, you can check it out-it will propably have a lot of failed tests, the main branch will remain unchanged.


