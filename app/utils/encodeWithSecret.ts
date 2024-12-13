import { _VARZ } from "../const/_varz";

let jwt = require("jsonwebtoken");

const encodeWithSecret = (payload: { [key: string]: any }) => {
  let token = jwt.sign(payload, _VARZ.nextAuthKey);
  return token;
};

export default encodeWithSecret;
