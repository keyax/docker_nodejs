//  const modul = require('builtin-modules');
//  console.log(modul); // => []
//[ 'assert','buffer','child_process','cluster','console','constants','crypto','dgram','dns','domain','events',
//  'fs','http','https','module','net','os','path','process','punycode','querystring','readline','repl',
//  'stream','string_decoder','timers','tls','tty','url','util','v8','vm','zlib' ]
//const bluebird = require('bluebird');
//global.Promise = require('bluebird');
//const co = require("bluebird").coroutine;
const co = require("co");
//const { spawn } = require('child_process')  // execute shell commands
//var fs = Promise.promisifyAll(require("fs"));  // readFileAsync
const fs = require('fs');
const mzfs = require('mz/fs');
const assert = require('assert');
const path = require('path');
var util = require('util');
//characters allowed in a URI are either reserved !*'();:@&=+$,/?#[] or unreserved A-Za-z0-9_.~- (% in percent-encoding)
//REGEXP '[^]A-Za-z0-9_.~!*''();:@&=+$,/?#[%-]+' to find URL string with bad characters
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
const qs = require('querystring');
//var fetch = require('node-fetch');
//const Cors = require('koa2-cors');
const xhr2 = require('xhr2');
const http = require('http');
// const https = require('https');

const Koa = require('koa');
const appk = new Koa();  // const appk = Koa();
const serverk  = http.createServer(appk.callback());  // can mount (express.app) // serverk.listen(8000);
// const serverks  = https.createServer(appk.callback()); // serverks.listen(8443);
const app = new Koa();  // const app = Koa();
const server  = http.createServer(app.callback());  // can mount (express.app) // server.listen(8000);
const Compose = require('koa-compose');
const Convert = require('koa-convert');  // appk.use(Convert(legacyMiddleware))
// appk.use(Convert.compose(legacyMiddleware, modernMiddleware))
// koa deprecated Support for generators will be removed in v3.
// ---------- override app.use method ----------convert generator to promise & back ?
const _use = appk.use   // Application.appk.use.x [as use] >> appk.use(require('./routes/pass.js')(routerk, passport)); // Object.<anonymous>
appk.use = x => _use.call(appk, Convert(x))
// ---------- end ----------

const Routerk = require('koa-router');
const routerk = new Routerk(); // new{prefix: '/'}
///routerk.prefix('/');
const Combine = require('koa-combine-routers');

const send = require('koa-send'); //  ctx.send(201, { message: 'new beginnings!' });
const respond = require('koa-respond');  // ctx.ok({ id: 123, name: 'Dat Boi' });  ctx.notFound({ message: 'Not found, boii' });
const Static = require('koa-static');
const Mount = require('koa-mount');
const routek = require('koa-route');

//const bodyParse = require('body-parser');     // get information from html forms
//const jsbody = require('koa-json-body');  // only JSON in POST, PUT, PATCH
//parse in every route -> app.use(jsbody({limit:'10kb',fallback:true})); app.use((ctx,next)=>{console.log(ctx.request.body)})
//parse in users route -> app.post('/users', jsbody, (ctx, next) => { console.log(ctx.request.body) })
const bodyParser = require('koa-bodyparser');
const Parser = require('koa-body');
const Valid = require('koa-validate');

const kbb = require('koa-busboy');
// const abb = require('async-busboy');
const progress = require('progress-stream');
const jwt = require('jsonwebtoken');
const jsparse = require('json-parse-async');
const jsonref = require('json-schema-ref-parser');
var Formis = require('koa-formidable');
const Multer = require('koa-multer');
const Logger = require('koa-logger');

const mongoose = require('mongoose');
const Mongoose = mongoose.Mongoose;
Mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const Mongo = mongoose.mongo;
//const Mongo = require('mongodb');
const MongoServer = Mongo.Server;
const MongoClient = Mongo.MongoClient;
const Db = Mongo.Db;
const Bson = Mongo.BSON;  //var Bson = new bson.serialize();
const sessionkmongoose = require('koa-session-mongoose'); // Schema is not a constructor (if after store)
//const    sessionkstore = require('koa-session-store');  //  fn* generator  or koa-generic-session
//const    sessionkmongo = require('koa-session-mongo');
const    sessionkstore = require('koa-generic-session');  //  fn* generator  or koa-generic-session
const    sessionkmongo = require('koa-generic-session-mongo');

const koaSession = require('koa-session');
// const KSsession = require('koa-socket-session');

const CSRF = require('koa-csrf');
var passport = require('koa-passport');

const flash = require('koa-connect-flash'); // +koa-generic-session > this.flash()
//const flash = require('koa-flash'); // +koa-session > this.session['koa-flash']
//////const cookieParser = require('cookie-parser'); // read cookies (needed for auth)
// const cookieParser = require('koa-cookie'); // only parser ctx.cookie <- {name:'abc',age:'20',token:'xyz'}
//var Cookie = Cookiek(); // Cookiek is not a function
const Cookies = require('cookies');

const socketio = require('socket.io');
const siokAuth = require('socketio-auth');
//const siok = socketio(serverk, {origins:'keyax.org:* http://www.keyax.org:* ws://keyax.org:*'}); // socketio(appk);
//const siok = socketio.listen(serverk);
//const IO = require('koa-socket.io');
//const io = new IO({namespace: '/uploadz'});
const IO = require('koa-socket-2');
const io = new IO();  // const ks = new KS({namespace: '/uploadz'});
//io.attach(appk);
//const mongoAdapter = require('socket.io-mongodb'); // siok.adapter(mongoAdapter('mongodb://localhost:27017/socket-io'));
//const mubsub = require('mubsub');
const render = require('koa-ejs');
render(appk, {
  root: path.join(__dirname, 'views'),
  layout: 'layout.html',  // template
  viewExt: '',
  cache: false,
  debug: false,
});

appk.proxy = true;  // koa passport trust proxy
let expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
var filesize = 0;

// Improve debugging
 process.on('unhandledRejection', (reason, p) => {
     console.log('Unhandled Rejection at:', p, 'reason:', reason)
 })

// const sqlconnect = require('./sqlconnect.js');   // pool or single
var User      = require('./models/user').userw;  // ../app/models/user   default  .js
var dbconx = require('./models/dbconnect.js');
var dbadmin = dbconx.dbadmin();
appk.keys = dbadmin.session.secrets; // ["keyax57secretos"];  //salt key needed for cookie-signing
const nodeport =  parseInt(`${dbadmin.nodeport}`) || process.argv[2] || 8000; // node server.js 8000 // pass parameter in command line
var dbm = dbconx.opengoose();
//var dbx = dbconx.openclip();

//=================DATA HANDLING /models/dbconnect.js=======================
/*
console.time("fileread");  //  1173.343ms
mzfs.readFile(process.env.DBADMIN, 'utf8')  // 1150.706ms
.then(function(dbadmin){return dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');}) // 0.252ms
.then(function(dbadminq){return JSON.parse(dbadminq);}) // 0.191ms
.then(function(dbadminqp){return JSON.stringify(dbadminqp[0]);}) // 0.149ms
.then(function(record){console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record);}) // 7.609ms
.then(()=>{console.timeEnd("fileread");})  //  1173.343ms
.catch(error => console.error(error));
//console.timeEnd("fileread");  //0.714ms
// console.log("DBADMIN:"+process.env.DBADMIN+'\n '+JSON.stringify(dbadminqp[0])); // 2.541ms
*/
/*
console.time("fileread");   // mzfs. 0.342ms fs. 0.396ms  (0.111ms console.timeEnd)
var dbadmin = fs.readFileSync(process.env.DBADMIN, 'utf8');  // mzfs. 0.212ms fs. 0.202ms
var dbadminq = dbadmin.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');  // quoted correct JSON 0.245ms
var dbadminqp = JSON.parse(dbadminq); // 0.150ms
var record = JSON.stringify(dbadminqp.session); // 0.140ms
console.timeEnd("fileread");
console.log("DBADMIN:"+process.env.DBADMIN+'\n '+record); // 2.810ms
const dbsroot = dbadminqp.dbsroot.createUser;  // dbsroot dbsuser dbsdemo
const dbsrootpwd = dbadminqp.dbsroot.pwd;
const kyxown = dbadminqp.dbowner.createUser;  // dbowner(adm) dbuser(rw) in kyxtree
const kyxownpwd = dbadminqp.dbowner.pwd;
const nodeport =  parseInt(`${dbadminqp.nodeport}`) || process.argv[2]; // node server.js 8000 // pass parameter in command line
const mongoport =  parseInt(`${dbadminqp.mongoport}`) || process.argv[3]; // node server.js 8000 // pass parameter in command line
appk.keys = dbadminqp.session.secrets; // ["keyax57secretos"];  //salt key needed for cookie-signing
*/
/*
var dbenv = {
  optodm: {  // ODM object data modeling with mongoose.js
    promiseLibrary: global.Promise,
//  promiseLibrary: bluebird // deprecated
    useMongoClient: true,
    authSource: "admin",
    poolSize: 2,  // default 5  maxPoolSize
//  socketOptions: {
    keepAlive: 120,
    connectTimeoutMS: 2000 //, 500
//  } //,
//  uri_decode_auth:true,
//  ssl: true,
  },  // end optodm
  optcli: {
    promiseLibrary: global.Promise,
//  promiseLibrary: bluebird // deprecated
//  useMongoClient: true,  // nooot supported
    authSource: "admin",
    poolSize: 2,  // default 5  maxPoolSize
//  socketOptions: {
    keepAlive: 1200,
    connectTimeoutMS: 2000 //, 500
//  } //,
//  uri_decode_auth:true,
//  ssl: true,
  },  // end opts
  dbback: (err, db) => { //assert.equal(null, err);
        if (err) {
          console.log("MongoDb is not connected");
          }
        if (db) {appk.context.kyxtree = dbenv.dbs.kyxtree = {} = db;
          console.log("MongoDb is connected to database: "+db);
          }
        return;
      },
  collback: (err, db) => { //assert.equal(null, err);
            if (err) {
              console.log("MongoDb coll is not connected");
              }
            if (db) {dbenv.dbs.kyxtree = db;
                    console.log("count!!!!!!!", dbenv.dbs.kyxtree.collection('geo').findMany({}).count());
                  //   insert({"comment":"comentario de texto"});
              console.log("MongoDb coll is connected to database: "+db);
              }
            return;
          },

  dbs: {},
  colls: {}     // end cback
}; // end dbenv
*/


/*
const dbUrl = `mongodb://${dbsroot}:${dbsrootpwd}@172.17.0.1:${mongoport}/admin`; // default /admin
// mongodb container service name instead ip 172.17.0.1, ? 10.0.0.3
const mongooseConn = mongoose.createConnection(dbUrl, dbenv.optodm, dbenv.dbback);

//appk.context.kyxoose = dbenv.dbs.kyxoose = {}
var mygoose = async function () {
      return await MongoClient.connect(dbUrl, dbenv.optodm);
    }();
*/

/*
appk.context.kyxtree = dbenv.dbs.kyxtree = {} = async function () {
      return await MongoClient.connect(dbUrl, dbenv.optcli);
    }
*/

/////////////////////////var insread = async function (ctx, next){
/////////////////////////try {
//  appk.context.kyxoose = dbenv.dbs.kyxoose = await Mongoose.connect(dbUrl, dbenv.optodm);
  //appk.context.kyxtree = dbenv.dbs.kyxtree =
//  MongoClient.connect(dbUrl, dbenv.optcli, dbback);
//   appk.context.srvtree = dbenv.dbs.srvtree = await new MongoServer("172.17.0.1", mongoport, dbenv.optcli);
//   appk.context.clitree = dbenv.dbs.clitree = await new MongoClient(MongoServer);
//   appk.context.admin = dbenv.dbs.admin = await dbenv.dbs.server.open(dbUrl, dbenv.optcli, dbenv.dbback);
//   appk.context.admin = dbenv.dbs.admin = await new MongoClient.connect(dbUrl, dbenv.optcli);
//   appk.context.kyxtree = dbenv.dbs.kyxtree = await MongoClient.db("kyxtree");

//   appk.context.kyxtree = dbenv.dbs.kyxtree = await dbenv.dbs.clitree.connect("admin", dbenv.dbback);
// appk.context.kyxtree = dbenv.dbs.kyxtree = await MongoClient.connect(dbUrl, dbenv.optcli); //,dbenv.collback
//   var resins = await dbenv.dbs.kyxtree.collection('geo').insertOne({geoid: "es/an/se/se"});
//   var resfind = await dbenv.dbs.kyxtree.collection('geo').findOne({"geoid": "es/an/se/se"});
//      console.log("resins: ", resins, "\n>> resfind: ", resfind);



//let appkoose = await mongoose.connect(dbUrl, dbenv.optodm);
//mongooseConn = await mongoose.connection.openUri(dbUrl, {useMongoClient: true});
  //dbenv.dbs.kyxtree.command({ dropIndexes: "users", index: "*" });
/*
dbenv.dbs.applix = dbenv.dbs.kyxtree.db("applix");
var applixsys = dbenv.dbs.applix.collection('system.js');  // Functions alias system.js collection
//new Mongo.Code(); // Code { _bsontype: 'Code', code: undefined, scope: undefined }
////applixsys.insertOne({_id : "Adder", value : function (x, y){ return x + y; } },{'serializeFunctions':true} );
var funy = await applixsys.findOne({_id:"Adder"}); //,{'evalFunctions':true});
//var funy = await applixsys.findOne({_id: "Adders", value: {$type: 13}},{_id: 0,value:1},{'needParse': true, 'evalFunctions': true});
//result = await dbenv.dbs.applix.eval("Adder(50,7)"); // MongoError: not authorized execute command $eval
///{ _id: 'Adder',
///  value: Code { _bsontype: 'Code',
///                code: 'function (x, y){ return x + y; }',
///                scope: undefined } }
let Adder = new Function('return ' + funy.value.code)();
//let Adder = eval("(()=>{return " + funy.value.code+"})()");
//var Adder = eval("var f = function(){ return "+funy.value.code+";}; f() ;") ;
//var Adder = function (x, y){ return x + y; }; // const btick = "`";
await console.log(Adder(50,7));
*/
//dbenv.dbs.kyxtree.close();
//dbenv.dbs.applix.close();
/////////////////////} catch (err) {
//////////////////////console.log("Error try catch: ",err);
// ctx.body = { messagedb: err.message } // ctx not defined
// ctx.status = err.status || 500
//////////////////////}
//////////////////////}();

/*
var coll = dbenv.colls.geo;
coll.find({}, function(err, docs) {
   docs.each(function(err, doc) {
     if(doc) {
       res.write(JSON.stringify(doc) + "\n");
     }
     else {
       res.end();
     }
   });
});*/
//var geo = dbenv.colls.geo; //  dbtree.createCollection("geo");
//geo.insert({"comment":"comentario de texto"});


/*
mongooseConn.then(db => {   //db.createUser(dbadminqp.superadmin);
                         console.log('Mongoose has been connected'+db);})
       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;
*/
// var mongooseConn = MongoClient.connect(dbUrl, dbenv.optcli); // ,{poolSize:10,ssl:true,uri_decode_auth:true},
//var mongooseConn = mongoose.createConnection(dbUrl, dbenv.optodm);
//mongooseConn.then(db => {appgoose=db;console.log('Mongoose has been connected');})
//       .catch(err => {console.log('Error while trying to connect with mongodb: '+err); });  // throw err;

// Even though it's a promise, no need to worry about creating models immediately, as mongoose buffers requests until a connection is made
//    return mongoDB
//};

/*
async function startApp() {
  await next();
  return sessionkstore.setup();
}
*/

//=================END DATA HANDLING /models/dbconnect.js=======================

/*
//var langs=["eng","spa","arb"];var sysmsgs={};langs.forEach((x)=>{sysmsgs[x]=kyxtree.lng.findOne({"lang":x,"id":"sysmsgs"}));
var sysmsgs = {
  eng:{"FileNotFound":"File not found"},
  spa:{"FileNotFound":"Archivo no encontrado"},
  arb:{"FileNotFound": "ملف غير موجود"}
};
var applbls = {
  eng:{"Country": "country",
       "Name": "name"},
  spa:{"Country": "país",
       "Name": "nombre" },
  arb:{"Country": "دولة",
       "Name": "إسم"}
};
*/
/*
//const appi = new Koa();  // const app = Koa();
const a = new Koa();
a.use(async function (ctx, next){
  await next();
  ctx.response.body = 'Hello friends!!';
});
appk.use(Mount('/helo', a));
routerk.get('/hi', function (ctx) {
// hello
  // ctx.router available
//const res = await ctx.response;
  console.log("ctx.params:"+ctx.response);
});
*/
//var conexion = null;
var resultado = "";
//=================ERROR HANDLING START KOA=======================
appk.use(async (ctx, next) => {  // koa error handling
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
//    ctx.emit('error', err, ctx);
    console.log('ErrorKoa: ', err);
// (node:1075) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 timeout listeners added. Use emitter.setMaxListeners() to increase limit
// process.setMaxListeners(15); // require('events').EventEmitter.defaultMaxListeners = 15; // default 10 unlimited 0
  }
});  //  end error middleware

/*
//  koaSession = require('koa-session');  sessionkmongoose = require('koa-session-mongoose');
const CONFIGS = {
//  store: "cookie",   // session storage layer - see below
    store: new sessionkmongoose({
      name: 'kyx:sessgoose',    // cookie name
      connection: dbenv.dbs.kyxoose, // mongooseConn, // dbenv.dbs.kyxoose,
      collection: 'sessions',
      model: 'User',
      expires: 24 * 60 * 60 // 1 day in seconds, 2 weeks is the default
    })
  };
appk.use(koaSession(CONFIGS, appk)); //{store: new sessionkmongoose()}
appk.use(Convert(koaSession(CONFIGS, appk))); //{store: new sessionkmongoose()}
*/

// sessionkstore = require('koa-session-store') + sessionkmongo ose = ('koa-session-mongo ose')
console.log("dbadmin.dbUrl",dbadmin.dbUrl)
const CONFIGS = {
    name: 'kyx:sesgoose',    // cookie name
//  TypeError: this._store.load is not a function
    saveUninitialized: true, // false>needs set ctx.session.something=<something> /true>sets session any visitor
    resave: true, // true>updates session as active even if not modified in request/false>in session store with touch
//  secret: "mysecretcode", //koa2-session-store
//  store: "cookie",   // session storage layer - see below
/*    store: sessionkmongo.create({
       url: dbadmin.dbUrl,
//     url: `mongodb://${dbsroot}:${dbsrootpwd}@172.17.0.1:10017/admin`, // auth in admin -> sessions in admin
//       connection: dbx,
  //     db: "admin",
//     db: appk.context.kyxtree,
//     collection: 'sessions',
       expires: 60 * 60 * 24 * 14 // 2 weeks is the default
*/
  store: new sessionkmongoose({
        connection: dbm, //mongooseConn, //appk.context.kyxoose, //mongooseConn,
        collection: 'sessionz',
        model: 'KoaSession',
        expires: 60 * 60 * 24 * 14 // 2 weeks is the default

/*
    store: new sessionkmongoose({  //  TypeError: this._store.load is not a function
      mongoose: mongooseConn, //appkoose, //mongoose.connect(dbUrl, dbenv.optodm), // appk.context.admoose,
      model: User,
      collection: 'sessions',
//      name: 'KoaSession',
      expires: 24 * 60 * 60 // in sec=1day // 2 weeks is the default
  //     connection: dbenv.dbs.admoose.connect, // appk.context.kyxoose,  //  dbenv.dbs.kyxtree, //  mongooseConn,
       mongoose: dbenv.dbs.admoose,
        db: "kyxtree",
        collection: 'sesions',
      expires: 60 * 60 * 24 * 14   //, // 2 weeks is the default
//      model: 'User'
*/
    }),
    cookie: {
      key: 'kyx:sesgoosec', // (string) cookie key (default is koa:sess)
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
appk.use(Convert(sessionkstore(CONFIGS)));
//appk.use(koaSession(CONFIGS, appk)); //{store: new sessionkmongoose()}
/***************************************

// koa-session-store + koa-session-mongo  ose
appk.keys = dbadminqp.session.secrets; // ["keyax57secretos"];  //salt key needed for cookie-signing
const CONFIGS = {
    name: 'kyxorg:sesgoose',    // cookie name
//  secret: "mysecretcode", //koa2-session-store
//  store: "cookie",   // session storage layer - see below
    store: new sessionkmongoose({
      connection: dbenv.dbs.kyxoose,
      collection: 'sessions',
      model: 'User',
      expires: 60 * 60 * 24 // 1 day, 2 weeks is the default
    }),
    cookie: {
      key: 'kyx:sesgoosec', // (string) cookie key (default is koa:sess)
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
//appk.use(convert(sessionkstore(CONFIGS))); //{store: new sessionkmongoose()}

************************************/

/*
// appk.keys = ["keyax57secretos"];  // set in line 197 from docker swarm secrets
// uid-safe vs uid2 vs node-uuid >>>> base64url.encode(crypto.randomBytes(length).toString('base64'))
// sessionkstore = require('koa-session-store') + sessionkmongoose = require('koa-session-mongoose')
//TypeError: this._store.load is not a function
const CONFIGS = {
    name: 'kyx:appgoose',    // cookie name
//  secret: "mysecretcode", // appk.keys from swarm secrets  //  koa2-session-store
    saveUninitialized: true, // false>needs set ctx.session.something=<something> /true>sets session any visitor
    resave: true, // true>updates session as active even if not modified in request/false>in session store with touch
//  store: "cookie",   // session storage layer - see below
    store: new sessionkmongoose({ // load, save, remove
        connection: dbenv.dbs.kyxoose,  //  appk.context.kyxoose,
        collection: 'sessions',
        model: 'KoaSession',// 'User', //'KoaSession',
//      mongoose: dbenv.dbs.kyxoose,  //mongoose.connection,
//    db: "kyxtree",  //pets.dbc,
//    db: "kyxtree", //"mongodb://user:555777@192.168.1.2:27017/kyxtree", //pets.dbc, // sessions,
//    url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions", //pets.dbc, // sessions,
//    url: "mongodb://172.17.0.1:27017/kyxtree/sessions", //pets.dbc, // sessions,
//    username: "",
//    password: "",
//      expires: 60 * 60 * 24 * 14//, // 2 weeks is the default
     expirationTime: 60
        }),
    cookie: {
      key: 'kyx:sessgo1', // (string) cookie key (default is koa:sess)
       // number || 'session' maxAge in ms (default is 1 days)
       //'session' will result in a cookie that expires when session/browser is closed
       // Warning: If a session cookie is stolen, this cookie will never expire
      maxAge:  3600000, //86400000,//=60*60*24*1000ms
      overwrite: true, // (boolean) overwrite existing cookie (default true)
      httpOnly: true,  // (boolean) httpOnly not access js (default true)
      signed: true,    // (boolean) signed using KeyGrip (default true)
      rolling: false   // (boolean) Force a session identifier cookie to be set on every response.
                       //The expiration is reset to the original maxAge, resetting the expiration countdown. default is false
    }
  };
//const sesion = sessionkstore(CONFIGS);
appk.use(Convert(sessionkstore(CONFIGS))); //, appk));   //cokiesz:{"views":16,"_sid":"AraFxFnUgS2skFR"}
*/
//??appk.use(Convert(sessionkstore({store: sessionkmongo.create({url: dbUrl+"/sessions"})})));
//appk.use(sessionkstore({store: sessionkmongo.create({url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions"})}));
// or if you prefer all default config, just use => app.use(session(appk));



////appk.use(require('cookie-parser')());  // read cookies (needed for auth)
//appk.use(require('body-parser')());    // get information from html forms  // deprecated undefined extended
////appk.use(require('body-parser').urlencoded({ extended: true }));

//appk.use(cookiek("keyax57secretos")); // not a function

app.use(new CSRF({    // add the CSRF middleware
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
  disableQuery: false
}));

//appk.use(Cookies); // read cookies (needed for auth) // error : next is not a function // not found
//appk.use(bodyParser({//enableTypes: ['form', 'json'],
//         onerror: function (err, ctx) {ctx.throw('body parse error', 422);}
//     }));
//enableTypes: parser will only parse when request type hits enableTypes, default is ['json', 'form']
// 'json' <-> myHeaders.append('Content-Type', 'application/x-javascript');
// 'form' 'urlencoded' <-> myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
// 'text' <-> myHeaders.append('Content-Type', 'text/plain');
// 'raw'  <-> myHeaders.append('Content-Type', 'application/octet-stream');
////appk.use(bodyParser({extendTypes: {json: ['application/x-javascript'] } } ) );
// will parse application/x-javascript type body as a JSON string
appk.use(bodyParser({extendTypes: {json: ['application/x-javascript'] } } ) );
// appk.use(bodyParser({extendTypes: {form: ['application/x-www-form-urlencoded'] } } ) );
//appk.use(async (ctx) => {ctx.request.body = await qs.parse(ctx.request.rawBody); return ctx;}); // 404 not found routes

 require('./authpass');
///========================begin authpass.js
///========================end authpass.js
// route middleware to make sure a user is logged in
   function isLoggedIn(ctx, next) {
// if user is authenticated in the session, carry on
      if (ctx.isAuthenticated()) {console.log("AUTHENTICATED in isLoggedIn(ctx,next)"); return next();}
// if they aren't redirect them to the home page
      console.log("UNAUTHENTICATED in isLoggedIn(ctx,next)"); // res.redirect('/hy');
   };
appk.use(passport.initialize());
//appk.use(cookieParser(secret)); // Parse Cookie header and populate ctx.cookies with an object keyed by the cookie names.
appk.use(passport.session());  // needs de/serializeUser to store user in cookie
appk.use(Convert(flash())); // use connect-flash for flash messages stored in session // app. koa deprecated Support for generators

  /*
  async function process(next) {
    await next;
    await function (done) { setTimeout(done, 5000); };
    console.log('processed');
  };
  */

//appk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));});
//appk.use((ctx) => {ctx.cookies.set('sessiond', 123456); ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(x = ctx.cookies.get()));});

appk.use(async (ctx, next) => {
  const btick = "`";
//process.stdout.write("\n"); // newline \n ,rewrite line \r = \x1B[0G in strict_mode = \033[0G in vt220 & windows
  console.log("REQ: %s %s >> %s request.body: %o",ctx.request.method,ctx.request.url,ctx.request.type,ctx.request.body);
  console.log("USR: email: %s > %s: %o",ctx.request.body.email,"ctx.session",ctx.session);
// ctx.request.body only if JSON sent from FormData >> {email:'test@kyax.info',password:'666999'}
///console.log('ctx.request.rawBody:> ',ctx.request.rawBody); // ctx.request.rawBody.email  -> undefined
/*  -----------------------------16766162041707294557720081075
  Content-Disposition: form-data; name="email"
  test@keyax.info
  -----------------------------16766162041707294557720081075
  Content-Disposition: form-data; name="password"
  555777
  -----------------------------16766162041707294557720081075--*/
//  console.log("qs.parse(ctx.request.rawBody)");
//  console.log(qs.parse(ctx.request.rawBody));
//{ '-----------------------------16766162041707294557720081075\r\nContent-Disposition: form-data; name': '"email"\r\n\r\ntest@keyax.info\r\n-----------------------------16766162041707294557720081075\r\nContent-Disposition: form-data; name="password"\r\n\r\n555777\r\n-----------------------------16766162041707294557720081075--\r\n' }
//{ '{"email": "test@kyax.info", "password": "555777"}': '' }
//=============================

//  if (ctx.path === '/favicon.ico') return;  // ignore favicon
    var n = ctx.session.views || 0;
    ctx.session.views = await ++n;
    ctx.body = await ctx.session.views;
    ctx.state.filesize = filesize;   //  socket.io no ctx
    console.log("VU cokie._sid:"+ctx.cookies.get("kyx:sesgoose"));  // undefined
    console.log("VU ctx.socket:"+ctx.socket.id);  // {}
///ctx.session = null;  //destroy session
////
  if (ctx.isAuthenticated()) {console.log("AUTHENTICATED in async views");}
  else {console.log("UNAUTHENTICATED in async views");} //ctx.redirect('/hy');
  await next();  // next() corrects Not Found, await corrects OK
  return ctx;
}); // end async views

/*
// logger
appk.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response
appk.use(ctx => {
  ctx.session.filesize = filesize; //body = 'Hello World';
  return ctx;
});*/

//===========================routerk===================
//app.use(route.delete('/:id', mountDoom));
  /*
  appk.use(route.get('/app', function(ctx) {
    ctx.type = 'html'
    ctx.body = fs.createReadStream('views/app.html')
  }))
  */

/*
    // HOME PAGE (with login links) ========
    routerk.get('/', async function (ctx, next) { // function(req, res)
        res.render('index.ejs'); // load the index.ejs file
    });
*/
// LOGIN ===============================
// show the login form
//   routerk.get('/logito', console.log('logito ok'));
     routerk.get('/loginp', async function (ctx, next) { // function(req, res)
// render the page and pass in any flash data if it exists
//   res.render('login.ejs', { message: req.flash('loginMessage') });
     console.log("msg from pass.js /login");
    });
// process the login form
// app.post('/login', do all our passport stuff here);
// SIGNUP ==============================
// show the signup form
   routerk.get('/signup', function(ctx) {
// render the page and pass in any flash data if it exists
   ctx.render('signup.ejs', { message: ctx.flash('signupMessage') })
           .catch(err => console.error(err)); // Unhandled promise rejection
   });
// process the signup form
// app.post('/signup', do all our passport stuff here);
// process the signup form
// routerk.post('/signup', passport.authenticate('local', { badRequestMessage: 'insert message here' }));
   routerk.post('/signupass', passport.authenticate('local-signup', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/logout', // redirect back to the signup page if there is an error
         failureFlash : false // allow flash messages
   }));
// process the login form
routerk.post('/loginpass', passport.authenticate('local-login', {
         successRedirect : '/profile', // redirect to the secure profile section
         failureRedirect : '/logout', // redirect back to the signup page if there is an error
         failureFlash : true // allow flash messages
}));  //  end POST loginpass
// LOGOUT ==============================
routerk.post('/logout',isLoggedIn, function(ctx, next) {
 ctx.body = "LOGOUT";
       ctx.session.passport= {};
//     ctx.session = "";   // ctx.session.destroy();  // is not a function
//     ctx.state.user = {};  // used to share data btw midwares , nologout
//     ctx.isAuthenticated = false;
//     ctx.redirect('/');
      next();
},isLoggedIn);

    // PROFILE SECTION =====================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
       routerk.get('/profile', isLoggedIn, function(ctx, next) { ctx.body = "PROFILE" ;
      //   console.log("ctx.isAuthenticated"+ctx.isAuthenticated);
          //  ctx.render('profile.ejs', {
          //      user : req.user // get the user out of session and pass to template
          //  });
          next();
        });
    routerk.post("/who", async function (ctx,next) {  //  , isLoggedIn,
         try {
              if (ctx.isAuthenticated()){ console.log("passport authenticated in who !!");}
              if (ctx.isUnauthenticated()){console.log("passport not authenticated in who !!")}
//              ctx.body = await ctx.session; //ctx.state.user;
              //if (ctx.session){console.log("New session", ctx.session);}
              //ctx.cookies.set("kyx:user", email);// = {resp: "login eureka!!"};  // email is not defined
  //      await next(); return ctx;
        } catch (err) {
        ctx.body = { message: err.message }
        ctx.status = err.status || 500
        };
        ctx.body = await ctx.session; //ctx.state.user;
  //      await next(); return ctx;
        });

routerk.get('/hi', async (ctx, next) => {
  ctx.body = 'Hello';
  next();
})

//  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/*
  // Require authentication for now  // requireLogin
  appk.use(function(ctx, next) {
    if (ctx.isAuthenticated()) { console.log("login ok user:"+ctx.passport.user);
       return next(); // await next();
    } else {
       ctx.status = 401
       ctx.body = {
       errors: [{ title: 'Login required', status: 401 }]
//     ctx.body = "ctx.redirect('/')";
       }
     }});
*/
routerk.get('/hola', async (ctx, next) => {
  ctx.body = await 'Hello';
  next();
})

//=========================== routerk===================

//var rooter = require('./routes/index');
//      rooter.use('/', rooter.routes(), rooter.allowedMethods());
//      var api2 = require('./methods/api2');
//      routerk.use('/api2/v0/', api2.routes(), api2.allowedMethods());
//appk.use(rooter);

//console.log("who.......................");
//console.log(require('./routes/index.js')); //(routerk, passport); // ./routes/index.js  default // module.exports = routerk.routes();

////////require('./routes/pass.js')(appk, passport); //
//appk.use(require('./routes/pass.js').pass(routerk, passport));  // Object.<anonymous> // require is not a function
// require('./app/routes.js')(app, passport); // Express: load our routes and pass in our app and fully configured passport
/*
var router10 = require('./routes')(appk); // OK1
var router11 = require('./routes/pass')(appk, passport); // OK1P
Combine([router10, router11]);
**/
//routerc = Combine([require('./routes')(appk)]);
//appk.use(routerc);
//appk.use(routerc.allowedMethods());

// independent routes + module.exports = routerk.routes();
// appk.use(require('./routes')); // ./routes/index.js  default  // OK2

///require('./routes')(appk, passport); //
//require('./routes/pass')(appk, passport); //

//const routek2 = require('koa-route');
//appk.use(routek2.post('/login', appone.login));

//var routerk2 = require('./routes/index.js')(passport);
/*
appk.use(async (ctx, next) => {
       await next();
//       ctx.body = ctx.req;
       console.log("ctx.req:"+ctx.req.email);});  // {}
*/
/*
appk.use(routerk2.routes());
appk.use(routerk2.allowedMethods());
//appk
//  .use(routerk2.routes())
//  .use(routerk2.allowedMethods());
*/


// https://segmentfault.com/q/1010000009716118
appk
//  .use(bodyParser)
  .use(routerk.routes())
  .use(routerk.allowedMethods());
//  .on('error', console.error)
///appk.onerror = console.error
//routerk2.prefix('/w3');

// catch all middleware, only land here if no other routing rules match
// make sure it is added after everything else
/*
appk.use(function *(){
  this.body = 'Invalid URL!!!';
  // this.redirect('/someotherspot');  // or redirect etc
});
*/
//=======================END ROUTERK =================================================
///function callback(req, res) {
  //res = "HOyolanokati";
/*  if (parseInt(req.headers['content-length']) > 1375347) {
    res.end('to large')
  }
  res.end('done in full')
  function ( req, res ) {
    var cookies = new Cookies( ctx.req, ctx.res, { "keys": keys } )
      , unsigned, signed, tampered
console.log("cb req.url:"+ctx.url);
    if ( ctx.req.url == "/" ) {
      cookies
        // set a regular cookie
        .set( "unsigned", "foo", { httpOnly: false } )

        // set a signed cookie
        .set( "signed", "bar", { signed: true } )

        // mimic a signed cookie, but with a bogus signature
        .set( "tampered", "baz" )
        .set( "tampered.sig", "bogus" )

      ctx.res.writeHead( 302, { "Location": "/" } )
      return ctx.res.end( "Now let's check." )
    }

    unsigned = cookies.get( "unsigned" )
    signed = cookies.get( "signed", { signed: true } )
    tampered = cookies.get( "tampered", { signed: true } )

    assert.equal( unsigned, "foo" )
    assert.equal( signed, "bar" )
    assert.notEqual( tampered, "baz" )
    assert.equal( tampered, undefined )

    ctx.res.writeHead( 200, { "Content-Type": "text/plain" } )
    ctx.res.end(
      "unsigned expected: foo\n\n" +
      "unsigned actual: " + unsigned + "\n\n" +
      "signed expected: bar\n\n" +
      "signed actual: " + signed + "\n\n" +
      "tampered expected: undefined\n\n"+
      "tampered: " + tampered + "\n\n"
    )
  };*/
///};
//======================================================================================
//io.attach(appk); //, {origins:'keyax.org:* http://www.keyax.org:* ws://keyax.org:*'} // socketio(appk);
//appk._io.set('origins', 'http://www.keyax.org:8000');
/*
appk._io.on( 'join', ( ctx, data ) => {
  console.log( 'join event fired', data )
})
io.broadcast( 'hiserver', 'Hola red ' );
io.on( 'join', function *( next)  {
  console.log( this.data )
  console.log( this.event)
})
*/
/*
appk._io.on( 'message', ( ctx, data ) => {
  // get username from session
  let username = ctx.session.username;
  // print the message received and username in session
  console.log( `message: ${ data }, username: ${username}` )
});
*/
/*
// koa-session + koa-socket-session + koa-socket.io
// koa-session-store + koa-session-mongo + koa-socket.io
//const opts = {host: 'http://kyx.dynu.net', port: '8000'};
const opts = {host: 'http://keyax.org', port: '8000'};
io.start(serverk, opts);
io.use((ctx, next) => {console.log("hola socketes");});
io.use(co.wrap(function* (next){
  let start = new Date();
  yield next;
  console.log( `response time: ${ new Date() - start }ms` );
}));
*/
// init koa-socket-session as koa-socket's middleware
//io.use(KSsession(appk, koasession));
///io.use(KSsession(appk, sessionkstore)); // fails routes
//????ksio.attach(appk); //koa-socket
/*
io.on('join', (ctx, next) => {
  ctx.socket.emit('hiserver', { hello: 'world baby koa-socket.io >>>'+ctx.socket.id });
  ctx.socket.on('upload', (ctx, next) => {    filesize = ctx.data;
 // console.log( JSON.stringify(ctx) );// {"packet":null,"event":"upload","data":302400}
 // let username = ctx.session.username;// get username from session
 // print the message received and username in session
 // console.log( `message: ${ ctx.data }, username: ${username}` );
 //   socket.broadcast.emit('progress', bytesReceived);
  });
});
*/
/*
// require : http url fs util
var onRequest = function(request, response){
    var urlpath = request.url; // var urlpath = url.parse(request.url).pathname;
    switch (urlpath){
        case "/":
            res.redirect("/www");
            break;
        case "/www":
            res.writeHead(200, {'content-type': 'text/html'});
            fs.createReadStream("/www/index.html").pipe(response);
//          var rs = fs.createReadStream('/www/index.html'); util.pump(rs, response);
            break;
        default:
//          response.writeHead(302, {'Location': '404.html'}); // add other headers here...
            response.writeHead(404, {"Content-Type": "text/html"});
            fs.createReadStream("/www/404.html").pipe(response);
//          var rs = fs.createReadStream('/www/404.html'); util.pump(rs, response);
            break;
    } // end switch
}

serverk.listen(parseInt(`${nodeport}`), onRequest);
serverk.on('error', function (err) {
  // Handle your error here
  console.log(err);
});
process.on('uncaughtException', function(e){
    console.log(e);
});
*/
//===========================================================================
serverk.listen(parseInt(`${nodeport}`), (err) => {
      if (err) {return console.log('something bad happened', err)}
      console.log(`server is listening on port: ${nodeport}`)
});

// koa + socket.io first style
//var siok = require('socket.io')(8200);  // note, io(<port>) will create a http server for you
var siok = require('socket.io')(serverk);
siok  //.of('/uploadz');    //, {path: '/uploadz'};
.on('connection', function (socket){
//  socket.join('room1');  //  socket.leave('room1');  // default Socket#id
//  socket.broadcast.in('room1').emit('hiserver', { hello: 'world baby '+socket.id });
    socket.emit('hiserver', { hello: ` world baby: ${socket.id}` });
    socket.on('hiclient', function (data) {
       console.log(`connected socket ${socket.id} event hiclient received: ${JSON.stringify(data)}`);
       console.log(`with socket cookie: ${socket.request.headers.cookie}`); // previous socket.id
       console.log(`with socket cookie handshake: ${socket.handshake.headers.cookie}`); // previous socket.id
       var date = new Date();
           date.setTime(date.getTime()+(1*24*60*60*1000)); // set 1 day value to expiry
           var expires = "; expires="+date.toGMTString();
       var name = "kyx:socket"; var value = socket.id;
// Not a function         socket.handshake.headers.cookie.kyxsoket = name+"="+value+expires+"; path=/";
// socket.handshake.headers.cookie.set("kyx:socket", socket.id);// = {resp: "login eureka!!"};
    }); //  end on hiclient
/////    socket.on('upload', function (msg) { console.log("msg?????????:"+msg); filesize = msg;});
//  socket.on('upload', async function (msg) {ctx.session.filesize = msg; console.log("msg:",msg);
//  socket.broadcast.emit('progress', bytesReceived);
//  });
});  // end siok.on connection
//    socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
//module.exports.appk = appk;
//module.exports.app = app;
/*var siok = require('socket.io')(serverkio);
siok.on('connection', function (socket){
    socket.emit('news', { hello: 'world baby'+socket.id });
    socket.on('myevent', function (data) {
       console.log('data:'+data);
       console.log(`connected socket news FF!${JSON.stringify(data)}`);
    });
     socket.emit('news',socket.id);
     socket.on('upload', function (msg) {filesize=msg; console.log("msg:",msg);
//         socket.broadcast.emit('progress', bytesReceived);
     });
  });
////      socket.disconnect();
//    socket.disconnect('unauthorized');
//    socket.close();
*/
