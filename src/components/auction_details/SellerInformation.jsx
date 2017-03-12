import React from 'react';

const SellerInformation = ({ name, rating, feedback}) => {
	return <section className="seller-information">
	    <div className="seller-information_section-name">
			<span className="seller-information_section_name-label">Seller Name</span>
			<span className="seller-information_section_name-value">{ name } </span>
		</div>
		<div className="seller-information_section-rating">
			<span className="seller-information_section_rating-label">Rating</span>
			<span className="seller-information_section_name-value">{ rating } </span>
		</div>
		<div className="seller-information_section-feedback">
			<span className="seller-information_section-feedback-label">Feedback</span>
			<ul className="seller-information_section-feedback_list">
			{
				feedback.map(({user, timestamp, comment, rating}) => {
					return <li className="seller-information_section-feedback_list_item"> 
					    <span className="seller-information_section-feedback_list_item_timestamp">{ timestamp }</span>
						<span className="seller-information_section-feedback_list_item_user">{ user }</span>
						<span className="seller-information_section-feedback_list_item_comment">{ comment }</span>
						<span className="seller-information_section-feedback_list_item_rating">{ rating }</span>
					</li>
				})
		    }
		    </ul>
		</div>
	</section>
};

export default SellerInformation;