import { supabase, getSupabaseClient } from '@shared/utils/supabase'

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  tech_stack: string | null
  repo_url: string | null
  preview_url: string | null
  deploy_url: string | null
  created_at: string
  updated_at: string
}

export const getAllProjects = async (userId: string, token?: string): Promise<Project[]> => {
  const client = getSupabaseClient(token)
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch projects: ${error.message}`)
  return data ?? []
}

export const getProjectById = async (projectId: string, userId: string, token?: string): Promise<Project> => {
  const client = getSupabaseClient(token)
  const { data, error } = await client
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .eq('user_id', userId)
    .single()

  if (error) throw new Error(`Project not found: ${error.message}`)
  return data
}

export const createProject = async (
  name: string,
  userId: string,
  token?: string,
  description?: string
): Promise<Project> => {
  const client = getSupabaseClient(token)
  const { data, error } = await client
    .from('projects')
    .insert({
      name: name.trim(),
      description: description?.trim() ?? null,
      user_id: userId,
    })
    .select()
    .single()

  if (error) throw new Error(`Failed to create project: ${error.message}`)
  return data
}

export const updateProjectUrls = async (
  projectId: string,
  urls: Partial<Project>
): Promise<void> => {
  const { error } = await supabase
    .from('projects')
    .update(urls)
    .eq('id', projectId)

  if (error) throw new Error(`Failed to update project: ${error.message}`)
}
