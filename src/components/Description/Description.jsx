import React from 'react'
import ImgDes1 from '../../img/flashcard.jpg'
const Description = () => {
    return (
        <section className="description">
            
            <div class="col-6 description__content-padding">
                <h2>You bring the brains, we’ll bring everything else</h2>
                <p>From flashcards to help you learn francais, to games that make it easy to get a handle on history, use a variety of tools to conquer any challenge.</p>
            </div>

            <div class="description__img col-6">
                <img src={ImgDes1} alt="banner" ></img>
            </div>



        </section>
    );
}

export default Description;