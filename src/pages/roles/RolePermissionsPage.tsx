import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save } from 'lucide-react';

// Permission modules and features similar to exploring-talent-frontend
const permissionModules = [
  {
    id: 'student-information',
    name: 'Student Information',
    features: [
      { id: 'student', name: 'Student' },
      { id: 'import-student', name: 'Import Student' },
      { id: 'student-categories', name: 'Student Categories' },
      { id: 'student-houses', name: 'Student Houses' },
    ],
  },
  {
    id: 'fees-collection',
    name: 'Fees Collection',
    features: [
      { id: 'collect-fees', name: 'Collect Fees' },
      { id: 'fees-master', name: 'Fees Master' },
      { id: 'fees-group', name: 'Fees Group' },
      { id: 'fees-type', name: 'Fees Type' },
    ],
  },
];

const permissionTypes = [
  { id: 'view', name: 'View' },
  { id: 'add', name: 'Add' },
  { id: 'edit', name: 'Edit' },
  { id: 'delete', name: 'Delete' },
];

interface PermissionsState {
  [featureId: string]: string[];
}

interface StaticRole {
	id: number;
	name: string;
	slug: string;
}

const mockRoles: StaticRole[] = [
	{ id: 1, name: 'CEO', slug: 'ceo' },
	{ id: 2, name: 'Branch Manager', slug: 'branch-manager' },
];

const RolePermissionsPage: React.FC = () => {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const [permissions, setPermissions] = useState<PermissionsState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

	const role = mockRoles.find((r) => r.id.toString() === roleId) ?? mockRoles[0];

  const handlePermissionChange = (
    featureId: string,
    permissionType: string,
    checked: boolean
  ) => {
    setPermissions((prev) => {
      const updated = { ...prev };
      const current = updated[featureId] || [];

      if (checked) {
        if (!current.includes(permissionType)) {
          updated[featureId] = [...current, permissionType];
        }
      } else {
        updated[featureId] = current.filter((p) => p !== permissionType);
      }

      return updated;
    });
  };

  const isPermissionSelected = (featureId: string, permissionType: string) => {
    return permissions[featureId]?.includes(permissionType) || false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Saving permissions for role:', roleId, permissions);

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/roles/${roleId}`);
    }, 500);
  };

  const handleCancel = () => {
    navigate(`/roles/${roleId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={handleCancel} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Role Details
        </Button>
        <h1 className="text-2xl font-bold">Assign Permissions ({role.name})</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/4">
                      Module
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 w-1/4">
                      Feature
                    </th>
                    {permissionTypes.map((type) => (
                      <th
                        key={type.id}
                        className="text-center py-3 px-4 font-medium text-gray-700"
                      >
                        {type.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissionModules.map((module) => (
                    <React.Fragment key={module.id}>
                      {module.features.map((feature, index) => (
                        <tr
                          key={feature.id}
                          className={
                            index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }
                        >
                          {index === 0 && (
                            <td
                              className="py-3 px-4 border-t align-top"
                              rowSpan={module.features.length}
                            >
                              {module.name}
                            </td>
                          )}
                          <td className="py-3 px-4 border-t">{feature.name}</td>
                          {permissionTypes.map((type) => (
                            <td
                              key={type.id}
                              className="text-center py-3 px-4 border-t"
                            >
                              <Checkbox
                                id={`${feature.id}-${type.id}`}
                                checked={isPermissionSelected(
                                  feature.id,
                                  type.id
                                )}
                                onCheckedChange={(checked: boolean) =>
                                  handlePermissionChange(
                                    feature.id,
                                    type.id,
                                    checked
                                  )
                                }
                                className="mx-auto"
                                disabled={isSubmitting}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Saving...' : 'Save Permissions'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RolePermissionsPage;
