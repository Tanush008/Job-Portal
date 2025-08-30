import DataUriParser from "datauri/parser.js";
import path from "path";
const getDatauri = (file) => {
  if (!file || !file.originalname || !file.buffer) {
    throw new Error(
      "Invalid file object. Ensure the file is uploaded correctly."
    );
  }
  const parser = new DataUriParser();
  // console.log("byee");
  // console.log(file.orginalname + "hello");
  const extName = path.extname(file.originalname).toString();
  // console.log("fdfaadfa");
  // console.log(file.originalname);
  return parser.format(extName, file.buffer);
};
export default getDatauri;
