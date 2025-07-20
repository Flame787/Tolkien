// const fetch = require('node-fetch');

// exports.handler = async function(event) {
//   const { token } = JSON.parse(event.body);
//   const secret = process.env.RECAPTCHA_SECRET_KEY;

//     //   console.log("Token received:", token);
//     // console.log("Secret key:", secret);

//   const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
//     method: "POST",
//     headers: { "Content-Type": "application/x-www-form-urlencoded" },
//     body: `secret=${secret}&response=${token}`,
//   });

//   const data = await response.json();

//   if (data.success) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ verified: true }),
//     };
//   }

//   return {
//     statusCode: 403,
//     body: JSON.stringify({ verified: false, error: data["error-codes"] }),
//   };
// };

const fetch = require("node-fetch");

exports.handler = async function (event) {
  let token;
  try {
    const body = JSON.parse(event.body);
    token = body.token;
  } catch (err) {
    console.error("Failed to parse event.body:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid request body" }),
    };
  }

  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    console.error("Missing RECAPTCHA_SECRET_KEY");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing secret key" }),
    };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`,
      }
    );

    const data = await response.json();
    console.log("Google response:", data);

    if (data.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ verified: true }),
      };
    }

    return {
      statusCode: 403,
      body: JSON.stringify({ verified: false, error: data["error-codes"] }),
    };
  } catch (error) {
    console.error("Verification failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error during verification" }),
    };
  }
};
