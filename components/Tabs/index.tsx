import React from 'react';
import {
  Tabs as TabsUI,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import { Issues } from '@/components/Issues';
import { History } from '@/components/History';
import styles from './styles.module.scss';
import { cn } from '@/utils';

export const Tabs: React.FC = () => {
  return (
    <TabsUI defaultValue="issues" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="issues"
          className={cn(
            '!shadow-none rounded-none text-base',
            styles.tabTrigger
          )}
        >
          Issues Found
        </TabsTrigger>
        <TabsTrigger
          value="history"
          className={cn(
            '!shadow-none rounded-none text-base',
            styles.tabTrigger
          )}
        >
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="issues" className="mt-3 text-sm">
        <Issues />
      </TabsContent>

      <TabsContent value="history" className="mt-3 text-sm">
        <History />
      </TabsContent>
    </TabsUI>
  );
};
