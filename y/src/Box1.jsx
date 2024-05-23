import React from "react";




const Boxone = () => {
    const handleGetLikes = async () => {
        try {
          const response = await axios.get('http://localhost:5000/likes', { withCredentials: true });
          setTotalLikes(response.data.totalLikes);
        } catch (error) {
          console.error('Error getting total likes:', error);
        }
      };    

  return ( <div>
   <h2>Number of likes:</h2>
   <button onClick={handleGetLikes} className='getlikebutton'>Get Total Likes</button>
   </div>
  );
};

export default Boxone;
