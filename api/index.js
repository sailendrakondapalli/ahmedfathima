export default function handler(req, res) {
  const ua = req.headers['user-agent'] || '';
  const isCrawler =
    ua.includes('facebookexternalhit') ||
    ua.includes('WhatsApp') ||
    ua.includes('Twitterbot') ||
    ua.includes('TelegramBot') ||
    ua.includes('LinkedInBot') ||
    ua.includes('Slackbot');

  if (isCrawler) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Nikkah Invitation – Dr. Imthiyaz Ahmed &amp; Dr. Rasool Fathima</title>
  <meta name="description" content="You are cordially invited to the Nikkah on 2nd July 2026 at Shiraz Hall, Chennai." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ahmedfathima.vercel.app/" />
  <meta property="og:title" content="Nikkah Invitation – Dr. Imthiyaz Ahmed &amp; Dr. Rasool Fathima" />
  <meta property="og:description" content="You are cordially invited to the Nikkah on 2nd July 2026 at Shiraz Hall, Chennai. Join us for this blessed occasion." />
  <meta property="og:image" content="https://ahmedfathima.vercel.app/holdinghands.jpeg" />
  <meta property="og:image:secure_url" content="https://ahmedfathima.vercel.app/holdinghands.jpeg" />
  <meta property="og:image:type" content="image/jpeg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Nikkah Invitation" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://ahmedfathima.vercel.app/holdinghands.jpeg" />
</head>
<body></body>
</html>`);
  } else {
    res.redirect(302, '/');
  }
}
