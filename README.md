# Getting Started with Calendar Call Scheduler

## About Project

Calender call scheduler is a web application feature that allows you to schedule a mentor on an E-learning Application. The call is time-zone friendly as user can schedule a call in their time-zone.
This feature was built to be a part of a whole learning system. 

This project is made up of several ReactJS functional components integrated together to become a whole feature.
It was built as functional component for separation of functionalities, reusablity and scalability. Also for easy readability.

![Alt text](src/images/Screenshot 2021-05-10 at 15.37.32.png?raw=true)
![Alt text](src/images/Screenshot 2021-05-10 at 15.40.58.png?raw=true)
![Alt text](src/images/Screenshot 2021-05-10 at 15.53.57.png?raw=true)

## Project Components

### React Functional Components
These component handle the views and UI logic of the project.

#### Dashboard Component
This is the parent component component that holds all other components. In this component a `React.Context` is passed down to some children component to create a shared state.

#### Calendar Component
This is a major component in the application which is used for date and time selection. The calendar was built usin `ReactJS`, `Moment` and `SASS`.
The user can navigate through the calendar using the calendar navigation controls. Older date (dates before current date) cannot be selected. Only current and future dates can be selected.
Selecting a date pops up the timeslot which is placed horizontally beside the calendar for easy usage.

#### ShowCalendarOverlay Component
This component holds the calendar and time selection components. It also holds some logic for date and time selection.
#### Common Components
This contains smaller components that are put together to make a whole component.

### React Context
This was used to share states between different components.

### React Reducer
React hooks `useReducer` was used to dispatch most actions and update the state.

### Helper Methods
This was used to abstract some data in the UI Logic.

### Services
This was created to make API calls to the backend and retrieve data for the application usage.

### StyleSheets
`SASS` was used to style the component. The decision was because of its nested syntax, and offer for reusability.

### Testing
Testing for this feature is ongoing.

## Installation
### `Clone Repository`:
This project can only be run on a local machine for now. Kindly clone this repository.

### `Install Dependency`:
Run `yarn` to install all dependencies.

## Library Used
### `ReactJS`
### `SASS`
### `MomentJS` and  `MomentTimeZone`
### `Jest` and `React Testing Library` for testing

## Improvements
This application was built in a short time and there are some modifications that would be done to improve it continually.
The calendar doesn't have dynamic year and month selection yet. These would be subsequently added to it to make it fully function.

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
