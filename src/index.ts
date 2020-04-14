import dotenv from "dotenv";
import main from "./main";
import { suppressErrors } from "./common/utils";

suppressErrors();
dotenv.config();
main();
