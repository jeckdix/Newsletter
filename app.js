const express = require("express");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const request = require("request");
const { sendFile } = require("express/lib/response");

const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
};

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  mailchimp.setConfig({
    apiKey: "e332faa6994024172f7839d26999cae1-us14",
    server: "us14",
  });

  const run = async () => {

    try {
      const response = await mailchimp.lists.addListMember("a37fc27e5a", {
        email_address: email,
        merge_fields: {
          FNAME: fName,
          LNAME: lName,
        },
        status: "subscribed",
      });
      console.log(response);
      res.sendFile(__dirname + "/success.html");
    } catch (error) {
      console.log(error.status)
      res.sendFile(__dirname + "/failure.html")
     
    }
  
  };

  run();
});
app.post ("/failure", function (req, res) {
  res.redirect("/")
});




app.listen(port, function () {
  console.log("Serving is running on port 3000");
});

// Mailchip Integration

// API key e332faa6994024172f7839d26999cae1-us14
