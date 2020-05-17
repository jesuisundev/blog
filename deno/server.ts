import { serve } from "https://deno.land/std/http/server.ts";

const server = serve({ port: 8000 });
console.log(`http://localhost:8000/`);

for await (const req of server) {
  const body = await fetch('https://www.jesuisundev.com').then(response => response.text())
  
  req.respond({ body })
}
