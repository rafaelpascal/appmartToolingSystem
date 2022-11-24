const cron = require("node-cron");
const mailer = require("nodemailer");
const UserSchema = require("../models/Auth");
const Setting = require("../models/Settings");
//T0 Get the Current Year, Month And Day

module.exports.reminder_post = async (req, res) => {
  try {
    function getDaysInMonth(year, month) {
      return new Date(year, month, 0).getDate();
    }

    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1; //  months are 0-based
    const dateDay = new Date().getDate(); // start counting from 1
    
    //  Current Month
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
    //console.log(daysInCurrentMonth);
    const DaysLeft = daysInCurrentMonth - dateDay;
    //console.log(DaysLeft);

    const month = [
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
    const d = new Date();
    let monthname = month[d.getMonth()];
    //console.log(monthname)
    // credentials for your Mail

    // var transporter = mailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: "kennethadoh@gmail.com",
    //     pass: "ozbbzcnfwyhgqmpk",
    //   },
    // });

    //Cron Job to run around 7am Server Time
    cron.schedule("* * 07 * * *", async () => {
      ///The Main Function
      const settings = await Setting.find({});
      console.log(settings);
      const[{day,message,numberOfreminder,createdAt}] = settings
       
      
      const Rstartday = new Date(createdAt);
      const rD = Rstartday.getDate()

      const user = await UserSchema.find({ category: { $ne: "admin" } });
      
    
        user.forEach((element) => {
          
          
          console.log(element.id);
          //console.log(day); 
          let d = day.split('-')
          let dD = +d[2]  // For the month
          //console.log(dD );
          //let dM = +d[1] // for the day
          //let age = dateYear - +d[0]
         
          
         

          
          
  
          //  let d = day.split('-')
          //  //console.log(day);
          //  let dD = +d[2]  // For the day
          //  let dM = +d[1] // for the month
          //  console.log(dD);
          //  let age = dateYear - +d[0]

          const today = new Date();
          const Cday = today.getDate();
          //console.log(Cmin)
          const Dueday =dD;
          
          //console.log(Dueday)
          const Init = rD;
          console.log(Init)
          if (Dueday >= Cday) {
            const Duration = Dueday - Init;
            FreqReminder = Duration / numberOfreminder;
            freqRem = Math.trunc(FreqReminder);
            console.log(freqRem);
  
            for (let i = freqRem; i < Duration; i++) {
              //console.log(i);
              const Occurence = Init + i;
              //console.log(Duration)
              console.log(Occurence);
              if (Cday == Occurence) {
                const mailData = {
                  message: message,
                };
          
                const message = makeEmailTemplate('reminder.html', mailData);
                const subject = `Report Reminder due in ${Duration} days`
                sendMail( element.email, message, subject);
                // const mailOptions = {
                //   from: "kennethadoh@gmail.com",
                  
                //   to: element.email,
                //   subject: `Report Reminder due in ${Duration} days`,
                //   html: `${message}`,
                // };
                // return transporter.sendMail(mailOptions, (error, data) => {
                //   if (error) {
                //     console.log(error);
                //     return;
                //   }
                // });
              }
            }
          }
        });
      
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({
      errcode: "06",
      message: err,
    });
  }
};

