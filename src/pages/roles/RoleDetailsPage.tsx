import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Edit,
  Trash,
  Shield,
  Check,
  X,
  Calendar,
  Building,
} from 'lucide-react';

// Static permission categories (copied from exploring frontend, but used purely for display)
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

// Simple helper for static permissions
const hasPermission = (rolePermissions: string[], permissionId: string): boolean => {
  if (rolePermissions.includes('all')) return true;
  const wildcardPrefix = permissionId.split('.')[0] + '.*';
  if (rolePermissions.includes(wildcardPrefix)) return true;
  return rolePermissions.includes(permissionId);
};

interface StaticRole {
  id: number;
  name: string;
  slug: string;
  description: string;
  branch?: string;
  priority: number;
  is_active: boolean;
  is_system?: boolean;
  created_at: string;
  updated_at?: string;
}

// Static mock roles for demo
const mockRoles: StaticRole[] = [
  {
    id: 1,
    name: 'CEO',
    slug: 'ceo',
    description: 'Full system access with all permissions',
    branch: 'Global',
    priority: 1,
    is_active: true,
    is_system: true,
    created_at: '2024-01-01',
    updated_at: '2024-05-01',
  },
  {
    id: 2,
    name: 'Branch Manager',
    slug: 'branch-manager',
    description: 'Manages branch operations and teams',
    branch: 'New York',
    priority: 5,
    is_active: true,
    is_system: false,
    created_at: '2024-02-10',
    updated_at: '2024-04-15',
  },
];

const staticPermissions: string[] = ['users.view', 'users.edit'];

const RoleDetailsPage: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const role = mockRoles.find((r) => r.id.toString() === roleId) ?? mockRoles[0];

  const handleEditRole = () => {
    navigate(`/roles/edit/${role.id}`);
  };

  const handleDeleteRole = () => {
    console.log('Delete role clicked:', role.id);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => navigate('/roles')} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Roles
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            {role.name}
          </h1>
          <p className="text-muted-foreground">{role.description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleEditRole}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Role
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeleteRole}
            disabled={role.is_system}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete Role
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Role Information</CardTitle>
            <CardDescription>Basic information about the role</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Role Name</h3>
                <p className="text-base">{role.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Role Slug</h3>
                <p className="text-base font-mono">{role.slug}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                <p className="text-base">{role.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Branch</h3>
                <div className="flex items-center mt-1">
                  <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Badge variant="outline">{role.branch || 'Global'}</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
                <div className="flex items-center mt-1">
                  <Badge variant="secondary">{role.priority}</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="flex items-center mt-1">
                  {role.is_active ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="destructive">Inactive</Badge>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">System Role</h3>
                <div className="flex items-center mt-1">
                  {role.is_system ? (
                    <Badge variant="outline" className="bg-primary/10">
                      Yes
                    </Badge>
                  ) : (
                    <Badge variant="outline">No</Badge>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{new Date(role.created_at).toLocaleDateString()}</span>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>
                    {role.updated_at
                      ? new Date(role.updated_at).toLocaleDateString()
                      : 'Never'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Permissions currently associated with this role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {permissionCategories.map((category) => (
                <div key={category.id} className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">{category.name}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {category.permissions.map((permission) => {
                      const allowed = hasPermission(staticPermissions, permission.id);
                      return (
                        <div key={permission.id} className="flex items-center">
                          {allowed ? (
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 mr-2 text-red-500" />
                          )}
                          <span className={allowed ? '' : 'text-muted-foreground'}>
                            {permission.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleDetailsPage;
