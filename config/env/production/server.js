module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: process.env.PORT,
  url: "https://remontada-api.herokuapp.com",
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "9ea8ffb06e4c05c279bfd70d88eaaea1"),
    },
  },
});
