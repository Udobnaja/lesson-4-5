module.exports = ({res, router, error}) => {
    res.render(router, {
        error
    });
};