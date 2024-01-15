const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

const createUser = async (request, response, next) => {
  try {
    const user = new User();
    user.name = request.body.name;
    user.password = request.body.password;
    // TO DO verificar si ya existe el usuario y si no existe, devolver un 400
    if (await User.findOne({name: request.body.name})) {
        return response.status(400).json({
            status: 400,
            message: HTTPSTATUSCODE[400],
            data: null,   
        })
    }


    const userDb = await user.save();
    return response.status(201).json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const authenticate = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ name: req.body.email });
    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          name: userInfo.name,
        },
        req.app.get("secretKey"),
        { expiresIn: "1d" }
      );

      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { user: userInfo, token: token },
      });
    } else {
      return res.json({ 
        status: 400, 
        message: HTTPSTATUSCODE[400], 
        data: null });
    }
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (error) {
    return next(error);
  }
};

const getUsers = async (request, response, next) => {
    try {
        const users = await User.find();
        response.status(200).json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: users
        });
 
    } catch (error) {
        next(error)
    }
}

module.exports = {
  createUser,
  authenticate,
  logout,
  getUsers
};
