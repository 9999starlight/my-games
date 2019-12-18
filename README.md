MY GAMES

Application for searching and storing video games info in the list. 

Front end -  VUE.JS, SASS/SCSS. Responsive design - flexbox & grid

Database & Authentication - Cloud Firestore, realtime database - https://firebase.google.com/docs/firestore - limited free plan

Built and deployed to Heroku https://my-games-irena-vue.herokuapp.com/ 

Search alows any user to browse video games by title or keyword. Fetching data - games db GIANT BOMB https://www.giantbomb.com/api/ - limited free plan. It provides "search" paramether which displays 10 games max, with basic info. When user clicks on ‘more details' inside single result box, search is by "id" paramether which alows user to see detailed info. Click on button 'Add to my list' stores the item if it's not already added on the list.

Authentication - Only registred users can create, read, update and delete items on their lists. User can create account with an e-mail and password or login on existed account. User can sign up with any valid e-mail format with no request to validate it by recieving e-mail verification request. Password should be minimum 6 characters long.

Cloud Firestore immediately updates and displays user's list. It can be sorted alfabetically or by year. After clicking on 'Add to favorites' button, yellow star appears to mark game as favorite and after that button is disabled. After clicking on 'trash' icon item is removed from list & database.
