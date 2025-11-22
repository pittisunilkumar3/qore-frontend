import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

const AddRolePage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    branch_id: 'null' as string,
    is_system: false,
    priority: 10,
    is_active: true,
  });

  const branches = [
    { id: 'null', name: 'Global (All Branches)' },
    { id: '1', name: 'New York' },
    { id: '2', name: 'San Francisco' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, '-'),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSwitchChange = (name: 'is_system' | 'is_active', checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      branch_id: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.slug || !formData.description) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    console.log('Role created:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/roles');
    }, 500);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate('/roles')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Roles
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Role</h1>
          <p className="text-muted-foreground">
            Create a new role with specific permissions
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>Basic information about the role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name *</Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g., Marketing Manager"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Role Slug *</Label>
              <Input
                id="slug"
                name="slug"
                placeholder="e.g., marketing-manager"
                value={formData.slug}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Unique identifier for the role (auto-generated from name)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the role's responsibilities and access level"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch_id">Branch</Label>
              <Select
                disabled={isSubmitting}
                value={formData.branch_id}
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Leave as "Global" for roles that apply to all branches
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Input
                id="priority"
                name="priority"
                type="number"
                min={1}
                max={100}
                placeholder="10"
                value={formData.priority}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground">
                Higher priority roles (1-100) take precedence in case of conflicts
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_system"
                checked={formData.is_system}
                onCheckedChange={(checked: boolean) =>
                  handleSwitchChange('is_system', checked)
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="is_system">System Role</Label>
              <p className="text-xs text-muted-foreground ml-2">
                System roles cannot be modified or deleted by regular users
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked: boolean) =>
                  handleSwitchChange('is_active', checked)
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            <div className="pt-2">
              <p className="text-sm text-muted-foreground">
                After creating the role, you can assign permissions from the roles list.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/roles')}
            className="mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save Role'}
            </>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRolePage;
