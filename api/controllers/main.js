/*
 * https://medium.com/@olinations/build-a-crud-template-using-react-bootstrap-express-postgres-9f84cc444438
 */

 const testDBConn = (req, res, db) => {

    db.select('*').from('account')
    .then(items => {
        console.log(items)
        if(items.length) {
            res.json(items)
        } else {
            res.json({dataExists: 'false'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(400).json({dbError: 'db error'})
    })

  db.select('*').from('testtable1')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getTableData = (req, res, db) => {
  db.select('*').from('testtable1')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  const { first, last, email, phone, location, hobby } = req.body
  const added = new Date()
  db('testtable1').insert({first, last, email, phone, location, hobby, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id, first, last, email, phone, location, hobby } = req.body
  db('testtable1').where({id}).update({first, last, email, phone, location, hobby})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('testtable1').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const auth = (req, res, db, bcrypt) => {
  const {username, password} = req.body
  db('account').where({username}).select('password')
    .then(item => {
      // no such user
      if (item.length!==1) {
        res.json({login: 'failure'})
      } else {
        bcrypt.compare(password, item[0].password, function(err,hashres) {
          if(hashres) {
            res.json({login: 'success'})
          } else {
            res.json({login: 'failure'})
          }
        })
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))

}

const upload = (req, res, store, db) => {
  const filename = req.file
  console.log('开饭店')
  //console.log({file})
  console.log(req)

}

module.exports = {
  testDBConn,
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  upload,
  auth
}
