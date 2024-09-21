import dbConnect from "../../utils/dbConnect";
import Sponsor from "../../utils/models/sponsorSchema";
import nodemailer from "nodemailer";

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const handler = async (req, res) => {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const sponsor = new Sponsor(req.body);
      await sponsor.save();

      const { organizationEmail } = req.body;

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_APP_PASS,
        },
      });

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: organizationEmail,
        cc: "gssoc@girlscript.tech",
        subject: "Thank You for Sponsoring GSSOC'24 Extended Program!",
        html: `
<body style="padding: 0; margin: 0; background-color: #f1f1f1; width: 100%; height: 100%;">
  <div style="width: 90%; max-width: 600px; height: auto; background-color: #ffffff; margin: auto; position: relative; overflow: hidden;">
    <table cellspacing="0" cellpadding="0" width="100%" align="center">
      <tbody>
        <tr>
          <td valign="middle" width="33.33%" align="center" style="padding-top: 20px; padding-bottom: 20px;">
            <a target="_blank" style="background-color:white;">
              <img src="https://github.com/user-attachments/assets/62aa7d8e-5eb1-44b2-aaba-5d0c436a2ce7" alt="" width="100%">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    
    <div>
      <img style="width: 100%; height: auto; object-fit: cover;" src="https://github.com/user-attachments/assets/e8a0dfd6-e243-4594-a209-cde2f48d1505" alt="">
    </div>

    <div style="height: auto; text-align: center; display: flex; flex-direction: column; justify-content: center; padding: 10px;">
      <h1 style="font-size: 1.8em; color: #515151;">
        Thank You for Your Interest in Sponsoring GSSOC'24 Extended Program!
      </h1>
    </div>

    <div style="padding: 20px;">
      <p style="font-size: 1.1em; color: #848484; font-weight: 400;">
        Dear Sponsor,
        <br /><br />
        We are absolutely thrilled to have your generous support for the GSSOC'24 Extended Program! Your commitment to fostering innovation and promoting open-source contributions within the tech community is invaluable to us. By joining hands with GirlScript Summer of Code, you are directly enabling participants to explore their potential, deepen their knowledge, and contribute meaningfully to the world of open source.
        <br /><br />
        We are deeply appreciative of your trust in our mission to support the next generation of developers. Together, we are fostering an inclusive and dynamic space where open-source values are celebrated, and talented individuals are given the tools and guidance they need to succeed. Your involvement is instrumental in ensuring the success of this program, and we are eager to work closely with you to create meaningful opportunities for these bright minds.
      </p>
    </div>

    <div style="background-color: #df551a; color: #ffffff; text-align: center; padding: 20px;">
      <h1 style="font-size: 1.5em; font-weight: bolder;">
        Our Vision for GSSOC'24 Extended
      </h1>
      <p style="font-size: 1.2em;">Empowering Developers, Expanding Horizons</p>
      <p style="font-size: 1em; font-weight: 200;">
        The GSSoC'24 Extended Program offers an additional 30 days of open-source collaboration following the success of GSSoC'24. This extension allows developers to continue learning, contributing, and growing within the open-source community, fostering innovation and engagement. Your sponsorship directly supports these contributors and helps shape the future of tech.
      </p>
    </div>

    <div style="height: auto; color: #848484; font-size: 1em; text-align: center; padding: 20px;">
      <h3>
        Thank you once again for your interest and generosity. We look forward to a successful collaboration.
        <br />The GSSoC'24 Extd. Team
      </h3>
    </div>

    <div style="height: 0.5px; background-color: #515151; margin: 20px 0;"></div>

    <table cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td width="600" align="left">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tbody>
                        <tr>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://x.com/girlscriptsoc?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                              <img title="X" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/x-logo-colored.png" alt="X" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://www.instagram.com/girlscriptsummerofcode/?hl=en">
                              <img title="Instagram" src="https://enpntus.stripocdn.email/content/assets/img/social-icons/logo-colored/instagram-logo-colored.png" alt="Instagram" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="https://github.com/girlscript">
                              <img title="GitHub" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/github-logo-colored.png" alt="GitHub" width="32">
                            </a>
                          </td>
                          <td align="center" valign="top">
                            <a target="_blank" href="mailto:gssoc@girlscript.tech">
                              <img title="Gmail" src="https://enpntus.stripocdn.email/content/assets/img/other-icons/logo-colored/gmail-logo-colored.png" alt="Gmail" width="32">
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p>GSSoC Extd. © 2024, All Rights Reserved.</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table cellpadding="0" cellspacing="0" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">Visit Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/contact" style="color: #999999;">Contact Us</a>
                          </td>
                          <td align="center" valign="top" width="33.33%" style="padding-top: 5px; padding-bottom: 5px; border-left: 1px solid #cccccc;">
                            <a target="_blank" href="https://gssoc.girlscript.tech/" style="color: #999999;">About</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</body>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }

      res.status(201).json({
        message: "Sponsor data saved successfully. Email sending attempted.",
      });
    } catch (dbError) {
      console.error("Error saving sponsor data:", dbError);
      res.status(500).json({ error: "Error saving sponsor data" });
    }
  } else {
    console.warn(`Method ${req.method} not allowed`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default allowCors(handler);
