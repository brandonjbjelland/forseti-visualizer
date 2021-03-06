// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// express 4.0
const express = require('express');

import api from './server/api';

// setup app
const app = express();
app.set('view engine', 'pug');
app.use(express.static('public')); // images,css,etc.

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Override static assets to use public
console.log(__dirname);
const {
  resolve
} = require('path');
const publicPath = resolve(__dirname, 'dist-forseti-visualizer-ui');
const staticConf = {
  maxAge: '1y',
  etag: false
};
app.use(express.static(publicPath, staticConf));

// set up /api routes
app.use('/api', api({}));

// set up / main route
app.get('/', (req, res) => {
  res.render('index', {
    title: `Forseti-Visualizer`
  });
});

// initialize app
app.listen(process.env['API_PORT'], process.env['API_HOST']);
console.log(`Running on http://${process.env['API_HOST']}:${process.env['API_PORT']}`);