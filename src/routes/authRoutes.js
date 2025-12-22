const { router, baseRouter } = require("./baseRouter");
const authController = require("../controllers/authController");
const { ROLE_ENUM, METHOD_ENUM } = require("../utils/enumSystem");
const { loginRateLimiter, refreshLimiter } = require("../middleware");

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
baseRouter(METHOD_ENUM.POST, "/login", authController.login, { rateLimiter: loginRateLimiter });

/**
 * @swagger
 * /api/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
baseRouter(METHOD_ENUM.POST, "/refresh", authController.refreshToken, { rateLimiter: refreshLimiter });

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Admin only
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin access granted
 */
baseRouter(METHOD_ENUM.GET, "/admin", authController.adminOnly, { role: ROLE_ENUM.ADMIN });

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: User only
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User access granted
 */
baseRouter(METHOD_ENUM.GET, "/user", authController.userOnly, { role: ROLE_ENUM.USER });

module.exports = router;
