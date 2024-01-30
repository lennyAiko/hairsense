/**
 * badRequest.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.badRequest();
 *     // -or-
 *     return res.badRequest(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'badRequest'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function badRequest(optionalData) {

  // Get access to `req` and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  // If no data was provided, use res.sendStatus() || res.status().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.badRequest()');
    return res.status(statusCodeToSet).json({status: statusCodeToSet});
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({status: statusCodeToSet, message: optionalData});
  }

};
