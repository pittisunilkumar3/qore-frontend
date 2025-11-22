import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Plus,
  MoreHorizontal,
  Shield,
  Eye,
  Edit,
  Trash,
} from 'lucide-react';

// Static role type for demo
interface Role {
  id: number;
  name: string;
  description: string;
  branch?: string;
  priority: number;
  is_active: boolean;
  is_system?: boolean;
}

const RolesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Static demo data
  const roles: Role[] = [
    {
      id: 1,
      name: 'CEO',
      description: 'Full system access with all permissions',
      branch: 'Global',
      priority: 1,
      is_active: true,
      is_system: true,
    },
    {
      id: 2,
      name: 'Branch Manager',
      description: 'Manages branch operations and teams',
      branch: 'New York',
      priority: 5,
      is_active: true,
    },
    {
      id: 3,
      name: 'Recruiter',
      description: 'Handles candidate sourcing and screening',
      branch: 'Global',
      priority: 10,
      is_active: true,
    },
  ];

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRole = () => {
    navigate('/roles/add');
  };

  const handleViewRole = (roleId: number) => {
    navigate(`/roles/${roleId}`);
  };

  const handleEditRole = (roleId: number) => {
    navigate(`/roles/edit/${roleId}`);
  };

  const handleAssignPermissions = (roleId: number) => {
    navigate(`/roles/permissions/${roleId}`);
  };

  const handleDeleteRole = (roleId: number, isSystem?: boolean) => {
    console.log('Delete role', roleId, { isSystem });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roles Management</h1>
          <p className="text-muted-foreground">
            View and manage user roles and their permissions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate('/roles/permission-groups')}
          >
            <Shield className="mr-2 h-4 w-4" /> Permission Groups
          </Button>
          <Button onClick={handleAddRole}>
            <Plus className="mr-2 h-4 w-4" /> Add New Role
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Roles</CardTitle>
          <CardDescription>
            Manage the roles available in the system and their associated permissions
          </CardDescription>
          <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
            <Input
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full"
            />
            <Button type="button" size="icon" variant="ghost">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRoles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No roles found. {searchQuery ? 'Try a different search term.' : 'Create your first role by clicking "Add New Role".'}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-primary" />
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{role.branch || 'Global'}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{role.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      {role.is_active ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="destructive">Inactive</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewRole(role.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRole(role.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAssignPermissions(role.id)}>
                            <Shield className="mr-2 h-4 w-4" />
                            Assign Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRole(role.id, role.is_system)}
                            disabled={role.is_system}
                            className={role.is_system ? 'text-muted-foreground' : 'text-destructive'}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredRoles.length} of {roles.length} roles
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RolesPage;
