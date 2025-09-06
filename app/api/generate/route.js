// app/api/generate/route.ts

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // Call your n8n webhook
    const response = await fetch("https://my-n8n-cloud.duckdns.org/webhook/saas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to call n8n" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
