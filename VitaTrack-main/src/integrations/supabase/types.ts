export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ambulance_locations: {
        Row: {
          ambulance_id: string
          heading: number | null
          id: string
          latitude: number
          longitude: number
          speed: number | null
          timestamp: string
        }
        Insert: {
          ambulance_id: string
          heading?: number | null
          id?: string
          latitude: number
          longitude: number
          speed?: number | null
          timestamp?: string
        }
        Update: {
          ambulance_id?: string
          heading?: number | null
          id?: string
          latitude?: number
          longitude?: number
          speed?: number | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "ambulance_locations_ambulance_id_fkey"
            columns: ["ambulance_id"]
            isOneToOne: false
            referencedRelation: "ambulances"
            referencedColumns: ["id"]
          },
        ]
      }
      ambulances: {
        Row: {
          created_at: string
          current_latitude: number | null
          current_longitude: number | null
          driver_id: string | null
          equipment_level: string | null
          hospital_id: string | null
          id: string
          is_active: boolean | null
          last_location_update: string | null
          status: Database["public"]["Enums"]["ambulance_status"] | null
          updated_at: string
          vehicle_number: string
        }
        Insert: {
          created_at?: string
          current_latitude?: number | null
          current_longitude?: number | null
          driver_id?: string | null
          equipment_level?: string | null
          hospital_id?: string | null
          id?: string
          is_active?: boolean | null
          last_location_update?: string | null
          status?: Database["public"]["Enums"]["ambulance_status"] | null
          updated_at?: string
          vehicle_number: string
        }
        Update: {
          created_at?: string
          current_latitude?: number | null
          current_longitude?: number | null
          driver_id?: string | null
          equipment_level?: string | null
          hospital_id?: string | null
          id?: string
          is_active?: boolean | null
          last_location_update?: string | null
          status?: Database["public"]["Enums"]["ambulance_status"] | null
          updated_at?: string
          vehicle_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "ambulances_driver_id_fkey"
            columns: ["driver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ambulances_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      digital_signboards: {
        Row: {
          created_at: string
          current_message: string | null
          id: string
          is_active: boolean | null
          last_updated: string | null
          latitude: number
          location_name: string
          longitude: number
        }
        Insert: {
          created_at?: string
          current_message?: string | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          latitude: number
          location_name: string
          longitude: number
        }
        Update: {
          created_at?: string
          current_message?: string | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          latitude?: number
          location_name?: string
          longitude?: number
        }
        Relationships: []
      }
      emergency_calls: {
        Row: {
          actual_arrival_time: string | null
          actual_pickup_time: string | null
          ambulance_id: string | null
          caller_name: string
          caller_phone: string
          created_at: string
          destination_hospital_id: string | null
          dispatcher_id: string | null
          estimated_arrival_time: string | null
          estimated_pickup_time: string | null
          family_contact_id: string | null
          id: string
          is_active: boolean | null
          patient_condition: string | null
          patient_name: string | null
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          priority: Database["public"]["Enums"]["emergency_priority"] | null
          special_instructions: string | null
          updated_at: string
        }
        Insert: {
          actual_arrival_time?: string | null
          actual_pickup_time?: string | null
          ambulance_id?: string | null
          caller_name: string
          caller_phone: string
          created_at?: string
          destination_hospital_id?: string | null
          dispatcher_id?: string | null
          estimated_arrival_time?: string | null
          estimated_pickup_time?: string | null
          family_contact_id?: string | null
          id?: string
          is_active?: boolean | null
          patient_condition?: string | null
          patient_name?: string | null
          pickup_address: string
          pickup_latitude: number
          pickup_longitude: number
          priority?: Database["public"]["Enums"]["emergency_priority"] | null
          special_instructions?: string | null
          updated_at?: string
        }
        Update: {
          actual_arrival_time?: string | null
          actual_pickup_time?: string | null
          ambulance_id?: string | null
          caller_name?: string
          caller_phone?: string
          created_at?: string
          destination_hospital_id?: string | null
          dispatcher_id?: string | null
          estimated_arrival_time?: string | null
          estimated_pickup_time?: string | null
          family_contact_id?: string | null
          id?: string
          is_active?: boolean | null
          patient_condition?: string | null
          patient_name?: string | null
          pickup_address?: string
          pickup_latitude?: number
          pickup_longitude?: number
          priority?: Database["public"]["Enums"]["emergency_priority"] | null
          special_instructions?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_calls_ambulance_id_fkey"
            columns: ["ambulance_id"]
            isOneToOne: false
            referencedRelation: "ambulances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_calls_destination_hospital_id_fkey"
            columns: ["destination_hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_calls_dispatcher_id_fkey"
            columns: ["dispatcher_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emergency_calls_family_contact_id_fkey"
            columns: ["family_contact_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string
          available_beds: number | null
          capacity: number | null
          created_at: string
          emergency_contact: string | null
          id: string
          latitude: number
          longitude: number
          name: string
          phone: string
          updated_at: string
        }
        Insert: {
          address: string
          available_beds?: number | null
          capacity?: number | null
          created_at?: string
          emergency_contact?: string | null
          id?: string
          latitude: number
          longitude: number
          name: string
          phone: string
          updated_at?: string
        }
        Update: {
          address?: string
          available_beds?: number | null
          capacity?: number | null
          created_at?: string
          emergency_contact?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          phone?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          ambulance_id: string | null
          created_at: string
          emergency_call_id: string | null
          id: string
          is_read: boolean | null
          message: string
          recipient_id: string
          title: string
          type: string
        }
        Insert: {
          ambulance_id?: string | null
          created_at?: string
          emergency_call_id?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          recipient_id: string
          title: string
          type: string
        }
        Update: {
          ambulance_id?: string | null
          created_at?: string
          emergency_call_id?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          recipient_id?: string
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_ambulance_id_fkey"
            columns: ["ambulance_id"]
            isOneToOne: false
            referencedRelation: "ambulances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_emergency_call_id_fkey"
            columns: ["emergency_call_id"]
            isOneToOne: false
            referencedRelation: "emergency_calls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string
          hospital_id: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          hospital_id?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          hospital_id?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ambulance_status:
        | "available"
        | "dispatched"
        | "en_route"
        | "at_scene"
        | "transporting"
        | "at_hospital"
        | "offline"
      emergency_priority: "low" | "medium" | "high" | "critical"
      user_role: "admin" | "dispatcher" | "driver" | "family" | "hospital"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ambulance_status: [
        "available",
        "dispatched",
        "en_route",
        "at_scene",
        "transporting",
        "at_hospital",
        "offline",
      ],
      emergency_priority: ["low", "medium", "high", "critical"],
      user_role: ["admin", "dispatcher", "driver", "family", "hospital"],
    },
  },
} as const
