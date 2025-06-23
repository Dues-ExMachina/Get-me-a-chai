import React from 'react'

const About = () => {
    return (
        <div>
            <section style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
                <h1>About Us</h1>
                <p>
                    Welcome to Get Me a Chai! We are passionate about bringing you the best chai experience online.
                    Our mission is to connect chai lovers and provide a platform to share, discover, and enjoy the world of chai.
                </p>
                <h2>Our Story</h2>
                <p>
                    Founded in 2025, Get Me a Chai started as a small project by enthusiasts who wanted to make chai accessible to everyone.
                    Today, we serve a growing community of chai aficionados from around the globe.
                </p>
                <h2>Contact</h2>
                <p>
                    Have questions or feedback? Reach out to us at <a href="mailto:contact@getmeachai.com">contact@getmeachai.com</a>.
                </p>
                <br />
                <p>
                    Everything in about page is written by AI.
                </p>
            </section>
        </div>
    )
}

export default About;

export const metadata = {
    title: 'About - Get Me a Chai',
    description: 'About page for Get Me a Chai application',
}