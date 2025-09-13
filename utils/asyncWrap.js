function asyncWrap( fn)
{
    return function fun(req, res, next)
    {
        fn(req, res, next).catch((err)=> next(err))
    }
}
module.exports = asyncWrap;