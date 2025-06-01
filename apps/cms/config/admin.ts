export default {
  auth: {
    secret: process.env.ADMIN_JWT_SECRET || 'example-token',
  },
  apiToken: {
    salt: process.env.API_TOKEN_SALT || 'example-salt',
  },
  transfer: {
    token: {
      salt: process.env.TRANSFER_TOKEN_SALT || 'example-transfer-salt',
    },
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
};