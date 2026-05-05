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
  // 🔥 Get all cars (for showroom)
async getCars() {
  const { data, error } = await this.supabase
    .from('cars')
    .select('*');

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// 🔥 Get single car by ID (for car details page)
async getCarById(id: number) {
  const { data, error } = await this.supabase
    .from('cars')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

// 🔥 Build model URL from storage path
getModelUrl(path: string) {
  return `https://oqydbazgfoomnicfuske.supabase.co/storage/v1/object/public/abc/${path}`;
}
}