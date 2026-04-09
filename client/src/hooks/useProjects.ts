import { useState, useEffect } from 'react'
import { fetchProjects, createProject } from '@/services/projectService'
import type { Project } from '@/shared/types'

export const useProjects = (userId: string) => {
  const [projects, setProjects] = useState<Project[]>([])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        const data = await fetchProjects()
        setProjects(data)
        if (data.length > 0 && !activeProject) setActiveProject(data[0])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [userId])

  const create = async (name: string, description?: string) => {
    setCreating(true)
    try {
      const project = await createProject(name, description)
      setProjects(prev => [project, ...prev])
      setActiveProject(project)
      return project
    } finally {
      setCreating(false)
    }
  }

  return { projects, activeProject, setActiveProject, loading, creating, create }
}
