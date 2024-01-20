import React, { useState, useEffect } from 'react';
import '../CSS/Post.css';


function Post({ postId, username, text, time, image, loggedInUser, updatePost, deletePost }) {
  
  //promenljiva za komentare niz i ono sto se unese kao komentar
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  // Dobijanje komentara iz local storage-a prilikom mount-ovanja komponente
  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem(`postComments-${postId}`));
    setComments(storedComments || []);
  }, [postId]);

  const handleComment = () => {
    if (commentInput.trim() !== '') {
      const newComment = `${loggedInUser}: ${commentInput}`;
      setComments([...comments, newComment]);
      setCommentInput('');
      localStorage.setItem(`postComments-${postId}`, JSON.stringify([...comments, newComment]));
    }
  };

  //promena broja lajkova
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  //za brisanje i update postova
  const [updatedText, setUpdatedText] = useState(text);

  const handleUpdate = () => {
    updatePost(postId, { username, text: updatedText, time });
  };

  const handleDelete = () => {
    deletePost(postId);
  };

  return (
    <div className="post">
      <div className="post-header">
        <p>{username}</p>
        <p>{time} minutes ago</p>
      </div>
      <p className="post-text">{text}</p>
      {image && <img src={image} alt="Post" className="post-image" />}
      <div className="post-actions">
        <button onClick={handleLike}>{liked ? `Unlike (${likes})` : `Like (${likes})`}</button>
        <button onClick={handleComment}>Comment</button>
      </div>
      <div className="post-comments">
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <input
        type="text"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        placeholder="Add a comment..."
        className="comment-input"
      />
      {/* Dugmad za ažuriranje i brisanje ukoliko su prosledjeni*/}
      {updatePost && deletePost && (  // Uslovni prikaz dugmadi
        <div className="update-post-section">
        <h3 className="update-post-title">Izmeni post</h3>
        <input
          type="text"
          className="update-post-input"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          placeholder="Unesite izmenjeni tekst..."
        />
        <div className="update-post-buttons">
          <button className="update-button" onClick={handleUpdate}>
            Izmeni
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Obriši
          </button>
        </div>
      </div>
      )}
    </div>
  );
}

export default Post;