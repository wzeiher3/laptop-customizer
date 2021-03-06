const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Will';
/**
 * listApiFetch - Wrapper function for native `fetch` to standardize error handling. 
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise} -
 */
const listApiFetch = function (...args) {
    // setup var in scope outside of promise chain
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = { code: res.status };
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
  
        
        return res.json();
      })
      .then(data => {
        
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        
        return data;
      });
  };

  const getItems = function () {
    return listApiFetch(`${BASE_URL}/bookmarks`);
  }; 

  const createItem = function (name) {
    const newItem = JSON.stringify({ name });
    return listApiFetch(`${BASE_URL}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newItem
    });
  };
  
//   const updateItems = function () {
//       return 
//   }