const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;
const { userMiddleware } = require("../middleware/user");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const userSignupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
})

const userLoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

const userRouter = Router();
userRouter.post("/signup", async function(req, res) {
    const { email, password, firstName, lastName } = userSignupSchema.parse(req.body); // TODO: adding zod validation
    // TODO: hash the password so plaintext pw is not stored in the DB

    // TODO: Put inside a try catch block
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
        email: email,
        password: hashedPassword,
        firstName: firstName, 
        lastName: lastName
    })
    
    res.json({
        message: "Signup succeeded"
    })
})

userRouter.post("/signin",async function(req, res) {
    const { email, password } = userLoginSchema.parse(req.body);

    // TODO: ideally password should be hashed, and hence you cant compare the user provided password and the database password
    const user = await userModel.findOne({
        email: email,
    }); //[]

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (user && isPasswordCorrect) {
        const token = jwt.sign({
            id: user._id,
        }, JWT_USER_PASSWORD);

        // Do cookie logic

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", userMiddleware, async function(req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId,
    });

    let purchasedCourseIds = [];

    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }

    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = {
    userRouter: userRouter
}