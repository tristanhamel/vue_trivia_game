import axios from 'axios';

import dummy from '../dummy-data';

export const questionLoader = function(options) {
  const defaults = {
    amount: 30,
    // type: ['multiple','boolean'],
    // difficulty: ['easy', 'medium', 'difficult']
  };

  const params = {...defaults, ...options};
  const URL = 'https://opentdb.com/api.php';

  // return axios.get(URL, {params});

  return Promise.resolve({data:{results: dummy}});
};
