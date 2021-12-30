const nodeMailer = require("nodemailer");
const asyncErrorHandler = require("./asyncErrorHandler");

const sendEmail = asyncErrorHandler(async (options, purpose) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMPT_SERVICE,
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  if (purpose === "register") {

     mailOptions = {
      ...mailOptions,
      html: `
      <img src="cid:logo"/>
      <h3>Hi <b>${options.name}</b>,</h3> </br></br>

      <h4>Welcome to Star Mart! We’re thrilled to see you here! </h4> </br>
      
      <h4>We’re confident that our services will help you find the best products which will brighten your life. </h4> </br>
      
      <h4>You’ll be guided through our services by our own highly professional team to ensure that you will get the very best out of our platform. </h4> </br>
      
      <h4> You can also find more of our guides <u>here</u> to learn more about service. </h4> </br> </br>
      
      <h4> Take care! </h4> </br>
      <h4> <b> Star Mart Team </b> </h4>
      `,
      attachments: [
        {
          filename: "starmart.png",
          path: __dirname + "/starmart.png",
          cid: "logo",
        },
      ],
    };

    //to remove text field from the mailOptions so that when a user 
    //sees their email , they will see the content of the mail 
    //instead of just the 'text' message when not opened
    //also we need this 'text' field for forgot pw mail 
    //but is irrevelant for welcome mail
    delete mailOptions.text;    
  }
    

  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
