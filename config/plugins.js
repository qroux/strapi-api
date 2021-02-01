module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: process.env.SENDGRID_API_KEY || env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "quentin.roux@hotmail.fr",
      defaultReplyTo: "quentin.roux@hotmail.fr",
    },
  },
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
    },
  },
});
