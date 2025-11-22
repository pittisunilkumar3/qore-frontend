import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';

interface StaticRole {
  id: number;
  name: string;
  slug: string;
  description: string;
  branch_id: string;
  priority: number;
  is_active: boolean;
  is_system: boolean;
}

const mockRoles: StaticRole[] = [
  {
    id: 1,
    name: 'CEO',
    slug: 'ceo',
    description: 'Full system access with all permissions',
    branch_id: 'null',
    priority: 1,
    is_active: true,
    is_system: true,
  },
  {
    id: 2,
    name: 'Branch Manager',
    slug: 'branch-manager',
    description: 'Manages branch operations and teams',
    branch_id: '1',
    priority: 5,
    is_active: true,
    is_system: false,
  },
];

const permissionCategories = [
  {
    id: 'users',
    name: 'User Management',
    permissions: [
      { id: 'users.view', name: 'View Users' },
      { id: 'users.create', name: 'Create Users' },
      { id: 'users.edit', name: 'Edit Users' },
      { id: 'users.delete', name: 'Delete Users' },
    ],
  },
  {
    id: 'roles',
    name: 'Role Management',
    permissions: [
      { id: 'roles.view', name: 'View Roles' },
      { id: 'roles.create', name: 'Create Roles' },
      { id: 'roles.edit', name: 'Edit Roles' },
      { id: 'roles.delete', name: 'Delete Roles' },
    ],
  },
  {
    id: 'jobs',
    name: 'Job Management',
    permissions: [
      { id: 'jobs.view', name: 'View Jobs' },
      { id: 'jobs.create', name: 'Create Jobs' },
      { id: 'jobs.edit', name: 'Edit Jobs' },
      { id: 'jobs.delete', name: 'Delete Jobs' },
    ],
  },
  {
    id: 'candidates',
    name: 'Candidate Management',
    permissions: [
      { id: 'candidates.view', name: 'View Candidates' },
      { id: 'candidates.create', name: 'Create Candidates' },
      { id: 'candidates.edit', name: 'Edit Candidates' },
      { id: 'candidates.delete', name: 'Delete Candidates' },
    ],
  },
  {
    id: 'interviews',
    name: 'Interview Management',
    permissions: [
      { id: 'interviews.view', name: 'View Interviews' },
      { id: 'interviews.schedule', name: 'Schedule Interviews' },
      { id: 'interviews.feedback', name: 'Provide Interview Feedback' },
    ],
  },
];

const branches = [
  { id: 'null', name: 'Global (All Branches)' },
  { id: '1', name: 'New York' },
  { id: '2', name: 'San Francisco' },
];

const RoleEditPage: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const baseRole = mockRoles.find((r) => r.id.toString() === roleId) ?? mockRoles[0];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: baseRole.name,
    slug: baseRole.slug,
    description: baseRole.description,
    branch_id: baseRole.branch_id,
    is_system: baseRole.is_system,
    priority: baseRole.priority,
    is_active: baseRole.is_active,
    permissions: ['users.view', 'users.edit'] as string[],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: prev.is_system ? prev.slug : value.toLowerCase().replace(/\s+/g, '-'),
      }));
    } else if (name === 'slug') {
      setFormData((prev) => ({
        ...prev,
        slug: value,
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

  const handleSelectChange = (name: 'branch_id', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter((id) => id !== permissionId),
    }));
  };

  const handleCategorySelectAll = (categoryId: string, checked: boolean) => {
    const category = permissionCategories.find((cat) => cat.id === categoryId);
    if (!category) return;

    const categoryPermissionIds = category.permissions.map((p) => p.id);

    setFormData((prev) => ({
      ...prev,
      permissions: checked
        ? Array.from(new Set([...prev.permissions, ...categoryPermissionIds]))
        : prev.permissions.filter((id) => !categoryPermissionIds.includes(id)),
    }));
  };

  const isCategorySelected = (categoryId: string) => {
    const category = permissionCategories.find((cat) => cat.id === categoryId);
    if (!category) return false;

    return category.permissions.every((p) => formData.permissions.includes(p.id));
  };

  const isPermissionSelected = (permissionId: string) => {
    return formData.permissions.includes(permissionId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.slug || !formData.description) {
      alert('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    console.log('Updating role with data:', formData);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/roles/${baseRole.id}`);
    }, 500);
  };

  const isSystemRole = formData.is_system;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => navigate(`/roles/${baseRole.id}`)}
          className="mr-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Role Details
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Role</h1>
          <p className="text-muted-foreground">
            Update role information and permissions
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
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
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSystemRole || isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Role Slug *</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  required
                  disabled={isSystemRole || isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Unique identifier for the role
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
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
                  disabled={isSystemRole || isSubmitting}
                  value={formData.branch_id}
                  onValueChange={(value) => handleSelectChange('branch_id', value)}
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
                  disabled={isSystemRole || isSubmitting}
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
                  disabled={isSystemRole || isSubmitting}
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Select the permissions for this role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {permissionCategories.map((category) => (
                  <AccordionItem key={category.id} value={category.id}>
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={isCategorySelected(category.id)}
                          onCheckedChange={(checked) =>
                            handleCategorySelectAll(category.id, checked as boolean)
                          }
                          onClick={(e) => e.stopPropagation()}
                          disabled={isSystemRole || isSubmitting}
                        />
                        <Label
                          htmlFor={`category-${category.id}`}
                          className="text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {category.name}
                        </Label>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="ml-6 space-y-2">
                        {category.permissions.map((permission) => (
                          <div
                            key={permission.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={permission.id}
                              checked={isPermissionSelected(permission.id)}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(permission.id, checked as boolean)
                              }
                              disabled={isSystemRole || isSubmitting}
                            />
                            <Label htmlFor={permission.id} className="text-sm">
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/roles/${baseRole.id}`)}
            className="mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RoleEditPage;
