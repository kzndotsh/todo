import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL as string;

const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY as string);

export default supabase;
