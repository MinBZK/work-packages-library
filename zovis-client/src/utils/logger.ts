/* type: string. e.g. `[ERROR] ` */
const doLogging = (type: string, ...items) => {
  console.log(type, ...items);
};

export const logger = {
  error: (...items) => {
    doLogging("[ERROR] ", ...items);
  },
  info: (...items) => {
    doLogging("[INFO] ", ...items);
  },
  debug: (...items) => {
    doLogging("[DEBUG] ", ...items);
  },
};
