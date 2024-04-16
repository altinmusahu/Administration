const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;


//         'mongodb+srv://altinmusahu:dIJoaZwgL2rhjt9o@cluster0.wwynkuo.mongodb.net/'
//'mongodb+srv://altinmusahu:dIJoaZwgL2rhjt9o@cluster0.wwynkuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoConnect = (cb) => {
    MongoClient.connect('mongodb+srv://altinmusahu:yA8Nt8tYUe2CXmQV@cluster0.wwynkuo.mongodb.net/administration?retryWrites=true&w=majority&appName=Cluster0'
    )
      .then((client) => {
        console.log("Connected to database!");
        _db = client.db()
        cb();
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };
  
  const getDb = () => {
    if (_db) {
      return _db;
    }
    throw "No database found";
  };

module.exports = {mongoConnect, getDb};



