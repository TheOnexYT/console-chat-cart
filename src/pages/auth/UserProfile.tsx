
import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>
              <User className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <CardTitle>Perfil de Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Nombre</p>
            <p className="font-medium">{user.name || 'No especificado'}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Rol</p>
            <p className="font-medium capitalize">{user.role}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">ID</p>
            <p className="font-medium">{user.id}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
