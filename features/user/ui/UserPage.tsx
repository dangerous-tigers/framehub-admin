'use client';

import { GET_USER } from '@/entities/user/api/getUser.query';
import { UserInfo } from '@/entities/user/ui/userInfo/UserInfo';
import { useUserTabs } from '@/features/user/ui/tabsContent/model/useUserTabs';
import { ROUTES } from '@/shared/config/routes';
import { Back } from '@/shared/ui/components';
import { QueryGetUserArgs, User } from '@/types/__generated__/graphql';
import { useQuery } from '@apollo/client/react';
import { Tabs } from '@dangerous-tigers/framehub-ui-kit/components';

import s from './UserPage.module.scss';

export function UserPage({ id }: { id: string }) {
  const { USER_TABS, handleTabChange, activeTab } = useUserTabs({
    userId: +id,
  });

  const { data } = useQuery<{ getUser: User }, QueryGetUserArgs>(GET_USER, {
    variables: { userId: +id },
  });

  if (!data) {
    return null;
  }

  return (
    <div>
      <Back
        label='Back to Users List'
        path={'/' + ROUTES.USERS}
        className={s.back}
      />
      <div>
        <UserInfo
          user={data?.getUser}
          className={s.userInfo}
        />
        <Tabs
          handleTabChange={handleTabChange}
          defaultValue={activeTab}
          tabs={USER_TABS}
        />
      </div>
    </div>
  );
}
