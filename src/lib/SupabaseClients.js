import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://akajsevbqgpmlfudvduo.supabase.co";
const supabaseAnonKey = "sb_publishable_5jE8rXDEG2OyBtMhUIHKyQ_0Ei3llFn";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
