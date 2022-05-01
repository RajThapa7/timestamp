const express = require("express");
const app = express();

app.use(express.static("./public"));

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var now = new Date(date);
  // console.log(days[now.getDay()] + `,` + now.getDate() + " " + months[now.getMonth()] + ' ' + now.getFullYear());

  if (date) {
    if (now.getDate() > 31 || now.getMonth() > 12) {
      res.json({
        error: "Invalid Date",
      });
    } else {
        return res.json({
          unix: now.getTime(),
          utc:
            days[now.getDay()] +
            `,` +
            now.getDate() +
            " " +
            months[now.getMonth()] +
            " " +
            now.getFullYear() +
            " " +
            now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds() +
            " GMT",
        });
    }
  } else {
    const d = new Date();
    return res.json({
      unix: d.getTime(),
      utc:
        days[d.getDay()] +
        `,` +
        d.getDate() +
        " " +
        months[d.getMonth()] +
        " " +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds() +
        " GMT",
    });
  }
});

app.listen(5000, () => {
  console.log("server is listening on port 5000");
});
