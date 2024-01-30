/**
 * internalServerError.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.internalServerError();
 *     // -or-
 *     return res.internalServerError(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'internalServerError'
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

module.exports = function internalServerError(optionalData) {

  // Get access to `req` and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 500;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.internalServerError()');
    return res.status(statusCodeToSet).json({status: statusCodeToSet});
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({status: statusCodeToSet, message: optionalData});
  }

};
