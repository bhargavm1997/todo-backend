let a={}
a.port=3000
a.allowedCorseOrigin="*"
a.apiver="/api/v1"
a.db={
    uri:"mongodb://localhost:27017/todo"
}
a.env="dev"



module.exports={
    port:a.port,
    allowedCorseOrigin:a.allowedCorseOrigin,
    ver:a.apiver,
    db:a.db,
    env:a.env
}