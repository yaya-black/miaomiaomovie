const Mock = require('mockjs');
//格式： Mock.mock( url, post/get , 返回的数据)；
//Mock.mock('/api/movieComingList', 'get', require('./json/cityList'));
Mock.mock('/api/movieComingList', 'get', require('./json/movieComingList'));
Mock.mock('/api/movieOnInfoList', 'get', require('./json/movieOnInfoList'));
Mock.mock('/api/cinemaList', 'get', require('./json/cinemaList'));
Mock.mock('/api/detail=41747', 'get', require('./json/detail=41747'));
Mock.mock('/api/detail=1218273', 'get', require('./json/detail=1218273'));
Mock.mock('/api/detail=1214142', 'get', require('./json/detail=1214142'));
Mock.mock('/api/detail=1238783', 'get', require('./json/detail=1238783'));
Mock.mock('/api/detail=338747', 'get', require('./json/detail=338747'));

