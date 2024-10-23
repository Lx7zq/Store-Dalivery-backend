const { User, Store } = require("../models");

const checkStoreAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; // รับ userId จาก token
        console.log("User ID from token:", userId);

        const store = await Store.findOne({ where: { id: req.params.id } }); // ค้นหาร้านตาม ID ที่ส่งเข้ามา
        console.log("Store admin ID:", store.adminId); // ตรวจสอบ adminId ของร้าน

        if (!store || store.adminId !== userId) {
            return res.status(403).send({
                message: "Access Denied! Only the store's admin is allowed.",
            });
        }

        // ถ้าทุกอย่างถูกต้อง ไป middleware ถัดไป
        next();
    } catch (error) {
        console.error("Error checking store admin:", error);
        res.status(500).send({ message: "Internal server error." });
    }
};



module.exports = checkStoreAdmin;
