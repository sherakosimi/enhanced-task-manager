
#  Task Manager - React Native 

This is enhanced task manager built with **React Native** and **Expo** frameworks. The app can be used both as personal and as company's task manager. The main goal of this project is to offer abilities to chat, to share projects and tasks with your friends or colleagues. The **UI/UX** of the app was created in **Figma**.
 

*Built by **SHERA KOSIMI** Copyright © by Shera Kosimi for his personal purposes. You are 100% allowed to use this webapp for both personal and commercial use, but NOT to claim it as your own design and work. A credit to the original author, Shera Kosimi, is of course highly appreciated!*   
## Prerequisites

Install the below tools/packages

| Serial No | Software         | Version   | Serial No                                                                  |
| :-------- | :--------------- | :-------- | :------------------------------------------------------------------------- |
| 1         | Node.js          | >= 6.9.1  | [Install Node.js](https://nodejs.org/en/download/)                         |
| 2         | npm              | >= 3.10.8 | [Install NPM](https://www.npmjs.com/get-npm)                               |
| 3         | react-native     | >= 0.51.0 | [Install react-native](https://www.npmjs.com/package/react-native)         |
| 4         | react-native-cli | >= 2.0.1  | [Install react-native-cli](https://www.npmjs.com/package/react-native-cli) |
| 5         | Expo             | >= 47.1.1 | [Install Expo](https://www.npmjs.com/package/expo)                         |

## Installation

Install enhanced-task-manager with npm

**System setup**

- Clone the repo with `git clone [REPO_URL] `
- Switch to the project's root directory in terminal
- Install the dependencies by running`npm install`
- Once, 'npm install' is completed, start the expo and react-native server by running `expo start `
- If it shows a QR code on the terminal as a result of 'expo start' command, then you are good to go!

Ignore the first step on 'Mobile setup' instructions given below if you already have 'Expo' app installed on your phone.

**Mobile setup**

- Install 'Expo' application on your android/iOS device. You can find the links to Android and iOS apps here.
- Scan the QR code shown on the terminal.
- Once the QR code is successfully scanned, it will take few seconds to load and render the app.
## Base dependencies

- [redux-thunk](https://github.com/reduxjs/redux-thunk) as a state manager.
- [firebase](https://github.com/reduxjs/redux-thunk) as a cloud database
- [react-native-screens](https://docs.expo.dev/versions/latest/sdk/screens/) navigation library.
- [moment](https://momentjs.com/) as date and time formatter
## Redux Thunk and Firebase Firestore

Once the components are defined, they are tied to the management of information through the application. For this, Redux is implemented with the store-reducer-action structure as usual, however, not only the data is handled through the actions but the success and error responses are also defined by the same form.

**Redux Thunk**

Thunk middleware for Redux. It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.
 


**Firebase**

The **Cloud Firestore** data model supports flexible, hierarchical data structures. Store your data in documents, organized into collections. Documents can contain complex nested objects in addition to subcollections.


## Authors

- [Shermuhammad Kosimi ](https://github.com/sherakosimi)
