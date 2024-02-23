# real-estate-ads

## Overview

This React.js application is designed to facilitate the management and advertisement of real estate properties. It features a user-friendly interface developed with Material UI, ensuring a responsive design. The application consists of two main pages:<br />
<br />
Home Page: Displays a list of all properties that have been added to the platform.<br />
<br />
New Property Page: Provides a form where users can submit information about their property to create a new advertisement. The form includes fields for property title, type, price, location,  negotiability, description, and availability date.<br />
<br />
Behind the scenes, the app leverages Redux Saga for efficient state management, ensuring that the application's state is updated in real-time. This allows newly created property ads to be immediately visible on the Home page.<br />
Other packages: react-toastify, lodash, axios, dayjs

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (version 16.x or higher recommended)
- npm (comes with Node.js)
  
## Installation

To set up the project locally, follow these steps:

- Clone the project from the main branch: https://github.com/MariaKritou/real-estate-ads-api.git
- npm install

- (please run backend first: https://github.com/MariaKritou/real-estate-ads-api)
- npm start (it will ask to use a different port since backend will take :3000, so click yes)

## General Information

- I already have a few properties saved in the DB that you can see in the Home page
- I tried to create as many unit tests as I could in the time I had, since I added redux saga the complexity of the tests increased a lot and I had never tested components that use redux before, you can "npm test" to check then ones I have but I also created another branch called "testing" in which I will continue testing the application, you can check it out-it will propably have a lot of failed tests, the main branch will remain unchanged.

:)

