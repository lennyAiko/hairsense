/**
 * accepted.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.accepted();
 *     // -or-
 *     return res.accepted(data);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'accepted'
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

module.exports = function accepted(data) {
  // Get access to `req` and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 201;

  // If no data was provided, use res.sendStatus().
  if (data === undefined) {
    sails.log.info("Ran custom response: res.accepted()");
    return res.status(statusCodeToSet).json({ status: statusCodeToSet });
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({ status: statusCodeToSet, data });
  }
};
