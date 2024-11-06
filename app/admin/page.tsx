'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountTypeForm } from '@/components/admin/account-type-form';
import { ApplicationList } from '@/components/admin/application-list';

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Bank Administration</CardTitle>
          <CardDescription>
            Manage account types and review applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="applications" className="space-y-4">
            <TabsList>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="account-types">Account Types</TabsTrigger>
            </TabsList>
            
            <TabsContent value="applications">
              <ApplicationList />
            </TabsContent>
            
            <TabsContent value="account-types">
              <AccountTypeForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}