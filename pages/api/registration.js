import dbConnect from "../../utils/dbConnect";
import CA from "../../utils/models/caSchema";
import Contributors from "../../utils/models/contributorsSchema";
import Mentor from "../../utils/models/mentorSchema";
import ProjectAdmin from "../../utils/models/projectAdminSchema";

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
  const { method } = req;

  console.log(`Received ${method} request`);

  await dbConnect();

  if (method === "POST") {
    try {
      const { role, ...formData } = req.body;
      let savedData;

      switch (role) {
        case "CA":
          savedData = await CA.create(formData);
          break;
        case "Contributor":
          savedData = await Contributors.create(formData);
          break;
        case "Mentor":
          savedData = await Mentor.create(formData);
          break;
        case "ProjectAdmin":
          savedData = await ProjectAdmin.create(formData);
          break;
        default:
          return res
            .status(400)
            .json({ success: false, message: "Invalid role" });
      }

      return res.status(201).json({ success: true, data: savedData });
    } catch (error) {
      console.error("Error saving data:", error.message);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    console.error(`Method ${method} not allowed`);
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }
};

export default allowCors(handler);
