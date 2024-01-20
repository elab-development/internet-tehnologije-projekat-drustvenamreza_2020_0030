import React from 'react';
import Footer from './Footer';
import Post from './Post'; 
import '../CSS/Profile.css';

import slikaAndjele from '../assets/user1.jpg';
import slikaAnice from '../assets/user2.jpg';

function Profile({ loggedInUser }) {
  const usersInfo = {
    anica: {
      username: 'Anica Nedeljkovic',
      dateOfBirth: '10/08/2001',
      faculty: 'FON',
      city: 'Belgrade',
      profileImage: slikaAnice,
      bio: 'I aspire to travel the world!',
      interests: ['Sport', 'Travel', 'Music', 'Art'],
      posts: [],
      
    },
    andjela: {
      username: 'Andjela Mircetic',
      dateOfBirth: '05/12/2001',
      faculty: 'FON',
      city: 'Novi Sad',
      profileImage: slikaAndjele,
      bio: 'You cannot spell awesome without ME!',
      interests: ['Art', 'Books', 'Coding', 'Concerts', 'Music'],
      posts: []
    }
  }; 
  
  const userInfo = usersInfo[loggedInUser];
  const [posts, setPosts] = React.useState(userInfo ? userInfo.posts : []);

  if (!userInfo) {
    return <div>User not found</div>;
  }

  const { username, dateOfBirth, faculty, city, profileImage, bio, interests } = userInfo;

  //operacije nad postom
  const updatePost = (index, updatedPost) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = updatedPost;
    setPosts(updatedPosts);
  };

  const deletePost = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <div className="profile">
       
        <div className="profile-info">
          <h2>My Profile</h2>
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="user-details">
            <p>Username: {username}</p>
            <p>Date of Birth: {dateOfBirth}</p>
            <p>Faculty: {faculty}</p>
            <p>City: {city}</p>
            <p>Bio: {bio}</p>
            <p>Interests: {interests.join(', ')}</p>
            </div>
            <div className="posts">
           
                <div className="new-post">
                {/* Forma za unos novog posta */}
                <h3>Novi Post</h3>
                <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    const text = e.target.text.value;
                    const time = 2;
                    addNewPost({ username: loggedInUser, text, time });
                    }}
                >
                    <label htmlFor="text">Unesi tekst posta:</label>
                    <input type="text" name="text" id="text" placeholder="Unesite tekst posta" />

                    <button type="submit">Dodaj novi post</button>
                </form>
                </div>
              {posts.map((post, index) => (
                //prosledjujemo komponenti post podatke
                <Post
                  key={index}
                  postId={index}
                  username={post.username}
                  text={post.text}
                  time={post.time}
                  loggedInUser={loggedInUser}
                  updatePost={updatePost}
                  deletePost={deletePost}
                />
              ))}
  
            </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;