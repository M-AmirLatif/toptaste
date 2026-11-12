import https from "https";

https.get("https://toptasteshawarma.vercel.app/", (res) => {
  let html = "";
  res.on("data", (c) => (html += c));
  res.on("end", () => {
    const lines = html.split("\n");
    for (const l of lines) {
      if (l.includes("og:image") || l.includes("twitter:image")) {
        console.log(l.trim());
      }
    }
  });
});
