import express from "express";
import jwt from "jsonwebtoken";
import { sendMail } from "../helpers/sendMail";
import { authentication } from "../middleware/authenticator";
import prisma from "../db/db.config";
import { Request } from 'express';
import { sendOTP } from "../helpers/sendOTP";
import bcrypt from "bcrypt";

const router = express.Router();

interface User {
  email: string;
  name: string;
  password: string;
  is_Verified: boolean;
}
interface RequestWithUser extends Request {
  user: User;
}
const mailSubject = "Mail Verification";


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await prisma.user.findUnique({ where: { email: email }});
  if (existingUser) {
    const isUserVerified = existingUser.is_verified
    if (isUserVerified === false) {
      const randomOTP = sendOTP();
      await prisma.user.update({ where: { email: email }, data: { otp: randomOTP, created_at: new Date().toLocaleDateString() }});
      const content =
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
              <html lang="en">

                <head>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
                </head>

                <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                  <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px">
                    <tr style="width:100%">
                      <td><img src="https://i.ibb.co/6rCmn85/rentnridewhite.png" alt="Rent & Ride" width="full" height="60" style="display:block;object-fit:cover;outline:none;border:none;text-decoration:none;margin:0 auto" />
                        <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#444;font-weight:600;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-align:center">Please Verify</p>
                        <h1 style="color:#1E1B13;display:inline-block;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Enter the following code to complete verification.</h1>
                        <table style="background:rgba(0,0,0,.05);border-radius:4px;margin:36px auto 36px;vertical-align:middle;width:full" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td>
                                <p style="font-family:'Playfair Display',serif;font-size:32px;line-height:30px;margin:auto;color:#1E1B13;display:inline-block;font-family:HelveticaNeue-Medium;font-weight:700;letter-spacing:2px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${randomOTP}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Not expecting this email?</p>
                        <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Reply STOP to unsubscribe.</p>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:700;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center">Securely powered by Rent & Ride.</p>
                </body>

              </html>`;
      await sendMail(email, mailSubject, content);
      const emailOldToken = jwt.sign({ email: email }, process.env.hiddenKey as string,{ expiresIn: "24h" });
      res.status(200).json({ message: "User updated", token: emailOldToken });
    } else {
      res.status(403).json({ message: "User already exists", token: null });
    }
  } else {
    const hashedPassword: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 7, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
    const randomOTP = sendOTP();
    await prisma.user.create({ data: { name: name, email: email, password: hashedPassword, is_verified: false, otp: randomOTP, created_at: new Date().toLocaleDateString() }});
    const content =
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
              <html lang="en">

                <head>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
                </head>

                <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                  <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px">
                    <tr style="width:100%">
                      <td><img src="https://i.ibb.co/6rCmn85/rentnridewhite.png" alt="Rent & Ride" width="full" height="60" style="display:block;object-fit:cover;outline:none;border:none;text-decoration:none;margin:0 auto" />
                        <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#444;font-weight:600;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-align:center">Please Verify</p>
                        <h1 style="color:#1E1B13;display:inline-block;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Enter the following code to complete verification.</h1>
                        <table style="background:rgba(0,0,0,.05);border-radius:4px;margin:36px auto 36px;vertical-align:middle;width:full" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td>
                                <p style="font-family:'Playfair Display',serif;font-size:32px;line-height:30px;margin:auto;color:#1E1B13;display:inline-block;font-family:HelveticaNeue-Medium;font-weight:700;letter-spacing:2px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${randomOTP}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Not expecting this email?</p>
                        <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Reply STOP to unsubscribe.</p>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:700;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center">Securely powered by Rent & Ride.</p>
                </body>

              </html>`;
    await sendMail(email, mailSubject, content);
    await prisma.user.update({ where: { email: email }, data: { updated_at: new Date().toLocaleDateString() }});
    const token = jwt.sign({ email, role: "user", name }, process.env.hiddenKey as string, { expiresIn: "1h" });
    res.json({ message: "User created successfully", token: token });
  }
});

router.post("/verify", async (req, res) => {
  const {email, oneTimePass} = req.body;
  const user = await prisma.user.findUnique({ where: { email: email }});
  if (user.otp === oneTimePass) {
    await prisma.user.update({where: {email: email}, data: {otp: null, is_verified: true}});
    res.json({ message: "User Verified"})
  } else {
    res.json({ message: "User does not exist"})
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email }});
  if (!user || user.is_verified === false) {
    res.json({ message: "User not verified or don't exist", token: null });
  } else {
    const passwordCheck: boolean = await new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password , async (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
    });
    if(passwordCheck === true) {
      const loginToken = jwt.sign({ email, role: "user" }, process.env.hiddenKey as string, { expiresIn: "24h" });
      await prisma.user.update({where: {email: email}, data: {last_login: new Date().toLocaleDateString()}});
      res.json({ message: "Logged in successfully", token: loginToken });
    } else {
      res.json({ message: "Incorrect Password", token: null });
    }
  }
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email: email }});
  if (user && user.is_verified === true) {
    const randomOTP = sendOTP();
    const otpUpdated = await prisma.user.update({where: {email: email}, data: {otp: randomOTP}});
    const token = jwt.sign({ email: email }, process.env.hiddenKey as string, {expiresIn: '1h'});
    const content =
        `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
              <html lang="en">

                <head>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&display=swap" rel="stylesheet">
                </head>

                <body style="background-color:#ffffff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
                  <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;width:360px;margin:0 auto;padding:68px 0 130px">
                    <tr style="width:100%">
                      <td><img src="https://i.ibb.co/6rCmn85/rentnridewhite.png" alt="Rent & Ride" width="full" height="60" style="display:block;object-fit:cover;outline:none;border:none;text-decoration:none;margin:0 auto" />
                        <p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#444;font-weight:600;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-align:center">Please Verify</p>
                        <h1 style="color:#1E1B13;display:inline-block;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Enter the following code to complete verification.</h1>
                        <table style="background:rgba(0,0,0,.05);border-radius:4px;margin:36px auto 36px;vertical-align:middle;width:full" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                          <tbody>
                            <tr>
                              <td>
                                <p style="font-family:'Playfair Display',serif;font-size:32px;line-height:30px;margin:auto;color:#1E1B13;display:inline-block;font-family:HelveticaNeue-Medium;font-weight:700;letter-spacing:2px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">${randomOTP}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Not expecting this email?</p>
                        <p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Reply STOP to unsubscribe.</p>
                      </td>
                    </tr>
                  </table>
                  <p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:700;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center">Securely powered by Rent & Ride.</p>
                </body>

              </html>`;
    sendMail(email, "Forgot Password?", content);
    if (otpUpdated) {
      res.json({ message: "Verified", token: token})
    } else {
      res.json({ message: "Error", token: null})
    }
  } else {
    res.status(402).json({ message: "User not verified or registered", token: null });
  }
});

router.post("/resetPassword", async (req, res) => {
  const { password, email } = req.body;
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 7, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
  const updatedUser = await prisma.user.update({where: {email: email}, data: {password: hashedPassword}});
  if (updatedUser) {
    await prisma.user.update({where: {email: email}, data: {updated_at: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric"})}});
    return { message: "Password updated succesfully" };
  } else {
    return { message: "Could not update password" };
  }
});


router.get("/inventory", authentication, async (req, res) => {
  const models = await prisma.model.findMany({where: { published: true }});
  res.json({ models });
});


router.get("/cars/brands/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const car = await prisma.cars.findMany({where: { id: id }});
  try {
    res.json({ car });
  } catch (error: any) {
    res.json({ error });
  }
});

router.get("/car/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const model = await prisma.model.findUnique({where: { id: id }});
  try {
    res.json({ model });
  } catch (error: any) {
    res.json({ error });
  }
});

router.post("/rent-car/:id", authentication, async (req: RequestWithUser, res) => {
  const { startDate, endDate, status } = req.body;
  const id = parseInt(req.params.id);
  const car = await prisma.model.findUnique({where: {id: id}});
  if (car) {
    const user = await prisma.user.findUnique({where: {email: req.user.email}});
    if (user) {
      const carID = car.id;
      const userID = user.id;
      const rentedCar = await prisma.rentedCar.create({data: {carId: carID,rentedtoId: userID,startDate: startDate,endDate: endDate,status: status}});
      const rentedCarID = rentedCar.id;
      const token = jwt.sign({ id: rentedCarID },process.env.hiddenKey as string,{expiresIn: "24h"});
      res.json({ message: "Car Rented successfully", token });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

router.put("/statusCheck/:id", authentication, async (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;
  const targetCar = await prisma.rentedCar.findUnique({
    where: { id: id },
  });
  if (targetCar) {
    const carId = targetCar.id;
    await prisma.rentedCar.update({
      where: { id: carId },
      data: {
        status: status,
      },
    });
    res.json({ message: "Car checked successfully" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

// GET RENTED CARS
router.get("/rentedCars", authentication, async (req: RequestWithUser, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
    include: {
      onRent: {
        where: {
          status: true,
        },
      },
    },
  });
  if (user) {
    res.json({ rentedCars: user.onRent });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

//PUT IT IN WISHLIST

router.post("/wishlist/:id", authentication, async (req: RequestWithUser, res) => {
  const id = parseInt(req.params.id);
  const car = await prisma.model.findUnique({ where: { id: id } });
  console.log(car);
  if (car) {
    const user = await prisma.user.findUnique({
      where: {
        email: req.user.email,
      },
    });
    if (user) {
      const userID = user.id;
      const carID = car.id;
      await prisma.wishlistedCar.create({
        data: {
          wishlistedbyId: userID,
          carId: carID,
        },
      });
      //await user.save();
      res.json({ message: "Ride is in your wishlist" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});

//GET WISHLISTED CARS

router.get("/wishlistedCar", authentication, async (req: RequestWithUser, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
    include: {
      onWishlist: true,
    },
  });
  if (user) {
    res.json({ wishlistedCar: user.onWishlist || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

//REMOVE IT FROM WISHLIST

router.delete("/wishlistedCar/:id", authentication, async (req: RequestWithUser, res) => {
  const wishCar = await prisma.wishlistedCar.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  console.log(wishCar);
  if (wishCar) {
    const user = await prisma.user.findUnique({
      where: { email: req.user.email },
      include: {
        onWishlist: true,
      },
    });
    if (user) {
      const wishCarId = wishCar.id;
      await prisma.wishlistedCar.delete({
        where: {
          id: wishCarId,
        },
      });
      res.json({
        message: "Car removed from wishlist",
      });
    } else {
      res.status(403).json({ message: "User Not found" });
    }
  } else {
    res.status(404).json({ message: "Car Not Found" });
  }
});

export default router;
