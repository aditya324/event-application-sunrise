import bcrypt from "bcryptjs";
import userModel from "../schema/user.model.js";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);

  const user = await userModel.findOne({ email });

  if (user) {
    return res.status(404).json({ message: "user already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });


    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }


    const payload = {
        userId: user._id,
        email: user.email,
      };
  
      const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", user, token  });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

