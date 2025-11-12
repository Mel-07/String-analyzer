import express from "express"
import {
  get_all_strings_with_filtering_controller,
  create_analyze_controller,
  get_specific_string_controller,
  natural_language_filtering_controller,
  delete_string_controller,
} from "../controller/index";
const router = express.Router();
// POST
router.post("/",create_analyze_controller);
// GET
router.get("/",get_all_strings_with_filtering_controller);
router.get("/filter-by-natural-language",natural_language_filtering_controller);
router.get("/:string_value",get_specific_string_controller);
// DELETE
router.delete("/:string_value",delete_string_controller);

export default router;