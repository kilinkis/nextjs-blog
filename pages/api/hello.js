/**
 * @param req is an instance of http.IncomingMessage, plus some pre-built middlewares you can see here.
 * @param res is an instance of http.ServerResponse, plus some helper functions you can see here.
 */

export default (req, res) => {
  res.status(200).json({ text: 'Hello' })
}