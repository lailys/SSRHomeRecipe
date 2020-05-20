import mongodb from 'mongodb'


const MongoClient = mongodb.MongoClient
let _db




export function mongoConnect(cb) {

  MongoClient.connect('mongodb+srv://laily:MwZ0kloNsWWxHN5F@cluster0-m4fqf.mongodb.net/page?retryWrites=true', {
      useUnifiedTopology: true
    })
    .then(client => {
      console.log('yeyyyyyy')
      _db = client.db()
      cb()
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

export function getDb() {
  console.log("getdbbbbbbbbbbb")
  if (_db) {

    return _db.collection('recipes')
      .insertOne({
        name: "kuku",
        price: 0
      })
      .then(res => console.log(res, "+++++++++++"))
      .catch(err => console.log(err))

  }
  throw 'No database found!';
}
export function fetchAll() {
  console.log(_db,"fetchalllllllllllllllllllllll")

  return _db.collection('recipes')
    .find()
    .toArray()
    .then(recs => {
        // console.log(recs)
        return recs
    })
    .catch(err => console.log(err))
}



export default {
  mongoConnect,
  getDb,
  fetchAll
}
