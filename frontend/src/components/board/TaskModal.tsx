import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TaskModalProps {
  onClose: () => void;
  onSubmit: (taskData: { title: string; description: string; deadline?: string; tags?: string[] }) => void;
  initialData?: {
    title?: string;
    description?: string;
    deadline?: string;
    tags?: string[];
  };
}

export const TaskModal: React.FC<TaskModalProps> = ({
  onClose,
  onSubmit,
  initialData = {}
}) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [deadline, setDeadline] = useState(initialData.deadline || '');
  const [tags, setTags] = useState(initialData.tags?.join(', ') || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || undefined,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : undefined
    };

    onSubmit(taskData);
  };

  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <Card className="w-[500px] p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">
          {initialData.title ? 'Edit Task' : 'Create New Task'}
        </h3>

        <div className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
              placeholder="Enter task title"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full min-h-[100px] px-3 py-2 rounded-md border bg-background text-sm resize-y"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deadline</label>
            <Input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Tags (comma-separated)
            </label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="design, urgent, feature"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {initialData.title ? 'Save Changes' : 'Create Task'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};