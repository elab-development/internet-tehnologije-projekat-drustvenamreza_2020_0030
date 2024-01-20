import React from 'react';
import Post from './Post';
import Footer from './Footer';
import '../CSS/Feed.css';
// Import slika
import slika1 from '../assets/slika1.jpg';
import slika2 from '../assets/slika2.jpg';
import slika3 from '../assets/slika3.jpg';
import slika4 from '../assets/slika4.jpg';
import slika5 from '../assets/slika5.jpg';


function Feed({ loggedInUser, kriterijum }) {
  const postsPerPage = 3;
  const [currentPage, setCurrentPage] = React.useState(0);

  const posts = [
    { id: 1, username: 'Maja Stankovic', text: 'Novi clan porodice Stankovic! Presladak je!!', time: 3, image: slika1 },
    { id: 2, username: 'Ana Danicic', text: 'Prelepi Koloseum u Rimu. Definitivno najbolji deo putovanja', time: 5, image: slika2 },
    { id: 3, username: 'Andjela Mircetic', text: 'Happy birthday to me!', time: 8, image: slika3 },
    { id: 4, username: 'Sara Stakic', text: 'Nezaboravno leto!', time: 10, image: slika4 },
    { id: 5, username: 'Marija Tosic', text: 'Novi novogodisnji nokti!', time: 15, image: slika5 }
  ];

  const filteredPosts = kriterijum
    ? posts.filter((post) =>
        post.username.toLowerCase().includes(kriterijum.toLowerCase())
      )
    : posts;

  const pageCount = Math.ceil(filteredPosts.length / postsPerPage);
  const displayPosts = filteredPosts.slice(
    currentPage * postsPerPage,
    (currentPage + 1) * postsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="feed">
        {displayPosts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            username={post.username}
            text={post.text}
            time={post.time}
            image={post.image}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
      <div className="pagination">
      <p>Paginacija:</p>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={currentPage === index ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Feed;