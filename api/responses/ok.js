/**
 * ok.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.ok();
 *     // -or-
 *     return res.ok(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'ok'
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

module.exports = function ok(optionalData) {

  // Get access to `req` and `res`
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 200;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    sails.log.info('Ran custom response: res.ok()');
    return res.status(statusCodeToSet).json({status: statusCodeToSet});
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({status: statusCodeToSet, message: optionalData});
  }

};
