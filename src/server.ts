import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import * as express from 'express';
import {join} from 'path';
import {AppServerModuleNgFactory} from '../dist/ngfactory/src/app/app.server.module.ngfactory';
import {readFileSync} from 'fs';
import {renderModuleFactory} from '@angular/platform-server';
const app = express();

const renderingTemplate = readFileSync(join(__dirname, '../dist/index.html')).toString();

app.engine('html', (filePath, options, callback) => {
  const renderingOptions = {
    document: renderingTemplate,
    url: options.req.url
  };
  renderModuleFactory(AppServerModuleNgFactory, renderingOptions).then((html) => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(__dirname, '../dist'));

app.get('*.*', express.static(join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.render('index', {req: req});
});

app.listen('4000');
