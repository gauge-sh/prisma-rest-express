import {loadArticles} from './client.mjs'; console.log(await loadArticles(process.env.API_BASE_URL || 'http://localhost:3000'));
