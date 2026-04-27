import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://oqydbazgfoomnicfuske.supabase.co',      
      'sb_publishable_ln-I8VNpub8trXDLJqJ_Mg_A6kFUtvn'         
    );
  }
}