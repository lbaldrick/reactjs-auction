import React from 'react';
import { connect } from 'react-redux';
import style from './SellerItemForm.scss';
import { createSellItem, } from '../../redux/action_creators/SearchActions';

const mapStateToProps = (state) => {
  return {
     status: state.getIn(['sellerFormDetails', 'status']),
  }
};

class SellerItemForm extends React.Component {

    dispatchSellItem(name, summary, description, buyNow, condition, model, features, 
      purchasedDate, location, sellerNotes) {

      if (![...arguments].filter((arg) => !!arg).length) {
        return;
      }

      this.props.dispatch(createSellItem(this.name, 
        this.summary, this.description, this.buyNow, this.condition, this.model, this.features, 
        this.purchasedDate, this.location, this.sellerNotes));
    }

	onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      this.dispatchSellItem(this.name,this.summary, this.description, this.buyNow, this.condition, this.model, this.features, 
        this.purchasedDate, this.location, this.sellerNotes)
	}

    handleChange(event, id) {
      this[id] = event.target.value;
      event.preventDefault();
    }

	render() {
        const handleChange = (id) => (event) => this.handleChange(event, id);

		return <form className="SellerItemForm" onSubmit={(event) => this.onSubmit(event)}>
   			<div>
    			<label>Name:</label>
        		<input id="name" onChange={handleChange('name')}/>
    		</div>
    		<div>
        		<label>Summary:</label>
        		<textarea id="summary" onChange={handleChange('summary')}></textarea>
    		</div>
    		<div>
        		<label>Description:</label>
        		<textarea id="description" onChange={handleChange('description')}></textarea>
    		</div>
    		<div>
        		<label>Buy Now Price:</label>
        		<input id="buyNow" type="numeric" onChange={handleChange('buyNow')}></input>
    		</div>
    		<div>
        		<label>Condition:</label>
        		<input id="condition" type="text" onChange={handleChange('condition')}></input>
    		</div>
    		<div>
        		<label>Model:</label>
        		<input id="model" type="text" onChange={handleChange('model')}></input>
    		</div>
    		<div>
        		<label>Features:</label>
        		<textarea id="features" onChange={handleChange('features')}></textarea>
    		</div>
    		<div>
        		<label>Purchased Date:</label>
        		<input id="purchasedDate" type="date" onChange={handleChange('purchasedDate')}></input>
    		</div>
    		<div>
        		<label>Location:</label>
        		<input id="location" type="text" onChange={handleChange('location')}></input>
    		</div>
    		<div>
        		<label>Seller Notes:</label>
        		<textarea id="sellerNotes" onChange={handleChange('sellerNotes')}></textarea>
    		</div>

    		<div>
        		<input type="submit" value="Submit" />
    		</div>
		</form>
	}

}

export default connect(mapStateToProps)(SellerItemForm);