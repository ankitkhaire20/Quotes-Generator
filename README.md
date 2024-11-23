Welcome to your Quotes Generator App! 👋
This is a Quotes Generator App built using Expo, created with create-expo-app. With this app, users can register, log in, generate inspiring quotes, share them via WhatsApp, and save their favorite quotes to a personal list.

App Features 🚀
User Authentication:
Users can register, log in, and log out. Currently, this functionality is static and managed using Redux, with no API integration.

Logout Option:
Users can easily log out of their account to ensure privacy and security.

Quotes Sharing:
Generate quotes and share them directly via WhatsApp with the click of a button.

Save Your Favorites:
Save your favorite quotes to your personal list for easy access later.

Get Started
Install Dependencies

bash
Copy code
npm install
Start the App

bash
Copy code
npx expo start
In the output, you'll find options to open the app in a:

Development build
Android emulator
iOS simulator
Expo Go: a limited sandbox for trying out app development with Expo.
Screenshots 📸
Here are some previews of the app in action:


![Simulator Screenshot - iPhone 16 Pro - 2024-11-23 at 09 18 22](https://github.com/user-attachments/assets/70ada2a6-991f-41e1-96d1-0225e2f2227e)
![Simulator Screenshot - iPhone 16 Pro - 2024-11-23 at 09 18 20](https://github.com/user-attachments/assets/04a75ecb-d957-493a-9d4e-9384a1417ebb)
![Simulator Screen

https://github.com/user-attachments/assets/9ca392c7-fcb4-4163-95d9-06be5a5e972b

shot - iPhone 16 Pro - 2024-11-23 at 09 09 56](https://github.com/user-attachments/assets/7613e7ab-6584-4918-9185-76611715dde5)
![Simulator Screenshot - iPhone 16 Pro - 2024-11-23 at 09 06 52](https://github.com/user-attachments/assets/f4bbb826-73bc-4c31-bfba-a313d21248e5)
![Simulator Screenshot - iPhone 16 Pro - 2024-11-23 at 09 05 54](https://github.com/user-attachments/assets/4ec0f95b-4594-4214-9506-8a4e279cae14)
![Simulator Screenshot - iPhone 16 Pro - 2024-11-23 at 09 05 39](https://github.com/user-attachments/assets/32215f9f-d582-454f-9164-1db242249790)


Start Developing
This project uses file-based routing. You can begin development by editing the files inside the app directory.

For a fresh start, run:

bash
Copy code
npm run reset-project
This command will move the starter code to the app-example directory and create a blank app directory for your development.

Technical Details 🔧
Redux Integration:
The login, register, and logout functionalities are managed using Redux for state management. No backend API is currently integrated for authentication.

Logout Feature:
The app includes a logout feature, ensuring users can safely exit their account.

Sharing Feature:
Quotes can be shared directly to WhatsApp via deep linking.

Data Management:
Saved quotes are stored locally (e.g., using state or local storage) for easy access.

Learn More
Explore the following resources to enhance your development experience:

Expo Documentation: Learn the fundamentals or dive into advanced topics with guides.
Learn Expo Tutorial: Follow a step-by-step guide to create projects that run on Android, iOS, and the web.
