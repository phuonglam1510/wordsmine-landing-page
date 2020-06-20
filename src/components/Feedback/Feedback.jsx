import React from 'react';
import { Carousel } from 'antd';
import FeedbackItem from './components/Feedback-Item/FeedbackItem';

const Feedback = () => {
    return (
        <section className="feedback u-padding-horizontal-section u-margin-vertical-section">
            <Carousel dotPosition="bottom" className="feedback__carousel">
                <FeedbackItem />
                <FeedbackItem />
                <FeedbackItem />
                <FeedbackItem />
            </Carousel>
        </section>
    );
};

export default Feedback;