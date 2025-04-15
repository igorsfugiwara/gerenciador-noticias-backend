const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticiaController");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.delete("/:id", controller.delete);
router.delete("/", controller.deleteAll);
router.put("/:id", controller.editNews);

module.exports = router;
