# Mini Paint Web Application

## Task

[https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit?hl=ru&forcehl=1](https://docs.google.com/document/d/1K79_NA4lMYfqQiIJGqLDek1K9z-oc2qg8n4AvrN1PXE/edit?hl=ru&forcehl=1)

## Demo

[https://mini-paint-bay.vercel.app/](https://mini-paint-bay.vercel.app/)

## Installation

`git clone https://github.com/stikler51/mini-paint.git`

`cd mini-paint`

`npm install`

Put `.env` file to the root folder

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Features

- Authorization and registration by E-mail
- Accessing to editor page only for registered users
- Tools
  - Pen
  - Line
  - Rectangle (with pressed Shift draws square)
  - Ellipse (with pressed Shift draws circle)
  - Paint bucket
  - Eraser
  - Line width and color choosing
- Undo / Redo actions (also works for ctrl + z and ctrl + y)
- Saving image and availability to edit it later
- Gallery of all created images
- Availability to filter gallery by user
- Availability to remove your images

## Project structure

`/src/components` - this folder contains all components. Every component is in separate folder. All components folders and files named in camel case. Every component folder contains component file named as `componentName.tsx` and stylesheet file (if it needed) named as `componentName.module.scss`. About modular stylesheets and it advantages, you can read here [https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)

`/src/firebase` - contains functions and methods to work with firebase authentications and firestore database

`/src/hooks` - contains custom hooks

`/src/pages` - contains react components which implements separate pages for using in router

`/src/store` - contains Redux store files

`/src/styles` - contains global styles

## Database snapshot

In this project there are 2 collections: art and user. Collection art contains information about saved images and consists of next fields:

| Field name |      Type |                      Example | Description                             |
| ---------- | --------: | ---------------------------: | --------------------------------------- |
| email      |    string |              mail.@gmail.com | Email of user, which creates this image |
| uid        |    string | 5lns0xYfpeaEbw2yHZA2bNvehhp1 | ID of user, which creates this image    |
| imageData  |    string |  data:image/png;base64,iV... | Image converted in Base64 string        |
| created    | timestamp |                              | Date when image was created             |
| updated    | timestamp |                              | Date when image was updated             |

Collection user contains information about users and needed for filtering gallery by users:

| Field name |      Type |                      Example | Description                |
| ---------- | --------: | ---------------------------: | -------------------------- |
| email      |    string |              mail.@gmail.com | Email of user              |
| uid        |    string | 5lns0xYfpeaEbw2yHZA2bNvehhp1 | ID of user                 |
| created    | timestamp |                              | Date when user was created |
