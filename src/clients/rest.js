import 'whatwg-fetch';

const DOMAIN_BASE = 'http://localhost:3000/';

const REQUEST_OPTIONS =  {
  headers: {}, 
};

const REQUEST_GET_OPTIONS =  Object.assign({}, REQUEST_OPTIONS, {
  method: 'get',
});

const REQUEST_POST_OPTIONS =  Object.assign({}, REQUEST_OPTIONS, {
  method: 'post',
});

const REQUEST_PUT_OPTIONS =  Object.assign({}, REQUEST_OPTIONS, {
  method: 'put',
});

const REQUEST_DELETE_OPTIONS =  Object.assign({}, REQUEST_OPTIONS, {
  method: 'delete',
});

class Rest {
  get(url) {
   return fetch(this.createUrl(url), REQUEST_GET_OPTIONS)
     .then((response) => {  
        return response.text();  
      })
     .then((text) => {
        return JSON.parse(text); 
     })
     .catch((error) => {
        return {
          error,
        }
     });
  }	

  put(url) {
	  fetch(this.createUrl(url), REQUEST_PUT_OPTIONS).then((response) => {  
      return response;  
  	});
  }

  post(url) {
	  fetch(this.createUrl(url), REQUEST_POST_OPTIONS).then(function(response) {  
      return response;  
  	});
  }

  delete(url) {
	  fetch(this.createUrl(url), REQUEST_DELETE_OPTIONS).then(function(response) {  
      return response;  
  	});
  }

  createUrl(url) {
    return `${DOMAIN_BASE}${url}`;
  }
}

export const restClient = new Rest();