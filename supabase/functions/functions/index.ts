import 'jsr:@supabase/functions-js/edge-runtime.d.ts';

Deno.serve(async () => {
  return new Response(JSON.stringify({ message: "Placeholder edge function to satisfy Supabase deployment requirements" }), {
    headers: { 'Content-Type': 'application/json' }
  });
});
