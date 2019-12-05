/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/NolanPic')
  .then(res => {
    console.log(res.data);

    document.querySelector('.cards')
      .appendChild(GitHubCard(res.data));

      return res.data.followers_url;
  })
  .then(followers_url => fetchFollowers(followers_url)) // STRETCH: grabbing followers programmatically
  .catch(err => console.log(err));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
function GitHubCard(profile) {
  
  // card
  const card = document.createElement('div');
  card.classList.add('card');

  // image
  const img = document.createElement('img');
  img.src = profile.avatar_url;
  img.setAttribute('alt', profile.name);
  card.appendChild(img);

  // card-info
  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  card.appendChild(cardInfo);

  // name
  const fullName = document.createElement('h3');
  fullName.classList.add('name');
  fullName.textContent = profile.name;
  cardInfo.appendChild(fullName);

  // username
  const userName = document.createElement('p');
  userName.classList.add('username');
  userName.textContent = profile.login;
  cardInfo.appendChild(userName);

  // location
  const location = document.createElement('p');
  location.textContent = `Location: ${profile.location}`;
  cardInfo.appendChild(location);

  // profile
  const profileP = document.createElement('p');
  profileP.textContent = 'Profile: ';
  cardInfo.appendChild(profileP);

  // profile link
  const profileLink = document.createElement('a');
  profileLink.href = profile.html_url;
  profileLink.textContent = profile.html_url;
  profileLink.setAttribute('target', '_blank');
  profileP.appendChild(profileLink);

  // followers
  const followers = document.createElement('p');
  followers.textContent = `Followers: ${profile.followers}`;
  cardInfo.appendChild(followers);

  // following
  const following = document.createElement('p');
  following.textContent = `Following: ${profile.following}`;
  cardInfo.appendChild(following);

  // bio
  const bio = document.createElement('p');
  bio.textContent = `Following: ${profile.bio}`;
  cardInfo.appendChild(bio);

  return card;
}

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

let followersArray = [];

function fetchFollowers(followers_url) {
  // this first axios call grabs a list of everyone who is a follower
  axios.get(followers_url)
    .then(res => {
      // update followersArray
      followersArray = res.data.map(follower => follower.login);

      // loop thru followers and fetch their data
      followersArray.forEach(follower => {
        // this axios call grabs each individual follower
        axios.get(`https://api.github.com/users/${follower}`)
          .then(user => {
            document.querySelector('.cards')
              .appendChild(GitHubCard(user.data));
          });
      });
    })
    .catch(err => {
      console.log(err);
    });
}

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
