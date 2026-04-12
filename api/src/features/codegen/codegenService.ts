import { getSupabaseClient } from '@shared/utils/supabase';
import type { GeneratedFileOutput } from '@shared/types/types';

export const saveFilesToSupabase = async (
  projectId: string,
  files: GeneratedFileOutput[],
  token?: string
): Promise<void> => {
  const supabase = getSupabaseClient(token);
  for (const file of files) {
const { error } = await supabase
  .from('generated_files')
  .upsert(
    {
      project_id: projectId,
      file_path: file.path,
      content: file.content,
      language: file.language,
      version: 1,
    },
    { onConflict: 'project_id,file_path,version' }
  );

    if (error) {
      throw new Error(`Failed to save file ${file.path}: ${error.message}`);
    }
  }
};