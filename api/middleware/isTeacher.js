export default (req, res, next) => {
    if (req.user.role == 1) {
        return res.status('403').send({ msg: 'Permission Denied - Access restricted to teachers only' });
    }
    return next();
};

