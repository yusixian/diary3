import { useAtom } from 'jotai';
import { FunctionComponent, useEffect, useState } from 'react';
import Dialog from '../dialog';
import { cloudBackupDialogOpenAtom } from '@/atoms/app';
import Button from '../button';
import { toast } from 'react-toastify';
import { persistor } from '@/entry/store';

interface CloudBackup {
  id: string;
  fileName: string;
  content: any;
  createdAt: string;
}

const CloudBackupDialog: FunctionComponent = () => {
  const [isOpen, setOpen] = useAtom(cloudBackupDialogOpenAtom);
  const [backups, setBackups] = useState<CloudBackup[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBackups = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/github-backup');
      if (!response.ok) {
        throw new Error('获取备份失败');
      }
      const data = await response.json();
      setBackups(data);
    } catch (error) {
      console.error('获取备份失败:', error);
      toast.error('获取备份列表失败');
    } finally {
      setIsLoading(false);
    }
  };

  const restoreBackup = async (backup: CloudBackup) => {
    try {
      persistor.pause();
      const loadMsg = toast.loading('正在恢复数据...');

      // 恢复数据到本地存储
      localStorage.setItem('persist:diary', JSON.stringify(backup.content));

      toast.update(loadMsg, {
        render: '数据恢复成功，即将刷新页面',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });

      // 延迟刷新页面
      setTimeout(() => {
        window?.location?.reload();
      }, 2000);
    } catch (error) {
      console.error('恢复备份失败:', error);
      toast.error('恢复备份失败');
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBackups();
    }
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setOpen(open)}
      title="云端备份数据"
      render={() => (
        <div className="flex flex-col gap-4 p-4">
          {isLoading ? (
            <div className="py-4 text-center">加载中...</div>
          ) : backups.length === 0 ? (
            <div className="py-4 text-center">暂无备份数据</div>
          ) : (
            <div className="flex max-h-[500px] flex-col gap-3 overflow-auto">
              {backups.map((backup) => (
                <div key={backup.id} className="flex items-center justify-between gap-2 rounded-lg bg-zinc-700 p-4 shadow-md">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-zinc-200">{backup.fileName}</span>
                    <span className="text-xs text-zinc-400">{new Date(backup.createdAt).toLocaleString()}</span>
                  </div>
                  <Button
                    onClick={() => restoreBackup(backup)}
                    className="rounded-full border border-gray-300 bg-white px-4 py-2 font-semibold text-black shadow-sm transition-all duration-300 hover:bg-gray-100"
                  >
                    恢复此备份
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      renderFooter={({ close }) => (
        <div className="mt-4 flex justify-end gap-2">
          <Button onClick={close} className="rounded bg-gray-500 px-3 py-1 font-semibold text-white hover:bg-gray-600">
            关闭
          </Button>
          <Button
            onClick={fetchBackups}
            type="primary"
            className="rounded bg-green-500 px-3 py-1 font-semibold text-white hover:bg-green-600"
          >
            刷新列表
          </Button>
        </div>
      )}
    />
  );
};

export default CloudBackupDialog;
