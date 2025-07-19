import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wxxxedyscyrsuwwobgqs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4eHhlZHlzY3lyc3V3d29iZ3FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0NTk0NzUsImV4cCI6MjA2MjAzNTQ3NX0.n7fQ7DeBnWijayKfrvq6ZoRxyJR2EJmCPd9r5VLjvwU";
export const supabase = createClient(supabaseUrl, supabaseKey);
