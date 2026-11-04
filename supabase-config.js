
const SUPABASE_URL = "https://piqlpneuqohvgfrobylg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rvXPlWI6zAFHbvy2s6IAVA_TQb-d8Cr";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
