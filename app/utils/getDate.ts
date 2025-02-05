import moment from "moment";

const getDate = (date: string, format: string = "YYYY-MM-DD") => {
  return moment(date).locale("fa").format(format);
};

export default getDate;
