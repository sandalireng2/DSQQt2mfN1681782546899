// Cloudflare Pages middleware
// Indonesia: one fixed destination.
// Other countries: choose randomly from three destinations.
// HTTP response: 200; browser navigation is performed by JavaScript.

const INDONESIA_DESTINATION = "https://www.youtube.com";

const INTERNATIONAL_DESTINATIONS = [
  "https://meppmr4.love-romanceflirt.com/lpk2huu?s1=2589775IO&cid=M3s2ob6JPSzBtpzH45JYqBidsRvgid9BZovz8p4BV8EbCZ6tIJsbDCTykfWEnRaJT4WooFsoygKOOGcZCLBO5yiwH33Cff2M3YYkN",
  "https://meppmr4.emotionaltogetherness.org/lpk2huu?s1=2589775IO&cid=QvL1WQOI1Xt3Wdno1PsJoxD567ssQTCGzkui5BUIUO1HKqRbOykJJCM6vDmuVHbVr2ivzRY3AU4JZNIEod2cPEDSbVfI966rbQjFL",
];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function htmlResponse(destination) {
  // Restrict destination values to the configured HTTPS URLs.
  const safeDestination = JSON.stringify(destination);
  const html = `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting</title>
  <meta name="description" content="YouTube">
  <meta name="robots" content="noindex, nofollow">
  <script>
    window.location.replace(${safeDestination});
  </script>
</head>
<body>
  <p>Mengalihkan ke tujuan tautan…</p>
  <noscript><a href=${safeDestination}>Lanjutkan</a></noscript>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.pathname !== "/") {
    return context.next();
  }

  const country = context.request.cf?.country || "XX";
  const destination = country === "ID"
    ? INDONESIA_DESTINATION
    : pickRandom(INTERNATIONAL_DESTINATIONS);

  return htmlResponse(destination);
}
