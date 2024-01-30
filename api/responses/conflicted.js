/**
 * conflicted.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.conflicted();
 *     // -or-
 *     return res.conflicted(data);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'conflicted'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: data }
 * ```
 */

module.exports = function conflicted(data) {
  // Get access to `req` and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 409;

  // If no data was provided, use res.sendStatus().
  if (data === undefined) {
    sails.log.info("Ran custom response: res.conflicted()");
    return res.status(statusCodeToSet).json({ status: statusCodeToSet });
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({ status: statusCodeToSet, data });
  }
};
