import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase = createClient(
    'https://oqydbazgfoomnicfuske.supabase.co',
    'sb_publishable_ln-I8VNpub8trXDLJqJ_Mg_A6kFUtvn'
  );

  async getUserRole(userId: string) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(error);
      return null;
    }

    return data?.role;
  }
}