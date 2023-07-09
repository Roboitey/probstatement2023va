import React from 'react'
import "../Styles/Section_1.css"

function Section_1() {
    return (
        <section className='sec-1'>
            <div className='f-s'>
                <div className='cont-t'>
                    <h1>
                        <span>Welcome to the world’s </span><br />
                        <span>most popular website builder.</span>
                    </h1>
                </div>
                <div className='cont-c'>
                    <p>43% of the web is built on WordPress. More bloggers, small businesses, and Fortune 500 companies use WordPress than all other options combined. Join the millions of people that call WordPress.com home.</p>
                </div>
                <div className='cont-b'>
                    <button >Get Started</button>
                </div>
            </div>
        </section>
    )
}

export default Section_1