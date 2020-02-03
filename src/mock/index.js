const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/movieComingList', 'get', require('./json/movieComingList'));
Mock.mock('/api/cinemaList', 'get', require('./json/cinemaList'));
