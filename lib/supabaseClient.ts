import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://xeoqsvidfwsudiwiliev.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlb3FzdmlkZndzdWRpd2lsaWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyMTkzODIsImV4cCI6MjA1NDc5NTM4Mn0.UWLVcHtVoQJ50AdtAa2eeGfSE-Avf47Z5VKXeesr_5w";

export const supabase = createClient(supabaseUrl, supabaseKey);
