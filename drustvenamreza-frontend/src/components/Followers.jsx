import Footer from "./Footer";
import users from "./Users";
import React from "react";
import '../CSS/Followers.css';
import { useEffect } from "react";

function Followers({ loggedInUser, kriterijum }) {

  //definisanje konstanti
  const [followers, setFollowers] = React.useState([]);
  const [usersFilteredByCriteria, setUsersFilteredByCriteria] = React.useState([]);

  const [suggestedUsers, setSuggestedUsers] = React.useState([]);
  

  // Učitavanje korisnika koje pratite i filtriranje prema kriterijumu
  React.useEffect(() => {
    // Filtriranje korisnika koje pratite
    const followedUsers = users.filter(user => followers.includes(user.username));
    
    // Filtriranje korisnika koje pratite prema kriterijumu pretrage
    const filteredFollowedUsers = followedUsers.filter(user => user.username.toLowerCase().includes(kriterijum.toLowerCase()));
    
    setUsersFilteredByCriteria(filteredFollowedUsers);
  }, [followers, kriterijum]);

  useEffect(() => {
    setSuggestedUsers(users.filter(user => user.username !== loggedInUser && !followers.includes(user.username)));
  }, [loggedInUser, followers]);

  const handleFollow = (username, image) => {
    const updatedFollowers = [...followers, username];
    setFollowers(updatedFollowers);

    const updatedSuggestedUsers = suggestedUsers.filter(user => user.username !== username);
    setSuggestedUsers(updatedSuggestedUsers);
  };

  const handleUnfollow = (username, image) => {
    const updatedFollowers = followers.filter(follower => follower !== username);
    setFollowers(updatedFollowers);

    const updatedSuggestedUsers = [...suggestedUsers, { username, image }];
    setSuggestedUsers(updatedSuggestedUsers);
  };

  return (
    <div>
      {/* My Followers section */}
      <div id="myFollowers">
        <h2 className="followers-heading">My Followers</h2>
        <ul className="followers-list">
          {/* List of followers based on search criteria */}
          {usersFilteredByCriteria.map((follower, index) => (
            <li key={index} className="follower-item">
              <img src={follower.image} alt={follower.username} />
              <p className="follower-username">{follower.username}</p>
              <button className="unfollow-button" onClick={() => handleUnfollow(follower.username)}>
                Unfollow
              </button>
            </li>
          ))}
        </ul>
      
      </div>

      {/* Suggested Users section */}
      <div id="suggestedUsers">
        <h3 className="suggested-users-heading">Suggested Users</h3>
        <ul className="suggested-users-list">
          {/* List of suggested users */}
          {suggestedUsers.map((user, index) => (
            <li key={index} className="suggested-user-item">
              <img src={user.image} alt={user.username} />
              <p className="suggested-username">{user.username}</p>
              <button className="follow-button" onClick={() => handleFollow(user.username)}>
                Follow
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Followers;