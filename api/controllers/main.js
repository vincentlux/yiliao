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

const auth = (req, res, db, bcrypt, spid) => {
  const {username, password} = req.body
  db('account').where({username}).select('password','user_id','role_id')
    .then(item => {
      // no such user
      if (item.length!==1) {
        res.json({login: 'failure'})
      } else {
        let user_role = 'normal'
        if (item[0].role_id === Number(spid)) {
          user_role = 'super'
        }
        bcrypt.compare(password, item[0].password, function(err,hashres) {
          if(hashres) {
            res.json({login: 'success',userid: item[0].user_id,userrole: user_role})
          } else {
            res.json({login: 'failure',userid: '',userrole: ''})
          }
        })
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))

}

const upload = (req, res, store, db) => {
  const file = req.file
  const {userid} = req.body
  const osspath = userid+'/'+file.filename

  // no identical names
  db('file').where({file_location: osspath})
    .then(item => {
      if(item.length !== 0) {
        res.json({upload: 'duplicate'})
      }
    })
  store.put(osspath,file.destination+'/'+file.filename).then(response => {
    if(response.res.status === 200) {
      db('file').insert({user_id: userid,file_location: osspath})
        .then(() => res.json({upload: 'success'}))
        .catch(err => res.status(400).json({uploadError: 'upload error'}))
    } else {
      res.json({upload: 'failure'})
    }
  })
}

const getFileList = (req, res, db, spid) => {
  const {user_id} = req.body
  db('account').where({user_id}).select('role_id')
    .then(items => {
      if(items[0].role_id === Number(spid)) {
        console.log('OK');
        db('file').join('account','file.user_id','=','account.user_id').select('file.file_location', 'file.upload_time', 'account.username')
          .then(items => {res.json(items)})
          .catch(err => res.status(400).json({getError: 'get file list error'}))
      } else {
        db('file').where({user_id}).select('file_location', 'upload_time')
          .then(items => {res.json(items)})
          .catch(err => res.status(400).json({getError: 'get file list error'}))
      }
    })
}

const createUser = (req, res, db, bcrypt, nmid) => {
  const {company_name, username, password} = req.body
  db('account').where({username})
    .then(item => {
      if(item.length !== 0) {
        res.json({create: 'duplicate'})
      } else {
        bcrypt.hash(password, 10, function(err, hash) {
          db('account').insert({username, password: hash, role_id: Number(nmid), company_name})
          .then(() => res.json({create: 'success'}))
          .catch(err => res.status(400).json({createError: 'create error'}))
        });
      }

    })
    .catch(err => console.log(err))
}

const getUserList = (req, res, db) => {
  db('account').where({role_id: 2}).select('username','create_on','company_name')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const changePassword = (req, res, db, bcrypt) => {
  const {username, oldpassword, newpassword} = req.body
  console.log(req.body)
  db('account').where({username}).select('password')
  .then(items => {
    bcrypt.compare(oldpassword, items[0].password, function(err,hashres) {
      if(hashres) {
        // update new password
        console.log('true')
        bcrypt.hash(newpassword, 10, function(err, hash) {
          db('account').where({username}).update({password: hash})
          .then(() => res.json({change: 'success'}))
        })
      } else {
        res.json({change: 'failure'})
      }
    })
  })



}




module.exports = {
  testDBConn,
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  upload,
  auth,
  getFileList,
  createUser,
  getUserList,
  changePassword,
}
