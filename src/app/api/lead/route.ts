// Endpoint de lead removido pois a página não captura e-mail
export async function POST() {
  return new Response("Lead desativado", { status: 404 });
}


