// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      ai_config: {
        Row: {
          created_by: string | null
          id: string
          is_active: boolean | null
          provider: string
          updated_at: string | null
        }
        Insert: {
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string
          updated_at?: string | null
        }
        Update: {
          created_by?: string | null
          id?: string
          is_active?: boolean | null
          provider?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_config_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_evaluations: {
        Row: {
          error_message: string | null
          evaluated_at: string | null
          id: string
          is_qualified: boolean
          justification: string
          overall_score: number
          provider_used: string
          raw_response: string | null
          status: string
          submission_id: string
        }
        Insert: {
          error_message?: string | null
          evaluated_at?: string | null
          id?: string
          is_qualified: boolean
          justification: string
          overall_score: number
          provider_used: string
          raw_response?: string | null
          status?: string
          submission_id: string
        }
        Update: {
          error_message?: string | null
          evaluated_at?: string | null
          id?: string
          is_qualified?: boolean
          justification?: string
          overall_score?: number
          provider_used?: string
          raw_response?: string | null
          status?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_evaluations_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      application_forms: {
        Row: {
          brand_color: string | null
          cover_image_url: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          slug: string
          success_message: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          brand_color?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          slug: string
          success_message?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          brand_color?: string | null
          cover_image_url?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          slug?: string
          success_message?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_forms_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      eliter_program_assignments: {
        Row: {
          assigned_at: string | null
          completed_at: string | null
          eliter_id: string
          id: string
          program_id: string
        }
        Insert: {
          assigned_at?: string | null
          completed_at?: string | null
          eliter_id: string
          id?: string
          program_id: string
        }
        Update: {
          assigned_at?: string | null
          completed_at?: string | null
          eliter_id?: string
          id?: string
          program_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "eliter_program_assignments_eliter_id_fkey"
            columns: ["eliter_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_program_assignments_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "onboarding_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      eliter_quiz_answers: {
        Row: {
          answer_text: string | null
          attempt_id: string
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string
          selected_option_id: string | null
        }
        Insert: {
          answer_text?: string | null
          attempt_id: string
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id: string
          selected_option_id?: string | null
        }
        Update: {
          answer_text?: string | null
          attempt_id?: string
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_option_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "eliter_quiz_answers_attempt_id_fkey"
            columns: ["attempt_id"]
            isOneToOne: false
            referencedRelation: "eliter_quiz_attempts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_quiz_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_quiz_answers_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "question_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_quiz_answers_selected_option_id_fkey"
            columns: ["selected_option_id"]
            isOneToOne: false
            referencedRelation: "quiz_options_public"
            referencedColumns: ["id"]
          },
        ]
      }
      eliter_quiz_attempts: {
        Row: {
          assignment_id: string
          attempt_number: number
          completed_at: string | null
          correct_answers: number
          id: string
          needs_review: boolean
          passed: boolean
          percentage: number
          quiz_id: string
          total_questions: number
        }
        Insert: {
          assignment_id: string
          attempt_number: number
          completed_at?: string | null
          correct_answers: number
          id?: string
          needs_review?: boolean
          passed: boolean
          percentage: number
          quiz_id: string
          total_questions: number
        }
        Update: {
          assignment_id?: string
          attempt_number?: number
          completed_at?: string | null
          correct_answers?: number
          id?: string
          needs_review?: boolean
          passed?: boolean
          percentage?: number
          quiz_id?: string
          total_questions?: number
        }
        Relationships: [
          {
            foreignKeyName: "eliter_quiz_attempts_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "eliter_program_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_quiz_attempts_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "step_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      eliter_step_progress: {
        Row: {
          assignment_id: string
          completed_at: string | null
          id: string
          status: string
          step_id: string
        }
        Insert: {
          assignment_id: string
          completed_at?: string | null
          id?: string
          status?: string
          step_id: string
        }
        Update: {
          assignment_id?: string
          completed_at?: string | null
          id?: string
          status?: string
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "eliter_step_progress_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "eliter_program_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_step_progress_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "onboarding_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      eliter_task_progress: {
        Row: {
          assignment_id: string
          completed_at: string | null
          id: string
          is_completed: boolean | null
          task_id: string
        }
        Insert: {
          assignment_id: string
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          task_id: string
        }
        Update: {
          assignment_id?: string
          completed_at?: string | null
          id?: string
          is_completed?: boolean | null
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "eliter_task_progress_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "eliter_program_assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "eliter_task_progress_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "step_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      form_answers: {
        Row: {
          answer_text: string | null
          created_at: string | null
          id: string
          question_id: string
          selected_option_ids: string | null
          submission_id: string
        }
        Insert: {
          answer_text?: string | null
          created_at?: string | null
          id?: string
          question_id: string
          selected_option_ids?: string | null
          submission_id: string
        }
        Update: {
          answer_text?: string | null
          created_at?: string | null
          id?: string
          question_id?: string
          selected_option_ids?: string | null
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "form_questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_answers_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      form_question_options: {
        Row: {
          created_at: string | null
          id: string
          option_text: string
          position: number
          question_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          option_text: string
          position?: number
          question_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          option_text?: string
          position?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "form_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      form_questions: {
        Row: {
          created_at: string | null
          id: string
          is_required: boolean | null
          placeholder_text: string | null
          position: number
          question_text: string
          question_type: string
          step_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          placeholder_text?: string | null
          position?: number
          question_text: string
          question_type: string
          step_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_required?: boolean | null
          placeholder_text?: string | null
          position?: number
          question_text?: string
          question_type?: string
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_questions_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "form_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      form_steps: {
        Row: {
          created_at: string | null
          description: string | null
          form_id: string
          id: string
          position: number
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          form_id: string
          id?: string
          position?: number
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          form_id?: string
          id?: string
          position?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "form_steps_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "application_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          candidate_email: string
          candidate_name: string
          candidate_phone: string | null
          candidate_photo_url: string | null
          form_id: string
          id: string
          notes: string | null
          status: string
          submitted_at: string | null
        }
        Insert: {
          candidate_email: string
          candidate_name: string
          candidate_phone?: string | null
          candidate_photo_url?: string | null
          form_id: string
          id?: string
          notes?: string | null
          status?: string
          submitted_at?: string | null
        }
        Update: {
          candidate_email?: string
          candidate_name?: string
          candidate_phone?: string | null
          candidate_photo_url?: string | null
          form_id?: string
          id?: string
          notes?: string | null
          status?: string
          submitted_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "application_forms"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_programs: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_programs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      onboarding_steps: {
        Row: {
          created_at: string | null
          description_text: string | null
          external_links: string | null
          id: string
          image_url: string | null
          position: number
          program_id: string
          title: string | null
          updated_at: string | null
          video_youtube_url: string | null
        }
        Insert: {
          created_at?: string | null
          description_text?: string | null
          external_links?: string | null
          id?: string
          image_url?: string | null
          position?: number
          program_id: string
          title?: string | null
          updated_at?: string | null
          video_youtube_url?: string | null
        }
        Update: {
          created_at?: string | null
          description_text?: string | null
          external_links?: string | null
          id?: string
          image_url?: string | null
          position?: number
          program_id?: string
          title?: string | null
          updated_at?: string | null
          video_youtube_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "onboarding_steps_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "onboarding_programs"
            referencedColumns: ["id"]
          },
        ]
      }
      open_ended_reviews: {
        Row: {
          answer_id: string
          created_at: string | null
          feedback: string | null
          id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
        }
        Insert: {
          answer_id: string
          created_at?: string | null
          feedback?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Update: {
          answer_id?: string
          created_at?: string | null
          feedback?: string | null
          id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "open_ended_reviews_answer_id_fkey"
            columns: ["answer_id"]
            isOneToOne: true
            referencedRelation: "eliter_quiz_answers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "open_ended_reviews_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pipeline_candidates: {
        Row: {
          created_at: string | null
          evaluation_id: string
          id: string
          moved_at: string | null
          notes: string | null
          position: number
          stage: string
          submission_id: string
        }
        Insert: {
          created_at?: string | null
          evaluation_id: string
          id?: string
          moved_at?: string | null
          notes?: string | null
          position?: number
          stage?: string
          submission_id: string
        }
        Update: {
          created_at?: string | null
          evaluation_id?: string
          id?: string
          moved_at?: string | null
          notes?: string | null
          position?: number
          stage?: string
          submission_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pipeline_candidates_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "ai_evaluations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pipeline_candidates_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: true
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      question_options: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean
          option_text: string
          position: number
          question_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct?: boolean
          option_text: string
          position?: number
          question_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean
          option_text?: string
          position?: number
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          created_at: string | null
          id: string
          position: number
          question_text: string
          question_type: string
          quiz_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          position?: number
          question_text: string
          question_type: string
          quiz_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          position?: number
          question_text?: string
          question_type?: string
          quiz_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "step_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      step_quizzes: {
        Row: {
          created_at: string | null
          id: string
          max_attempts: number
          passing_percentage: number
          step_id: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_attempts?: number
          passing_percentage?: number
          step_id: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          max_attempts?: number
          passing_percentage?: number
          step_id?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "step_quizzes_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: true
            referencedRelation: "onboarding_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      step_tasks: {
        Row: {
          created_at: string | null
          id: string
          label: string
          position: number
          step_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          label: string
          position?: number
          step_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          label?: string
          position?: number
          step_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "step_tasks_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "onboarding_steps"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      quiz_options_public: {
        Row: {
          id: string | null
          option_text: string | null
          position: number | null
          question_id: string | null
        }
        Insert: {
          id?: string | null
          option_text?: string | null
          position?: number | null
          question_id?: string | null
        }
        Update: {
          id?: string | null
          option_text?: string | null
          position?: number | null
          question_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "question_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      is_gestor_master: { Args: never; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const


// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: ai_config
//   id: uuid (not null, default: gen_random_uuid())
//   provider: text (not null, default: 'gemini'::text)
//   is_active: boolean (nullable, default: true)
//   created_by: uuid (nullable)
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: ai_evaluations
//   id: uuid (not null, default: gen_random_uuid())
//   submission_id: uuid (not null)
//   provider_used: text (not null)
//   overall_score: integer (not null)
//   justification: text (not null)
//   is_qualified: boolean (not null)
//   raw_response: text (nullable)
//   evaluated_at: timestamp with time zone (nullable, default: now())
//   error_message: text (nullable)
//   status: text (not null, default: 'pending'::text)
// Table: application_forms
//   id: uuid (not null, default: gen_random_uuid())
//   title: text (not null)
//   description: text (nullable)
//   slug: text (not null)
//   is_active: boolean (nullable, default: true)
//   cover_image_url: text (nullable)
//   brand_color: text (nullable, default: '243 75% 59%'::text)
//   success_message: text (nullable, default: 'Sua candidatura foi enviada com sucesso! Entraremos em contato em breve.'::text)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: eliter_program_assignments
//   id: uuid (not null, default: gen_random_uuid())
//   eliter_id: uuid (not null)
//   program_id: uuid (not null)
//   assigned_at: timestamp with time zone (nullable, default: now())
//   completed_at: timestamp with time zone (nullable)
// Table: eliter_quiz_answers
//   id: uuid (not null, default: gen_random_uuid())
//   attempt_id: uuid (not null)
//   question_id: uuid (not null)
//   selected_option_id: uuid (nullable)
//   is_correct: boolean (not null)
//   created_at: timestamp with time zone (nullable, default: now())
//   answer_text: text (nullable)
// Table: eliter_quiz_attempts
//   id: uuid (not null, default: gen_random_uuid())
//   assignment_id: uuid (not null)
//   quiz_id: uuid (not null)
//   attempt_number: integer (not null)
//   total_questions: integer (not null)
//   correct_answers: integer (not null)
//   percentage: integer (not null)
//   passed: boolean (not null)
//   completed_at: timestamp with time zone (nullable, default: now())
//   needs_review: boolean (not null, default: false)
// Table: eliter_step_progress
//   id: uuid (not null, default: gen_random_uuid())
//   assignment_id: uuid (not null)
//   step_id: uuid (not null)
//   status: text (not null, default: 'not_started'::text)
//   completed_at: timestamp with time zone (nullable)
// Table: eliter_task_progress
//   id: uuid (not null, default: gen_random_uuid())
//   assignment_id: uuid (not null)
//   task_id: uuid (not null)
//   is_completed: boolean (nullable, default: false)
//   completed_at: timestamp with time zone (nullable)
// Table: form_answers
//   id: uuid (not null, default: gen_random_uuid())
//   submission_id: uuid (not null)
//   question_id: uuid (not null)
//   answer_text: text (nullable)
//   selected_option_ids: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: form_question_options
//   id: uuid (not null, default: gen_random_uuid())
//   question_id: uuid (not null)
//   position: integer (not null, default: 0)
//   option_text: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: form_questions
//   id: uuid (not null, default: gen_random_uuid())
//   step_id: uuid (not null)
//   position: integer (not null, default: 0)
//   question_text: text (not null)
//   question_type: text (not null)
//   is_required: boolean (nullable, default: true)
//   placeholder_text: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: form_steps
//   id: uuid (not null, default: gen_random_uuid())
//   form_id: uuid (not null)
//   position: integer (not null, default: 0)
//   title: text (not null)
//   description: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: form_submissions
//   id: uuid (not null, default: gen_random_uuid())
//   form_id: uuid (not null)
//   candidate_name: text (not null)
//   candidate_email: text (not null)
//   candidate_phone: text (nullable)
//   status: text (not null, default: 'new'::text)
//   notes: text (nullable)
//   submitted_at: timestamp with time zone (nullable, default: now())
//   candidate_photo_url: text (nullable)
// Table: onboarding_programs
//   id: uuid (not null, default: gen_random_uuid())
//   title: text (not null)
//   description: text (nullable)
//   is_active: boolean (nullable, default: true)
//   created_by: uuid (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: onboarding_steps
//   id: uuid (not null, default: gen_random_uuid())
//   program_id: uuid (not null)
//   position: integer (not null, default: 0)
//   title: text (nullable)
//   description_text: text (nullable)
//   image_url: text (nullable)
//   video_youtube_url: text (nullable)
//   external_links: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: open_ended_reviews
//   id: uuid (not null, default: gen_random_uuid())
//   answer_id: uuid (not null)
//   reviewed_by: uuid (nullable)
//   status: text (not null, default: 'pending'::text)
//   feedback: text (nullable)
//   reviewed_at: timestamp with time zone (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: pipeline_candidates
//   id: uuid (not null, default: gen_random_uuid())
//   submission_id: uuid (not null)
//   evaluation_id: uuid (not null)
//   stage: text (not null, default: 'candidatos'::text)
//   position: integer (not null, default: 0)
//   notes: text (nullable)
//   moved_at: timestamp with time zone (nullable, default: now())
//   created_at: timestamp with time zone (nullable, default: now())
// Table: profiles
//   id: uuid (not null, default: gen_random_uuid())
//   user_id: uuid (not null)
//   full_name: text (not null)
//   email: text (not null)
//   role: text (not null)
//   avatar_url: text (nullable)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: question_options
//   id: uuid (not null, default: gen_random_uuid())
//   question_id: uuid (not null)
//   position: integer (not null, default: 0)
//   option_text: text (not null)
//   is_correct: boolean (not null, default: false)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: quiz_options_public
//   id: uuid (nullable)
//   question_id: uuid (nullable)
//   position: integer (nullable)
//   option_text: text (nullable)
// Table: quiz_questions
//   id: uuid (not null, default: gen_random_uuid())
//   quiz_id: uuid (not null)
//   position: integer (not null, default: 0)
//   question_text: text (not null)
//   question_type: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())
// Table: step_quizzes
//   id: uuid (not null, default: gen_random_uuid())
//   step_id: uuid (not null)
//   title: text (nullable, default: 'Prova'::text)
//   passing_percentage: integer (not null, default: 80)
//   max_attempts: integer (not null, default: 3)
//   created_at: timestamp with time zone (nullable, default: now())
//   updated_at: timestamp with time zone (nullable, default: now())
// Table: step_tasks
//   id: uuid (not null, default: gen_random_uuid())
//   step_id: uuid (not null)
//   position: integer (not null, default: 0)
//   label: text (not null)
//   created_at: timestamp with time zone (nullable, default: now())

// --- CONSTRAINTS ---
// Table: ai_config
//   FOREIGN KEY ai_config_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY ai_config_pkey: PRIMARY KEY (id)
//   CHECK ai_config_provider_check: CHECK ((provider = ANY (ARRAY['gemini'::text, 'openai'::text])))
// Table: ai_evaluations
//   PRIMARY KEY ai_evaluations_pkey: PRIMARY KEY (id)
//   CHECK ai_evaluations_status_check: CHECK ((status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'error'::text])))
//   FOREIGN KEY ai_evaluations_submission_id_fkey: FOREIGN KEY (submission_id) REFERENCES form_submissions(id) ON DELETE CASCADE
//   UNIQUE ai_evaluations_submission_id_key: UNIQUE (submission_id)
// Table: application_forms
//   FOREIGN KEY application_forms_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY application_forms_pkey: PRIMARY KEY (id)
//   UNIQUE application_forms_slug_key: UNIQUE (slug)
// Table: eliter_program_assignments
//   FOREIGN KEY eliter_program_assignments_eliter_id_fkey: FOREIGN KEY (eliter_id) REFERENCES profiles(id) ON DELETE CASCADE
//   UNIQUE eliter_program_assignments_eliter_id_program_id_key: UNIQUE (eliter_id, program_id)
//   PRIMARY KEY eliter_program_assignments_pkey: PRIMARY KEY (id)
//   FOREIGN KEY eliter_program_assignments_program_id_fkey: FOREIGN KEY (program_id) REFERENCES onboarding_programs(id) ON DELETE CASCADE
// Table: eliter_quiz_answers
//   FOREIGN KEY eliter_quiz_answers_attempt_id_fkey: FOREIGN KEY (attempt_id) REFERENCES eliter_quiz_attempts(id) ON DELETE CASCADE
//   PRIMARY KEY eliter_quiz_answers_pkey: PRIMARY KEY (id)
//   FOREIGN KEY eliter_quiz_answers_question_id_fkey: FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
//   FOREIGN KEY eliter_quiz_answers_selected_option_id_fkey: FOREIGN KEY (selected_option_id) REFERENCES question_options(id) ON DELETE SET NULL
// Table: eliter_quiz_attempts
//   FOREIGN KEY eliter_quiz_attempts_assignment_id_fkey: FOREIGN KEY (assignment_id) REFERENCES eliter_program_assignments(id) ON DELETE CASCADE
//   UNIQUE eliter_quiz_attempts_assignment_id_quiz_id_attempt_number_key: UNIQUE (assignment_id, quiz_id, attempt_number)
//   PRIMARY KEY eliter_quiz_attempts_pkey: PRIMARY KEY (id)
//   FOREIGN KEY eliter_quiz_attempts_quiz_id_fkey: FOREIGN KEY (quiz_id) REFERENCES step_quizzes(id) ON DELETE CASCADE
// Table: eliter_step_progress
//   FOREIGN KEY eliter_step_progress_assignment_id_fkey: FOREIGN KEY (assignment_id) REFERENCES eliter_program_assignments(id) ON DELETE CASCADE
//   UNIQUE eliter_step_progress_assignment_id_step_id_key: UNIQUE (assignment_id, step_id)
//   PRIMARY KEY eliter_step_progress_pkey: PRIMARY KEY (id)
//   CHECK eliter_step_progress_status_check: CHECK ((status = ANY (ARRAY['not_started'::text, 'in_progress'::text, 'completed'::text])))
//   FOREIGN KEY eliter_step_progress_step_id_fkey: FOREIGN KEY (step_id) REFERENCES onboarding_steps(id) ON DELETE CASCADE
// Table: eliter_task_progress
//   FOREIGN KEY eliter_task_progress_assignment_id_fkey: FOREIGN KEY (assignment_id) REFERENCES eliter_program_assignments(id) ON DELETE CASCADE
//   UNIQUE eliter_task_progress_assignment_id_task_id_key: UNIQUE (assignment_id, task_id)
//   PRIMARY KEY eliter_task_progress_pkey: PRIMARY KEY (id)
//   FOREIGN KEY eliter_task_progress_task_id_fkey: FOREIGN KEY (task_id) REFERENCES step_tasks(id) ON DELETE CASCADE
// Table: form_answers
//   PRIMARY KEY form_answers_pkey: PRIMARY KEY (id)
//   FOREIGN KEY form_answers_question_id_fkey: FOREIGN KEY (question_id) REFERENCES form_questions(id) ON DELETE CASCADE
//   FOREIGN KEY form_answers_submission_id_fkey: FOREIGN KEY (submission_id) REFERENCES form_submissions(id) ON DELETE CASCADE
// Table: form_question_options
//   PRIMARY KEY form_question_options_pkey: PRIMARY KEY (id)
//   FOREIGN KEY form_question_options_question_id_fkey: FOREIGN KEY (question_id) REFERENCES form_questions(id) ON DELETE CASCADE
// Table: form_questions
//   PRIMARY KEY form_questions_pkey: PRIMARY KEY (id)
//   CHECK form_questions_question_type_check: CHECK ((question_type = ANY (ARRAY['single_choice'::text, 'multiple_choice'::text, 'open_ended'::text, 'video'::text, 'text'::text])))
//   FOREIGN KEY form_questions_step_id_fkey: FOREIGN KEY (step_id) REFERENCES form_steps(id) ON DELETE CASCADE
// Table: form_steps
//   FOREIGN KEY form_steps_form_id_fkey: FOREIGN KEY (form_id) REFERENCES application_forms(id) ON DELETE CASCADE
//   PRIMARY KEY form_steps_pkey: PRIMARY KEY (id)
// Table: form_submissions
//   FOREIGN KEY form_submissions_form_id_fkey: FOREIGN KEY (form_id) REFERENCES application_forms(id) ON DELETE CASCADE
//   PRIMARY KEY form_submissions_pkey: PRIMARY KEY (id)
//   CHECK form_submissions_status_check: CHECK ((status = ANY (ARRAY['in_progress'::text, 'new'::text, 'reviewed'::text, 'approved'::text, 'rejected'::text])))
// Table: onboarding_programs
//   FOREIGN KEY onboarding_programs_created_by_fkey: FOREIGN KEY (created_by) REFERENCES profiles(id) ON DELETE SET NULL
//   PRIMARY KEY onboarding_programs_pkey: PRIMARY KEY (id)
// Table: onboarding_steps
//   PRIMARY KEY onboarding_steps_pkey: PRIMARY KEY (id)
//   FOREIGN KEY onboarding_steps_program_id_fkey: FOREIGN KEY (program_id) REFERENCES onboarding_programs(id) ON DELETE CASCADE
// Table: open_ended_reviews
//   FOREIGN KEY open_ended_reviews_answer_id_fkey: FOREIGN KEY (answer_id) REFERENCES eliter_quiz_answers(id) ON DELETE CASCADE
//   UNIQUE open_ended_reviews_answer_id_key: UNIQUE (answer_id)
//   PRIMARY KEY open_ended_reviews_pkey: PRIMARY KEY (id)
//   FOREIGN KEY open_ended_reviews_reviewed_by_fkey: FOREIGN KEY (reviewed_by) REFERENCES profiles(id) ON DELETE SET NULL
//   CHECK open_ended_reviews_status_check: CHECK ((status = ANY (ARRAY['pending'::text, 'correct'::text, 'incorrect'::text])))
// Table: pipeline_candidates
//   FOREIGN KEY pipeline_candidates_evaluation_id_fkey: FOREIGN KEY (evaluation_id) REFERENCES ai_evaluations(id) ON DELETE CASCADE
//   PRIMARY KEY pipeline_candidates_pkey: PRIMARY KEY (id)
//   CHECK pipeline_candidates_stage_check: CHECK ((stage = ANY (ARRAY['candidatos'::text, 'entrei_em_contato'::text, 'primeira_entrevista'::text, 'aguardando_segunda'::text, 'segunda_entrevista'::text, 'contratado'::text, 'desqualificado'::text])))
//   FOREIGN KEY pipeline_candidates_submission_id_fkey: FOREIGN KEY (submission_id) REFERENCES form_submissions(id) ON DELETE CASCADE
//   UNIQUE pipeline_candidates_submission_id_key: UNIQUE (submission_id)
// Table: profiles
//   PRIMARY KEY profiles_pkey: PRIMARY KEY (id)
//   CHECK profiles_role_check: CHECK ((role = ANY (ARRAY['gestor_master'::text, 'eliter'::text])))
//   FOREIGN KEY profiles_user_id_fkey: FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
//   UNIQUE profiles_user_id_key: UNIQUE (user_id)
// Table: question_options
//   PRIMARY KEY question_options_pkey: PRIMARY KEY (id)
//   FOREIGN KEY question_options_question_id_fkey: FOREIGN KEY (question_id) REFERENCES quiz_questions(id) ON DELETE CASCADE
// Table: quiz_questions
//   PRIMARY KEY quiz_questions_pkey: PRIMARY KEY (id)
//   CHECK quiz_questions_question_type_check: CHECK ((question_type = ANY (ARRAY['multiple_choice'::text, 'true_false'::text, 'open_ended'::text])))
//   FOREIGN KEY quiz_questions_quiz_id_fkey: FOREIGN KEY (quiz_id) REFERENCES step_quizzes(id) ON DELETE CASCADE
// Table: step_quizzes
//   PRIMARY KEY step_quizzes_pkey: PRIMARY KEY (id)
//   FOREIGN KEY step_quizzes_step_id_fkey: FOREIGN KEY (step_id) REFERENCES onboarding_steps(id) ON DELETE CASCADE
//   UNIQUE step_quizzes_step_id_key: UNIQUE (step_id)
// Table: step_tasks
//   PRIMARY KEY step_tasks_pkey: PRIMARY KEY (id)
//   FOREIGN KEY step_tasks_step_id_fkey: FOREIGN KEY (step_id) REFERENCES onboarding_steps(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: ai_config
//   Policy "Gestor master can manage ai_config" (ALL, PERMISSIVE) roles={public}
//     USING: is_gestor_master()
// Table: ai_evaluations
//   Policy "Authenticated users can insert ai_evaluations" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (auth.uid() IS NOT NULL)
//   Policy "Gestor master can manage ai_evaluations" (ALL, PERMISSIVE) roles={public}
//     USING: is_gestor_master()
// Table: application_forms
//   Policy "Allow authenticated read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Allow public read access to application_forms" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Gestor master can manage application_forms" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: eliter_program_assignments
//   Policy "Eliter can read own assignments" (SELECT, PERMISSIVE) roles={public}
//     USING: (eliter_id IN ( SELECT profiles.id
//               FROM profiles
//              WHERE (profiles.user_id = auth.uid())))
//   Policy "Gestor master can manage assignments" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
//   Policy "Gestor master can read all assignments" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
// Table: eliter_quiz_answers
//   Policy "Eliter can read own quiz answers" (SELECT, PERMISSIVE) roles={public}
//     USING: (attempt_id IN ( SELECT eliter_quiz_attempts.id
//               FROM eliter_quiz_attempts
//              WHERE (eliter_quiz_attempts.assignment_id IN ( SELECT eliter_program_assignments.id
//                       FROM eliter_program_assignments
//                      WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                               FROM profiles
//                              WHERE (profiles.user_id = auth.uid())))))))
//   Policy "Gestor master can read all quiz answers" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
//   Policy "Users can insert own quiz answers" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (attempt_id IN ( SELECT eliter_quiz_attempts.id
//                    FROM eliter_quiz_attempts
//                   WHERE (eliter_quiz_attempts.assignment_id IN ( SELECT eliter_program_assignments.id
//                            FROM eliter_program_assignments
//                           WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                                    FROM profiles
//                                   WHERE (profiles.user_id = auth.uid())))))))
// Table: eliter_quiz_attempts
//   Policy "Eliter can read own quiz attempts" (SELECT, PERMISSIVE) roles={public}
//     USING: (assignment_id IN ( SELECT eliter_program_assignments.id
//               FROM eliter_program_assignments
//              WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                       FROM profiles
//                      WHERE (profiles.user_id = auth.uid())))))
//   Policy "Gestor master can read all quiz attempts" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
//   Policy "Users can insert own quiz attempts" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (assignment_id IN ( SELECT eliter_program_assignments.id
//                    FROM eliter_program_assignments
//                   WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                            FROM profiles
//                           WHERE (profiles.user_id = auth.uid())))))
// Table: eliter_step_progress
//   Policy "Eliter can read own step progress" (SELECT, PERMISSIVE) roles={public}
//     USING: (assignment_id IN ( SELECT eliter_program_assignments.id
//               FROM eliter_program_assignments
//              WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                       FROM profiles
//                      WHERE (profiles.user_id = auth.uid())))))
//   Policy "Gestor master can read all step progress" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
//   Policy "Users can insert own step progress" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (assignment_id IN ( SELECT eliter_program_assignments.id
//                    FROM eliter_program_assignments
//                   WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                            FROM profiles
//                           WHERE (profiles.user_id = auth.uid())))))
//   Policy "Users can update own step progress" (UPDATE, PERMISSIVE) roles={public}
//     USING: (assignment_id IN ( SELECT eliter_program_assignments.id
//               FROM eliter_program_assignments
//              WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                       FROM profiles
//                      WHERE (profiles.user_id = auth.uid())))))
// Table: eliter_task_progress
//   Policy "Eliter can read own task progress" (SELECT, PERMISSIVE) roles={public}
//     USING: (assignment_id IN ( SELECT eliter_program_assignments.id
//               FROM eliter_program_assignments
//              WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                       FROM profiles
//                      WHERE (profiles.user_id = auth.uid())))))
//   Policy "Gestor master can read all task progress" (SELECT, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
//   Policy "Users can insert own task progress" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (assignment_id IN ( SELECT eliter_program_assignments.id
//                    FROM eliter_program_assignments
//                   WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                            FROM profiles
//                           WHERE (profiles.user_id = auth.uid())))))
//   Policy "Users can update own task progress" (UPDATE, PERMISSIVE) roles={public}
//     USING: (assignment_id IN ( SELECT eliter_program_assignments.id
//               FROM eliter_program_assignments
//              WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                       FROM profiles
//                      WHERE (profiles.user_id = auth.uid())))))
// Table: form_answers
//   Policy "Allow anon insert to form_answers" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Allow authenticated inserts" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Gestor master can manage form_answers" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: form_question_options
//   Policy "Allow authenticated read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Allow public read access to form_question_options" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Gestor master can manage form_question_options" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: form_questions
//   Policy "Allow authenticated read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Allow public read access to form_questions" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Gestor master can manage form_questions" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: form_steps
//   Policy "Allow authenticated read access" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Allow public read access to form_steps" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Gestor master can manage form_steps" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: form_submissions
//   Policy "Allow anon insert to form_submissions" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Allow authenticated inserts" (INSERT, PERMISSIVE) roles={authenticated}
//     WITH CHECK: true
//   Policy "Gestor master can manage form_submissions" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: onboarding_programs
//   Policy "Authenticated users can read active programs" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: ((is_active = true) OR is_gestor_master())
//   Policy "Gestor master can manage programs" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: onboarding_steps
//   Policy "All authenticated users can read steps" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() IS NOT NULL)
//   Policy "Gestor master can manage steps" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
// Table: open_ended_reviews
//   Policy "Eliter can read own open ended reviews" (SELECT, PERMISSIVE) roles={public}
//     USING: (answer_id IN ( SELECT eliter_quiz_answers.id
//               FROM eliter_quiz_answers
//              WHERE (eliter_quiz_answers.attempt_id IN ( SELECT eliter_quiz_attempts.id
//                       FROM eliter_quiz_attempts
//                      WHERE (eliter_quiz_attempts.assignment_id IN ( SELECT eliter_program_assignments.id
//                               FROM eliter_program_assignments
//                              WHERE (eliter_program_assignments.eliter_id IN ( SELECT profiles.id
//                                       FROM profiles
//                                      WHERE (profiles.user_id = auth.uid())))))))))
//   Policy "Gestor master can manage open ended reviews" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
// Table: pipeline_candidates
//   Policy "Authenticated users can insert pipeline_candidates" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: (auth.uid() IS NOT NULL)
//   Policy "Gestor master can manage pipeline_candidates" (ALL, PERMISSIVE) roles={public}
//     USING: is_gestor_master()
// Table: profiles
//   Policy "Users can read own profile OR gestor master can read all" (SELECT, PERMISSIVE) roles={public}
//     USING: ((user_id = auth.uid()) OR is_gestor_master())
//   Policy "Users can update own profile" (UPDATE, PERMISSIVE) roles={public}
//     USING: (user_id = auth.uid())
// Table: question_options
//   Policy "Authenticated users can read question options" (SELECT, PERMISSIVE) roles={authenticated}
//     USING: true
//   Policy "Gestor master can manage question options" (ALL, PERMISSIVE) roles={authenticated}
//     USING: is_gestor_master()
// Table: quiz_questions
//   Policy "All authenticated users can read quiz questions" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() IS NOT NULL)
//   Policy "Gestor master can manage quiz questions" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
// Table: step_quizzes
//   Policy "All authenticated users can read step quizzes" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() IS NOT NULL)
//   Policy "Gestor master can manage step quizzes" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))
// Table: step_tasks
//   Policy "All authenticated users can read tasks" (SELECT, PERMISSIVE) roles={public}
//     USING: (auth.uid() IS NOT NULL)
//   Policy "Gestor master can manage tasks" (ALL, PERMISSIVE) roles={public}
//     USING: (EXISTS ( SELECT 1
//               FROM profiles
//              WHERE ((profiles.user_id = auth.uid()) AND (profiles.role = 'gestor_master'::text))))

// --- DATABASE FUNCTIONS ---
// FUNCTION handle_pipeline_stage_update()
//   CREATE OR REPLACE FUNCTION public.handle_pipeline_stage_update()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//     IF NEW.stage IS DISTINCT FROM OLD.stage THEN
//       NEW.moved_at = now();
//     END IF;
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION handle_updated_at()
//   CREATE OR REPLACE FUNCTION public.handle_updated_at()
//    RETURNS trigger
//    LANGUAGE plpgsql
//   AS $function$
//   BEGIN
//     NEW.updated_at = now();
//     RETURN NEW;
//   END;
//   $function$
//   
// FUNCTION is_gestor_master()
//   CREATE OR REPLACE FUNCTION public.is_gestor_master()
//    RETURNS boolean
//    LANGUAGE sql
//    SECURITY DEFINER
//    SET search_path TO 'public'
//   AS $function$
//     SELECT EXISTS (
//       SELECT 1
//       FROM profiles
//       WHERE user_id = auth.uid()
//       AND role = 'gestor_master'
//     );
//   $function$
//   
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//   

// --- TRIGGERS ---
// Table: ai_config
//   on_ai_config_updated: CREATE TRIGGER on_ai_config_updated BEFORE UPDATE ON public.ai_config FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: application_forms
//   on_application_forms_updated: CREATE TRIGGER on_application_forms_updated BEFORE UPDATE ON public.application_forms FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: onboarding_programs
//   on_onboarding_programs_updated: CREATE TRIGGER on_onboarding_programs_updated BEFORE UPDATE ON public.onboarding_programs FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: onboarding_steps
//   on_onboarding_steps_updated: CREATE TRIGGER on_onboarding_steps_updated BEFORE UPDATE ON public.onboarding_steps FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: pipeline_candidates
//   on_pipeline_stage_updated: CREATE TRIGGER on_pipeline_stage_updated BEFORE UPDATE ON public.pipeline_candidates FOR EACH ROW EXECUTE FUNCTION handle_pipeline_stage_update()
// Table: profiles
//   on_profiles_updated: CREATE TRIGGER on_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION handle_updated_at()
// Table: step_quizzes
//   on_step_quizzes_updated: CREATE TRIGGER on_step_quizzes_updated BEFORE UPDATE ON public.step_quizzes FOR EACH ROW EXECUTE FUNCTION handle_updated_at()

// --- INDEXES ---
// Table: ai_evaluations
//   CREATE INDEX ai_evaluations_submission_id_idx ON public.ai_evaluations USING btree (submission_id)
//   CREATE UNIQUE INDEX ai_evaluations_submission_id_key ON public.ai_evaluations USING btree (submission_id)
// Table: application_forms
//   CREATE UNIQUE INDEX application_forms_slug_key ON public.application_forms USING btree (slug)
// Table: eliter_program_assignments
//   CREATE UNIQUE INDEX eliter_program_assignments_eliter_id_program_id_key ON public.eliter_program_assignments USING btree (eliter_id, program_id)
// Table: eliter_quiz_attempts
//   CREATE UNIQUE INDEX eliter_quiz_attempts_assignment_id_quiz_id_attempt_number_key ON public.eliter_quiz_attempts USING btree (assignment_id, quiz_id, attempt_number)
// Table: eliter_step_progress
//   CREATE UNIQUE INDEX eliter_step_progress_assignment_id_step_id_key ON public.eliter_step_progress USING btree (assignment_id, step_id)
// Table: eliter_task_progress
//   CREATE UNIQUE INDEX eliter_task_progress_assignment_id_task_id_key ON public.eliter_task_progress USING btree (assignment_id, task_id)
// Table: open_ended_reviews
//   CREATE UNIQUE INDEX open_ended_reviews_answer_id_key ON public.open_ended_reviews USING btree (answer_id)
// Table: pipeline_candidates
//   CREATE INDEX pipeline_candidates_stage_position_idx ON public.pipeline_candidates USING btree (stage, "position")
//   CREATE INDEX pipeline_candidates_submission_id_idx ON public.pipeline_candidates USING btree (submission_id)
//   CREATE UNIQUE INDEX pipeline_candidates_submission_id_key ON public.pipeline_candidates USING btree (submission_id)
// Table: profiles
//   CREATE UNIQUE INDEX profiles_user_id_key ON public.profiles USING btree (user_id)
// Table: step_quizzes
//   CREATE UNIQUE INDEX step_quizzes_step_id_key ON public.step_quizzes USING btree (step_id)

