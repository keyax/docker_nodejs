//module.exports = function(app, passport) {  // express
//module.exports = function(passport) {

const assert = require('assert');
const path = require('path');
const url = require('url');
const URL = require('url').URL;
// const myUrl = new URL('/a/path', 'https://example.org/');
const fs = require('fs');
var progress = require('progress-stream');
const util = require('util');

var Koa = require('koa');
var appk = new Koa();
const Router = require('koa-router');
const routerk = new Router();
//const routerk = new Routerk(); // new Routerk({prefix: '/corp1'});
//routerk.prefix('corp1')

const bodyParser = require('koa-bodyparser');

const passport = require('koa-passport');

const Multer = require('koa-multer');
const abb = require('async-busboy');
const exif = require('exiftool');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //Warning: Mongoose: mpromise (mongoose's default promise library) is deprecated
const dbUrl = "mongodb://user57:555777@192.168.1.1:27017/kyxtree?authSource=admin";
//const dbUrl = "mongodb://admin:555777@192.168.1.2:27017/kyxtree";
const mongooseConn = mongoose.connection.openUri(dbUrl); //
var User = require('./../models/user');

/*
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello'
})

export default router
*/

/*
routerk.use((ctx,next) => {
//  ctx.body = {"respuesta":"Hola amigos de Keyax router use"};  // second step
    next();
});
*/
///routerk.use("/uploads", Formis());
/*
routerk.use(//"/login",
(ctx) => {
      sessionkstore(
    {store: sessionkmongo.create({
  //  db: kyxtree", //"mongodb://user:555777@192.168.1.2:27017/kyxtree", //pets.dbc, // sessions,
     url: "mongodb://user:555777@192.168.1.2:27017/kyxtree/sessions", //pets.dbc, // sessions,
  //   db: "kyxtree",  //pets.dbc,
  //   collection: "sessions",
  //   username: "yones",
  //   password: "555777",
     expires: 10000*60*60*1})
   }
  // ,appk
)
//  await next();
//ctx.cookies.set('sessiond', 123456);
//ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));
//appk.use(sessionk(appk));
}
);

routerk.use((ctx) => {ctx.session.username="yones";console.log("sessionId:"+JSON.stringify(ctx.session.username));});
*/
/////routerk.use(async (ctx) => {console.log("cookies:"+ cookiek(ctx));}); //cookie parser

routerk.post("/who", async function (ctx, next) {
 try {
ctx.body = ctx.session;
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};
});
//routerk.post("/login", async function (ctx, next) {await abb(ctx.req);},function (filds) {console.log("results",filds);})

routerk.post("/login", async function (ctx, next) {

 try {

const {fields} = await abb(ctx.req);  console.log(util.inspect({fields}));
var username = fields.username;
var password = fields.password;

var userid = await User.findOne({username: username}, function (err, userid) {
                 if (err) {console.log("error find:", err);
                           ctx.throw(400, 'name required', { user: user });}
                 else {console.log('user found:',userid);}
//               return userid;
                 });
if (!userid || userid === null){
   userid = {username: username, password: password};
// userid = await User.create(new User(newUser));
   await User.register(new User(userid), 'userid.password', function(err, newuser) {
                     if (err) {console.log("error register", err);} //return ctx.render('register', { user : user });
                     });
}

if (userid && userid.username === username && userid.password === password) {
         ctx.state.user = {};
         ctx.state.user.username = username;
         ctx.state.user.password = password;
         console.log('logos',ctx.state.user);
         }

if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
ctx.body = ctx.state.user;
if (ctx.session){console.log("New session", ctx.session);}
ctx.cookies.set("kyx:user", username);// = {resp: "login eureka!!"};
return username;

  } catch (err) {
  ctx.body = { message: err.message };
  ctx.status = err.status || 500;
  };
}
//, function (u) {console.log("results",u)}

);  // end routerk.post("/login"

// process the login form
routerk.post('/loginlocal', passport.authenticate('local-login', {
        successRedirect : '/who', // redirect to the secure profile section
        failureRedirect : '/login'//, // redirect back to the signup page if there is an error
//        failureFlash : true // allow flash messages
}));

routerk.post('/loginy', async  function(ctx, next) {  //'/custom'
   //await abb(ctx.req);
  return passport.authenticate('local', function(user, info, status) {
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
//      ctx.throw(401)
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx, next)

//console.log("auth:", ctx.isAuthenticated);
});

// POST /login
routerk.post('/loginz', bodyParser(),
  passport.authenticate('local', {
    successRedirect: '/pets/pets',
    failureRedirect: '/'
  })
);

routerk.post('/loginzz',Multer, function(ctx, next)
{ console.log ("request",ctx.body);
  ctx.state.user = {};
  ctx.state.user.username = ctx.request.username;
  ctx.state.user.password = ctx.request.password;

if (ctx.isAuthenticated()){ console.log("passport authenticated!!");}
if (ctx.isUnauthenticated()){console.log("passport not authenticated!!")}
}
);


routerk.post('/logout', function(ctx) {
  ctx.logout();
  if (ctx.isAuthenticated()){ console.log("logout:passport authenticated!!");}
  if (ctx.isUnauthenticated()){console.log("logout:passport not authenticated!!")}
  ctx.session=null;
//  ctx.redirect('/login');
});
/*
routerk.get('/auth/facebook',
  passport.authenticate('facebook')
)
routerk.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)
routerk.get('/auth/twitter',
  passport.authenticate('twitter')
)
routerk.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)
routerk.get('/auth/google',
  passport.authenticate('google')
)
routerk.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)
// Require authentication for now
appk.use(function(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
})
routerk.get('/app', function(ctx) {
  ctx.type = 'html'
  ctx.body = fs.createReadStream('views/app.html')
})
*/


routerk.post("/uploadf", async function (ctx, next) {
 try {
  //  var form = await Formis.parse(this);
   var form = new formidable.IncomingForm();

const {fields, files} = form.parse(ctx.req, function(err, fields, files) {
//      if (err) return done(err)
//      done(null,
        return { fields: fields, files: files }//)
    });
console.log('fields: '+fields);
/*      form.addListener('progress', function(bytesReceived, bytesExpected){
        //Socket.io interaction here??
//        io.sockets.on('connection', function (socket) {
          sockets.emit('uploadProgress', ((bytesReceived * 100)/bytesExpected));
//         });


      });*/
      //form.uploadDir = __dirname + '/../img/';
      form.uploadDir = path.join(__dirname,'/../img');
      console.log("destinationDir: "+form);
//      form.on('field', )
      form.on('file', function(field, file) {
         //rename the incoming file to the file's name
         fs.rename(file.path, form.uploadDir + "/" + file.name);
         console.log("destination: "+form.uploadDir + "/" + file.name);
      });
       form.on('progress' , function (bytesReceived , bytesExpected) {
    console.log('received: ' + bytesReceived);
/////  socket.emit('uploadProgress', (bytesReceived * 100) / bytesExpected);
  //  io.sockets.in('sessionId').emit('uploadProgress', (bytesReceived * 100) / bytesExpected);

  });

var result = await Formis.parse(this);
console.log('uploadf: '+result);

  //socket.io code
//  io.sockets.on('connection', function (socket) {
/*      socket.on('upload', function (msg) {
          socket.broadcast.emit('progress', bytesReceived);
      });*/
//    });

//  console.log(fields.filelist.length);
//  console.log(util.inspect({fields}));
  ctx.body = {resp: "formidable!!"};

} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};
});

routerk.post("/uploadz", async function (ctx, next) {
 try {
/*
var yo = require("socket.io")(appk);
yo.on('connect', function (socket) { console.log("sockrouter connected");
                                     socket.on('upload', function (msg) {console.log("msg??????????????:",msg);});
 });
*/
let filesize = await ctx.state.filesize;
//socket.on('upload', async function (msg) {filesize = msg; console.log("msg:",msg);});
console.log('filesizerouter:'+JSON.stringify(ctx.session));
const {fields} = await abb(ctx.req, {
    onFile: function(fieldname, file, filename, encoding, mimetype) {
            //uploadFilesToS3(file);
          //  console.log("ctx.req:"+ctx.request.get);
      ///      console.log("filesinctx:"+ctx.req.files);
            console.log("abb:fieldname "+fieldname+" file** "+JSON.stringify(file)+"** filename "+filename+" encoding "+encoding+" mime "+mimetype);
            var upfile = `statics/upload/${filename}`;  // as of `/home/node/statics/${filename}`;

//exiftool for media >> filename user+timegeostamp >> translatable tags
//json test + upsert mongodb

//            events.js:182
//                  throw er; // Unhandled 'error' event
//                  ^
//            Error: EROFS: read-only file system, open 'js/routes/atompush.png'

  //          fs.closeSync(fs.openSync(upfile, 'w'));
/*           fs.open(upfile,'w', function(err,fd){
                  if(err)console.log('cant open: '+upfile+err);//handle error
                      console.log('open: '+upfile);
                  fs.close(fd, function(err){
                     if(err)console.log('cant close: '+upfile+err);//handle error
                      console.log('close: '+upfile);
              });
            });*/
//        var stat = fs.statSync(upfile);

var extFilter = "jpg";
function extension(element) {
  var extName = path.extname(element);
  return element; // extName === '.' + extFilter;
};

/*
fs.readdir(pathSupplied, function(err, list) {
  list.filter(extension).forEach(function(value) {
    console.log(value);
  });
});
*/
//  fs.readdirSync  // ENOENT: no such file or directory
//var filelistext = new FileList;
var filelist = fs.readdirSync('statics/upload/', function(err, list) {
                          list.filter(extension).forEach(function(value) {console.log(value);});
//                filename =>  (filename.substr(0, filename.lastIndexOf('.')) == ".jpg") ? {filelistext.push(filename)}
//                 console.log("filelistext"+filelistext);
});
console.log("filelist"+filelist);

fs.access(upfile, fs.constants.R_OK | fs.constants.W_OK, (err) => {
  console.log(err ? 'no access!' : 'can read/write');
});
fs.unlink(upfile, function(err) {
    if(err && err.code == 'ENOENT') {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
    } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
    } else {
        console.info(`removed`);
    }
});

          var strm = progress({
                  length: filesize, //stat.size,
                  time: 1 // ms
            });
            wstream = fs.createWriteStream(upfile);
            file.pipe(strm).pipe(wstream);

            strm.on('progress', async function(progress) {
                await console.log('progreso:',progress);
                /*
                {
                    percentage: 9.05,
                    transferred: 949624,
                    length: 10485760,
                    remaining: 9536136,
                    eta: 42,
                    runtime: 3,
                    delta: 295396,
                    speed: 949624
                }
                */
            });
          }  // onFile:  end
    }); // await abb ctx.req,
/*
function checkFile(files) {var filename = files[0].filename;
           console.log("filename+check:"+filename);
           if(path.extname(filename) !== 'jpg'){
          var err = new Error('not jpg image');
          err.status = 400;
          return err;
          }
        }; // end checkFile()
const {files, fields} = await abb(ctx.req, {});
checkFile(files);
console.log(util.inspect({files, fields}));
*/

//  console.log("filelist:"+fields.filelist);
  ctx.body = await {resp: "eureka!!"+ filesize};
return ctx;
} catch (err) {
ctx.body = { message: err.message }
ctx.status = err.status || 500
};
});

//appk.context.lista = {};  //  ctx.lista = f();
routerk.post("/sqldb/:langs", async function (ctx, next) {
//  const cokie = ctx.cookie; console.log("routerk.use(cookiek());:"+cokie);  // undefined

  /// ctx.state.varyin = 'vary';
  try {
      //console.log("cokie:"+ ctx.cookies.get("koa:sess"));
  //     console.log("cokie:"+ ctx.varyin);
       ctx.status = 200;
       ctx.set("Access-Control-Allow-Origin", "*");
       ctx.set("Access-Control-Allow-Credentials", "true");
       ctx.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
       ctx.set("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
//     ctx.set("Content-Type", "application/json");
       ctx.type="application/json";
  //     ctx.flushHeaders();
       var ling = ctx.params.langs;
//     var ling = ctx.request.url.slice(ctx.request.url.lastIndexOf('/')+1);
       console.log('%'+ling+'%');
//  var dbconn = require('./dbconnect.js');
  const sqlconnect = require('./../sqlconnect.js');   // pool or single
//  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE VALUE = LANGTO`, // language locale
//  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng'`, // languages fra eng
  var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@Gn:' AND LANGTO='eng'`, // countries eng
//    var sqlopts = { 'sql' : `SELECT VALUE, LEXIC FROM AXIE WHERE SCOPE='@L:' AND LANGTO='eng' AND VALUE LIKE ?`,
                 'values' :  ['%'+ling+'%'], 'timeout' : 40000 }; // '%_%'   40s
                  console.log("ctx.response"+ JSON.stringify(ctx.request.url));
  // const respo[rows, fields] = await sqlconn.execute(env_sql.options.sql)
//      await next();
  ctx.body = await sqlconnect.querypr(sqlopts)
              .then(rows => {//console.log("rowssqlpre:"+rows);  //undefined
            //          ctx.body = rows; //JSON.stringify(rows);
              //      ctx.send(rows);
                /*      var lst = "[";
                      rows.map(value =>{lst += '\"'+value.VALUE+'''\",'});
                      lst += "]";*/
                      var lst = "{";
                      rows.map(value =>{lst += '\"'+value.VALUE+'\":\"'+value.LEXIC+'\",'});
                      lst += "}";

                      console.log("rowssql:"+lst);   //OOOOOOOKKKKKK
//                      console.log("rowssql:"+JSON.stringify(rows));   //OOOOOOOKKKKKK
            /*          // temporary data holder
                      const body = [];
                      // on every content chunk, push it to the data array
                      response.on('data', (chunk) => body.push(chunk));
                      // we are done, resolve promise with those joined chunks
                      response.on('end', () => resolve(body.join('')));
       */
    //            return ctx;
                return rows;
              //  next();
              })
//             .then((ctx) => {ctx.body = rows;})
//       .then(JSON.stringify)
//       .then(rowx => function (rowx) {ctx.body = rowx; console.log("rows*sql:"+ctx.body);})
       .catch(err => function (err) {console.log("Promise Rejected");});
  /*    sqlconnect.queryp(sqlopts, function(err, rows, fields){
      var temp=JSON.stringify(rows);
      var manager = JSON.parse(temp)[0];
      console.log(rows);
      ctx.body = temp;
  //   res.send(manager);
     });*/
// await next();
//await next();
return ctx;

} catch (err) {
  ctx.body = { message: err.message }
  ctx.status = err.status || 500
};
//console.log("sqlcokie._sid:"+ctx.cookies.get("kyx:sess1"));  // undefined
//console.log("sqlsession.blob:"+JSON.stringify(ctx.session));  // {}

//console.log("ctx.session"+ JSON.stringify(ctx.session.isNew));
//await next();
//return ctx;

});  // end sqlang()

// 3*) home page route (http://localhost:8080)
//router.get('/', function (req, res, next) {....});
/*
routerk.post('/xform', function (req, res, next) {
//  function processAllFieldsOfTheForm(req, res) {
      var form = new formidable.IncomingForm();

     form.parse(req, function (err, fields, files) {
      //Store the data from the fields in your data store.
     //The data store could be a file or database or any other store based
     //on your application.
        res.writeHead(201, {'content-type': 'text/plain'} );
        res.write('received the data:\n\n');
        res.end(util.inspect({ fields: fields, files: files
        }));
      });
//  }
});
*/
/////};
module.exports = routerk.routes();
//module.exports = routerk.allowedMethods();
