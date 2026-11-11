// Cloudflare Pages middleware
// Indonesia: one fixed destination.
// Other countries: choose randomly from three destinations.
// HTTP response: 200; browser navigation is performed by JavaScript.

const INDONESIA_DESTINATION = "https://www.youtube.com";

const INTERNATIONAL_DESTINATIONS = [
  "https://mail.adminforge.de/",
  "https://mailhole.de/",
  "https://mailhole.de/",
  "https://mail.cx/"
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
  <title> </title>
  <meta name="description" content="Mengalihkan Anda ke tujuan tautan.">
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
