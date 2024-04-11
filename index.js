const express = require("express");
const urlRoute = require('./routes/url');
const staticRoutes = require('./routes/staticRouter');
const userRoutes = require('./routes/user');
const cookieParser  = require('cookie-parser')

const {restricTologinUser, checkAuth} = require('./middleware/auth')
const { connectToMongoDB } = require('./connect');
const URL = require('./models/url');
const app = express();
const PORT = 8001;
const path = require("path");

// Enable JSON body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Connect to MongoDB
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Connection Error", err);
  });

// Route middleware
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

app.get("/test", async (req, res) => {
  try {
    const allurls = await URL.find({});
    res.render("home", { urls: allurls });
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/url/:shortid", async (req, res) => {
  try {
    const shortid = req.params.shortid;
    const entry = await URL.findOneAndUpdate({
      shortId: shortid,
    }, {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        }
      }
    });
    if (!entry) {
      return res.status(404).send("URL not found");
    }
    console.log("entry", entry);
    res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error("Error updating URL visit history:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Static and user routes
app.use('/', checkAuth ,staticRoutes);
app.use('/user', userRoutes);
app.use("/url",restricTologinUser, urlRoute);

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).send("404 Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).send("Internal Server Error");
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
