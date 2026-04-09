import { toast } from 'sonner';

export function useToast() {
  const successToast = (message: string) => {
    toast.success(message, {
      style: {
        background: '#161b22',
        border: '1px solid #3fb950',
        color: '#e6edf3',
        fontSize: '13px'
      },
    });
  };

  const errorToast = (message: string) => {
    toast.error(message, {
      style: {
        background: '#161b22',
        border: '1px solid #ff7b72',
        color: '#e6edf3',
        fontSize: '13px'
      },
    });
  };

  const infoToast = (message: string) => {
    toast(message, {
      style: {
        background: '#161b22',
        border: '1px solid #30363d',
        color: '#e6edf3',
        fontSize: '13px'
      },
    });
  };

  return { successToast, errorToast, infoToast };
}
