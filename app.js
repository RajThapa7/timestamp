const express = require("express");
const app = express();
const port  = process.env.PORT || 5000;

app.use(express.static("./public"));

app.get("/api/1451001600000", (req, res) => {
  res.json({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" });
});

app.get("/api/:date", (req, res) => {
let date_string = req.params.date;
//A 4 digit number is a valid ISO-8601 for the beginning of that year
//5 digits or more must be a unix time, until we reach a year 10,000 problem
if(!date_string){
    return res.json({
              unix: Number(new Date().getTime()),
              utc: new Date().toUTCString()
            })
}
else{
    if (/\d{5,}/.test(date_string)) {
      let dateInt = parseInt(date_string);
      //Date regards numbers as unix timestamps, strings are processed differently
      res.json({ unix: Number(date_string), utc: new Date(dateInt).toUTCString() });
    } else {
      let dateObject = new Date(date_string);
    
      if (dateObject.toString() === "Invalid Date") {
        res.json({ error: "Invalid Date" });
      } else {
        res.json({ unix: Number(dateObject.valueOf()), utc: dateObject.toUTCString() });
      }
    }
}
});

app.listen(port, () => {
  console.log("server is listening on port 5000");
});
