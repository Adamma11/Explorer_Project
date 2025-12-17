const mongoose = require("mongoose")
const User = require("../../models/administration/user.model")
const UserPassword = require("../../models/administration/user_password.model")
const generateToken = require('../../shared/generate_token');
const UserRole = require("../../models/administration/user_role.model")
const ScreenAccess = require('../../models/administration/screen_access.model');

exports.validate = (req, res) => {
    let validateTheUser = function () {
        return new Promise(function (resolve, reject) {
            User.findOne({ userId: req.body.userId })
                .then(user => {
                    if (user != null) {
                        resolve(user._id)
                    } else {
                        reject(null);
                    }
                })
                .catch(err => {
                    reject(null)
                })
        })
    }

    let comparePasswords = function (user_id) {
        return new Promise(function (resolve, reject) {
            user_id = mongoose.Types.ObjectId(user_id)
            UserPassword.findOne({ user: user_id })
                .then(userPassword => {
                    if (userPassword) {
                        userPassword.comparePassword(req.body.password, function (err, isMatch) {
                            if (err) {
                                reject(false);
                            }
                            if (isMatch) {
                                //                            
                                resolve(true)
                            } else {
                                reject(false)
                            }
                        })
                    } else {
                        reject(false)
                    }
                })
                .catch(err => {
                    reject(false);
                })
        })

    }
    let getUserRoles = function (user_id) {
        return new Promise(function (resolve, reject) {
            UserRole
                .find({ user: user_id })
                .then(data => {
                    let roles = new Array();
                    data.forEach(item => {
                        roles.push(item.role);
                    })
                    resolve(roles);
                })
                .catch(err => {
                    reject(null);
                })
        })
    }
    let getScreensForRoles = function (roles) {
        return new Promise(function (resolve, reject) {
            let roleObjectArray = new Array();
            roles.forEach(item => {
                let roleObj = ({
                    role: item
                })
                roleObjectArray.push(roleObj);
            })
            ScreenAccess
                .find({ $or: roleObjectArray })
                .populate({ path: 'screen' })
                .then(data => {
                    let screens = ''
                    data.forEach(item => {
                        let requiredScreen = ({
                            screen_id: item.screen._id,
                            name: item.screen.name,
                            code: item.screen.code
                        })
                        screens = screens + item.screen.code + ','
                    })
                    console.log("screens being sent back is ", screens);
                    resolve(screens)
                })
                .catch(err => {
                    reject(null);
                })
        })
    }


    validateAndSendTheRequiredData();
    async function validateAndSendTheRequiredData() {
        try {
            let user_id = await validateTheUser();
            if (user_id == null) {
                console.log("User Id is null");
                res.status(401).json({ message: "Invalid User" })
            } else {
                let success = await comparePasswords(user_id);
                console.log("Success is ", success)
                if (success != true) {
                    res.status(401).json({ success: success })
                } else {

                    const accessToken = generateToken({ user_id: user_id }, "ACCESS")
                    console.log("Access token not null ", accessToken)
                    let userRoles = await getUserRoles(user_id);
                    let screensForRoles = await getScreensForRoles(userRoles);
                    console.log("Screens for  roles", screensForRoles);
                    res.status(200).json({ accessToken: accessToken, roles: userRoles, screens: screensForRoles })
                }
            }
        } catch (err) {
            console.log(err)
            console.log(err)

            res.status(401).json({ message: "Invaid User / Password" })
        }
    }
}
