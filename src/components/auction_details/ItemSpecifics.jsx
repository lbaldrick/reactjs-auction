import React from 'react';

const ItemSpecifics = ({ condition, brand, model, features, datePurchased, location, notes }) => {
	return <ul className="item-specifics">
		<li className="item-specifics_condition"> 
			<span className="item-specifics_condition_label">Item Condition</span>
			<span className="item-specifics_condition_value">{ condition }</span>
		</li>
		<li className="item-specifics_brand"> 
			<span className="item-specifics_brand_label">Brand</span>
			<span className="item-specifics_brand_value">{ brand }</span>
		</li>
		<li className="item-specifics_model"> 
			<span className="item-specifics_condition_label">Model</span>
			<span className="item-specifics_condition_value">{ model }</span>
		</li>
		<li className="item-specifics_features">
			<span className="item-specifics_condition_label">Features</span>
			<span className="item-specifics_condition_value">{ features }</span> 
		</li>
		<li className="item-specifics_datePurchased">
			<span className="item-specifics_condition_label">Date Purchased</span>
			<span className="item-specifics_condition_value">{ datePurchased }</span>
	    </li>
		<li className="item-specifics_location"> 
			<span className="item-specifics_condition_label">Location</span>
			<span className="item-specifics_condition_value">{ location }</span>
		</li>
		<li className="item-specifics_notes"> 
			<span className="item-specifics_notes_label">Seller Notes</span>
			<span className="item-specifics_notes_value">{ notes }</span>
		</li>
	</ul>
};

export default ItemSpecifics;