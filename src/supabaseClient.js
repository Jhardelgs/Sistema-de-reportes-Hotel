import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://atufzgkywelbxntkmlqw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dWZ6Z2t5d2VsYnhudGttbHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNjEzMjQsImV4cCI6MjA2MzYzNzMyNH0.ijTVTsYsxUJuc30nJsVqS8XLgSSDvrS4qeg63omhKtU';
export const supabase = createClient(supabaseUrl, supabaseKey);
