# startup
[Startup Application](https://startup.gardentimer.click) for BYU CS 260

## [NOTES](/notes.md)

## Startup Specifications
### Elevator pitch
Have you ever planted you seeds and forgotten when you planted them or how long to wait for them to germinate before giving up and trying again? The garden application allows you to set planting dates estimated harvest times as well as average germination times for you seeds so that you can remember all your gardening needs in a convenient location. You can organize your plants to multiple plots or just one. You can follow your friends and see what they are growing and when they plant new things. You'll also recieve reminders for when you ought to water plants, and when possible freezes may occur.
### Design
![startup application rough draph](https://github.com/kobydj/startup/assets/112727740/995f5ddd-03aa-4e52-ab2b-79f8626fe104)

### Key features
- Secure login over HTTPS
- Ability to select from common plants
- Display the plants in your different plots
- Persistantly stores your garden
- View friends gardens
- recieve notification reminders for your garden

### Technologies
- **HTML** - Uses correct HTML structure for application. Two HTML pages. One for login and one for viewing your garden.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **JavaScript** - Provides login, clicking on plants to view info, backend endpoint calls.
- **Service** - Backend service with endpoints for:
  - registering
  - login
  - adding/removing plants
  - adding/removing friends
- **DB/Login** - Store users, plants, and list of friends in database. Register and login users. Credentials securely stored in database. Can't add/view plants unless authenticated.
- **WebSocket** - When you add plants a notification is broadcast to your friends. Braodcasts notifications when possibility of a freeze and watering reminders
- **React** - Application ported to use the React web framework.

## HTML deliverable
For this deliverable I built out the structure of my application using HTML.

- **HTML pages** - I have included 4 pages, a login page, a page where you can view the plants which you have added to your garden, an info page that that shows you weather and plant info and an about page with a cute picture and explanation.
- **Links** - The loggin page links automatically to the garden page and each plant in the garden page links to the plant info page. There is also a link from the info page to get back to the grden page. Ive also included links to all pages in the header and a link to my github in the footer.
- **Text** - the plant and weather information is represented textually.
- **3rd Party service** - This will be included in the weather notifications.
- **Images** - I have included clip art images of plants and an inspirational picture on the about page.
- **DB/Login** -  Input boxes for a username and password with a submit button. All the information about the specific plants will be pulled from the database.
- **WebSocket** - The real time weather updates will be accessed using websocket, in order to update when adverse weather is coming.

## CSS deliverable
I added css styling in this deliverable.

- **Header, footer, and main content body**
- **Navigation elements** - I fixed the navigation element to the top of the screen and made sure the background color stuck with them.
- **Responsive to window resizing** - My app adjusts to all window sizes and displays. The garden page is the best example as all the images are set on a grid so that if the screen is less wide it adds more rows.
- **Application elements** - Added bootstrap elements and buttons to make page feel more modern.
- **Application text content** - I used consistent fonts, and good contrast to make all of the text readable.
- **Application images** - I changed my about image, and added a border around it to make it fit visually with color scheme. I also placed all the images on the garden page into cards so they look softer and are connected with he descriptions and buttons.

## JavaScript deliverable

For this deliverable I implemented by JavaScript so that the application works for a single user. I also added placeholders for future technology.

- **login** - When you press enter or the login button it takes you to the garden page. Saves the username in local storage and displays in it the garden page.
- **database** - Displayed the planting dates the germination times and the length of the season for each plant. Currently this is stored and retrieved from local storage, but it will be replaced with the database data later.
- **WebSocket** - I used the setInterval function to periodically do some random math to determine if the weather is below freezing, it then displays the temp if it is freezing. This will be replaced with WebSocket messages later.
- **application logic** - The germination dates and season lengths change depending on which plant is selected, this means that the harvest date will depend on when it was planted as well as what plant it is.

## Service deliverable

For this deliverable I added backend endpoints to store information on all the plants that was in local storage, and third party endpoints to check the weather.

- **Node.js/Express HTTP service** - done!
- **Static middleware for frontend** - done!
- **Calls to third party endpoints** - Calls weather API to update the weather alert. 
- **Backend service endpoints** - Endpoints to store the plant type and all the info for the plants, I also have the planting dates given by the user stored.
- **Frontend calls service endpoints** - I did this using the fetch function.

## DB/Login deliverable

For this deliverable I associate the plant dates with the logged in user. I stored the user info, plant info and plant dates in the database.

- **MongoDB Atlas database created** - done!
- **Stores data in MongoDB** - done!
- **User registration** - Creates a new account in the database.
- **existing user** - If a user exists their planting dates are brought up if added.
- **Use MongoDB to store credentials** - Stores both user and their planting dates as well as the general plant info.
- **Restricts functionality** - In the backend you cannot view the plants or update dates unless you are authorized. In the Front end if you try to go to a page before logging in you are asked to login before you can do anything.

## WebSocket deliverable

For this deliverable I used webSocket to update the votes on the frontend in realtime.

- **Backend listens for WebSocket connection** - done!
- **Frontend makes WebSocket connection** - This happens when the subcribe button is clicked on the info page.
- **Data sent over WebSocket connection** - This happens each time you change your planting date after the connection has been made.
- **WebSocket data displayed** - Any other users with open connections will be notified of what you set your new plant date to be!
