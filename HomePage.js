import React from 'react';

const Homepage = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}> 🫰Welcome to the Kpop Explorer🫰</h1>
            <p style={{ fontSize: '20px' }}>Have a look around!</p>
            {/* <p>More to be added soon!</p> */}
            <img
                src="https://i.imgur.com/IukJ4fF.jpg"
                alt="Kpop"
                style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}
            />
        </div>
    );
};

export default Homepage;
