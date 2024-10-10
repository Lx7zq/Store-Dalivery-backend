//user model
import Store from "../models/store.model";

const { where } = require("sequelize");


checkStoreAdmin = async (req,res,next) =>{
    await User.findOne({
        where:{
            id:req.body.id
        }
    }).then((user)=>{
        if(!user){
            res.status(400).send({message: "Failed! user not found"})
        return;
        }
        Store.findOne({
            where:{
                adminId: user.id
            }
        }).then((store)=>{
            if(! store){
                 res.status(400).send({ message: "Access Denied!, Only Store's admin is allowed" });
                 return;
            }
            next();
        })
    })
}

const verifyStoreAdmin = {
    checkStoreAdmin
}

module.exports = verifyStoreAdmin