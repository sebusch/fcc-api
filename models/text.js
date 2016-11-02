var text = {};
var baseUrl = 'http://seb.herokuapp.com';

text.timestamp = {
  title: 'Timestamp Microservice',
  link: '/timestamp',
  userStories: [
    'I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)',
    'If it does, it returns both the Unix timestamp and the natural language form of that date.',
    'If it does not contain a date or Unix timestamp, it returns null for those properties.'
  ]
}
text.timestamp.examples = [ {
  'heading': 'Example usage:',
  'content': [
    baseUrl + text.timestamp.link + '/December%2015,%202015',
    baseUrl + text.timestamp.link + '/December 15, 2015',
    baseUrl + text.timestamp.link + '/1450137600'
  ]
}, {
  'heading': 'Example output:',
  'content': [ '{ "unix": 1450137600, "natural": "December 15, 2015" }' ]
} ]


text.headerParser = {
  title: 'Request Header Parser Microservice',
  link: '/headerparser'
}

text.shortUrl = {
  title: 'URL Shortener Microservice',
  link: '/shorturl',
  userStories: [
    'I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.',
    'If I pass an invalid URL that doesn\'t follow the valid http://www.example.com format, the JSON response will contain an error instead.',
    'When I visit that shortened URL, it will redirect me to my original link.'
  ]
}
text.shortUrl.examples = [ {
  'heading': 'Example usage:',
  'content': [
    baseUrl + text.shortUrl.link + '/new/https://www.google.com'
  ]
}, {
  'heading': 'Example output:',
  'content': [ '{ "original_url": "http://www.google.com", "short_url": "' + baseUrl + text.shortUrl.link + '/gkLni5" }' ]
}, {
  'heading': 'Usage:',
  'content': [ baseUrl + text.shortUrl.link + '/gkLni5' ]
}, {
  'heading': 'Will redirect to:',
  'content': [ 'http://www.google.com' ]
} ]


text.imgSearch = {
  title: 'Image Search Abstraction Layer',
  link: '/imgsearch',
  userStories: [
    'I can get the image URLs, alt text and page urls for a set of images relating to a given search string.',
    'I can paginate through the responses by adding a ?offset=2 parameter to the URL.',
    'I can get a list of the most recently submitted search strings.',
    'Clarification: Results are in groups of 10, with the offset corresponding to page number.'
  ]
}
text.imgSearch.examples = [ {
  'heading': 'Example usage:',
  'content': [
    baseUrl + text.imgSearch.link + '/imagesearch/lolcats%20funny?offset=10',
    baseUrl + text.imgSearch.link + '/latest'
  ]
} ]


text.filesize = {
  title: 'File Metadata Microservice',
  link: '/filesize',
  userStories: [
    'I can submit a FormData object that includes a file upload.',
    'When I submit something, I will receive the file size in bytes within the JSON response'
  ],
  examples: []
};

module.exports = text;
