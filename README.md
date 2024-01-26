# startup
Startup Application for BYU CS 260
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
- **JavaScript** - Provides login, clicking on plants to view info, display other users votes, backend endpoint calls.
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

- **HTML pages** -
- **Links** - 
- **Text** - 
- **Images** - 
- **DB/Login** - 
- **WebSocket** - 

