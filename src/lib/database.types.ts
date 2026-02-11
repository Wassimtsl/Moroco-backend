export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      role: {
        Row: {
          id: string
          libelle_role: string
          created_at: string
        }
        Insert: {
          id?: string
          libelle_role: string
          created_at?: string
        }
        Update: {
          id?: string
          libelle_role?: string
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          nom: string | null
          prenom: string | null
          num_tel: string | null
          role_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nom?: string | null
          prenom?: string | null
          num_tel?: string | null
          role_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nom?: string | null
          prenom?: string | null
          num_tel?: string | null
          role_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      adresse: {
        Row: {
          id: string
          adresse: string | null
          ville: string | null
          code_postal: string | null
          pays: string | null
          created_at: string
        }
        Insert: {
          id?: string
          adresse?: string | null
          ville?: string | null
          code_postal?: string | null
          pays?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          adresse?: string | null
          ville?: string | null
          code_postal?: string | null
          pays?: string | null
          created_at?: string
        }
      }
      tarif: {
        Row: {
          id: string
          prix: number
          promotion: number
          created_at: string
        }
        Insert: {
          id?: string
          prix?: number
          promotion?: number
          created_at?: string
        }
        Update: {
          id?: string
          prix?: number
          promotion?: number
          created_at?: string
        }
      }
      typeevenement: {
        Row: {
          id: string
          libelle_type: string
          created_at: string
        }
        Insert: {
          id?: string
          libelle_type: string
          created_at?: string
        }
        Update: {
          id?: string
          libelle_type?: string
          created_at?: string
        }
      }
      evenement: {
        Row: {
          id: string
          titre_event: string
          description: string | null
          image: string | null
          date_debut: string
          date_fin: string
          adresse_id: string | null
          guide_id: string | null
          tarif_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          titre_event: string
          description?: string | null
          image?: string | null
          date_debut: string
          date_fin: string
          adresse_id?: string | null
          guide_id?: string | null
          tarif_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          titre_event?: string
          description?: string | null
          image?: string | null
          date_debut?: string
          date_fin?: string
          adresse_id?: string | null
          guide_id?: string | null
          tarif_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reservation: {
        Row: {
          id: string
          evenement_id: string | null
          user_id: string | null
          nombre_personne: number
          statut: string
          date_reservation: string
          date_annulation: string | null
          created_at: string
        }
        Insert: {
          id?: string
          evenement_id?: string | null
          user_id?: string | null
          nombre_personne?: number
          statut?: string
          date_reservation?: string
          date_annulation?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          evenement_id?: string | null
          user_id?: string | null
          nombre_personne?: number
          statut?: string
          date_reservation?: string
          date_annulation?: string | null
          created_at?: string
        }
      }
    }
  }
}
