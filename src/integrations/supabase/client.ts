// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://advdscbceidieoqydzqs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkdmRzY2JjZWlkaWVvcXlkenFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjE3ODUsImV4cCI6MjA1NzE5Nzc4NX0.xZBTxwGrVT8sBQk4GFugjXAYklo1oHeRBDareQ9zcKU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);