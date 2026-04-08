import { supabase } from '@shared/utils/supabase';
import type { GeneratedFileOutput } from '@shared/types/types';

export const saveFilesToSupabase = async (
  projectId: string,
  files: GeneratedFileOutput[]
): Promise<void> => {
  for (const file of files) {
    const { error } = await supabase
      .from('generated_files')
      .upsert({
        project_id: projectId,
        file_path: file.path,
        content: file.content,
        language: file.language,
        version: 1,
      });

    if (error) {
      throw new Error(`Failed to save file ${file.path}: ${error.message}`);
    }
  }
};