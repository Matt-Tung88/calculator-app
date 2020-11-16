# Calculator React Application

## About
* A web application that outputs calculations as they happen and shares those calculations with everyone connected to the app
* Results remain in session
* Only show the last 10 calculations descending from most recent to oldest

## Technologies Used
* HTML
* CSS
* JavaScript/React
* Heroku

## Possible Improvements
* Creating a login page that then directs the user to the application page instead of a name input field/single-page application
* Store “Calculations” in a database rather than just memory due to server volatility
* Use React Reducer instead of useState for the “Calculations” portion; utilize more efficient React Hooks and tools
* Deploy application on another platform, since Heroku dynos may restart for various reasons, but once the user is on the application, the “Calculations” will remain in session
* Add more functions such as log, sqrt, etc.

## How to Use
1. Enter your name and compute a calculation. After pressing “=”, the calculation will appear on the right under “Calculations”.
![1](https://user-images.githubusercontent.com/43249799/98387051-f109ef80-201e-11eb-8c97-5e121b86af93.png)

2. No more than 10 calculations can appear, which are in descending order from most recent to oldest.
![2](https://user-images.githubusercontent.com/43249799/98387126-0848dd00-201f-11eb-8795-a15333b4dab0.png)

3. Results remain in session.
![3](https://user-images.githubusercontent.com/43249799/98387175-14cd3580-201f-11eb-9f41-ce97823640b6.png)

4. Close the window or tab to exit.




