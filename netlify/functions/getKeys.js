// export async function handler() {
//   const {
//     EMAILJS_SERVICE_ID,
//     EMAILJS_TEMPLATE_ID,
//     EMAILJS_PUBLIC_KEY,
//     RECAPTCHA_SITE_KEY,
//   } = process.env;

//   return {
//     statusCode: 200,
//     body: JSON.stringify({
//       emailJsServiceId: EMAILJS_SERVICE_ID,
//       emailJsTemplateId: EMAILJS_TEMPLATE_ID,
//       emailJsPublicKey: EMAILJS_PUBLIC_KEY,
//       recaptchaSiteKey: RECAPTCHA_SITE_KEY,
//     }),
//   };
// }

exports.handler = async function(event, context) {
  const {
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY,
    RECAPTCHA_SITE_KEY,
  } = process.env;

  return {
    statusCode: 200,
    body: JSON.stringify({
      emailJsServiceId: EMAILJS_SERVICE_ID,
      emailJsTemplateId: EMAILJS_TEMPLATE_ID,
      emailJsPublicKey: EMAILJS_PUBLIC_KEY,
      recaptchaSiteKey: RECAPTCHA_SITE_KEY,
    }),
  };
};
