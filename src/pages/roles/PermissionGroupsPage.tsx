import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface PermissionCategory {
  id: number;
  name: string;
  enable_view: boolean;
  enable_add: boolean;
  enable_edit: boolean;
  enable_delete: boolean;
}

interface PermissionGroup {
  id: number;
  name: string;
  description?: string;
  categories: PermissionCategory[];
}

const mockPermissionGroups: PermissionGroup[] = [
  {
    id: 1,
    name: 'Student Management',
    description: 'Permissions related to managing students',
    categories: [
      {
        id: 1,
        name: 'Student',
        enable_view: true,
        enable_add: true,
        enable_edit: true,
        enable_delete: true,
      },
      {
        id: 2,
        name: 'Student Categories',
        enable_view: true,
        enable_add: true,
        enable_edit: false,
        enable_delete: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Fees Management',
    description: 'Permissions related to fees collection and configuration',
    categories: [
      {
        id: 3,
        name: 'Fees Group',
        enable_view: true,
        enable_add: true,
        enable_edit: true,
        enable_delete: false,
      },
      {
        id: 4,
        name: 'Fees Type',
        enable_view: true,
        enable_add: false,
        enable_edit: false,
        enable_delete: false,
      },
    ],
  },
];

const PermissionGroupsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGroups = mockPermissionGroups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSearchReset = () => {
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Permission Groups</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search permission groups..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
          </div>
          <Button type="submit" variant="outline" size="sm">
            Search
          </Button>
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleSearchReset}
            >
              Clear
            </Button>
          )}
        </form>
      </div>

      {filteredGroups.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No permission groups found.</p>
          </CardContent>
        </Card>
      ) : (
        filteredGroups.map((group) => (
          <Card key={group.id} className="mb-6">
            <CardContent className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">{group.name}</h2>
                {group.description && (
                  <p className="text-muted-foreground text-sm">
                    {group.description}
                  </p>
                )}
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">
                      Permission Category
                    </TableHead>
                    <TableHead className="text-center">View</TableHead>
                    <TableHead className="text-center">Add</TableHead>
                    <TableHead className="text-center">Edit</TableHead>
                    <TableHead className="text-center">Delete</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.categories.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center text-sm text-muted-foreground"
                      >
                        No permission categories defined for this group
                      </TableCell>
                    </TableRow>
                  ) : (
                    group.categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={category.enable_view}
                            disabled
                            className="mx-auto"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={category.enable_add}
                            disabled
                            className="mx-auto"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={category.enable_edit}
                            disabled
                            className="mx-auto"
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={category.enable_delete}
                            disabled
                            className="mx-auto"
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default PermissionGroupsPage;
