exports.register = (req, res, next) => {
    const { name, email, password } = req.body;

    const result = {
        message: "Register Success",
        data: {
            uid: 1,
            name,
            email,
        },
    };

    return res.status(201).json(result);
};
