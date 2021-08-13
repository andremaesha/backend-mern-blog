const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();

const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    const { mimetype } = file;

    if (
        mimetype === "image/png" ||
        mimetype === "image/jpg" ||
        mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(
    multer({
        storage: fileStorage,
        fileFilter,
    }).single("image")
);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );

    next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({
        message,
        data,
    });
});

mongoose
    .connect(
        "mongodb+srv://mern-blog:andremaesha150@mern-blog.xyp46.mongodb.net/Blogs?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        app.listen(4000, () => {
            console.log("server running at: localhost:4000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
