import { _VARZ } from "../const/_varz";

var jwt = require("jsonwebtoken");

const decodeWithSecret = (token: string) => {
  return jwt.verify(
    token,
    _VARZ.nextAuthKey,
    function (err: any, decoded: any) {
      if (err) return null;
      return decoded;
    }
  );
};

export default decodeWithSecret;
