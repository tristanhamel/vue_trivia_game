import axios from 'axios';

export const questionLoader = function(options) {
  const defaults = {
    amount: 30,
    // type: ['multiple','boolean'],
    // difficulty: ['easy', 'medium', 'difficult']
  };

  const params = {...defaults, ...options};
  const URL = 'https://opentdb.com/api.php';

  return axios.get(URL, {params});
};
