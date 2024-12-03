import React from 'react';

const Home = ({ posts }) => {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="heading text-center font-bold text-4xl m-7 text-gray-800" mt-20>
      <h1 className='mt-20'>Today's Post   {formattedDate}</h1>

      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div key={index} className="p-4 border-b border-gray-300">
            <h2 className="font-bold">{post.title}</h2>
            <p>{post.desc}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No posts yet.</p>
      )}

    </div>
  );
};

export default Home;
