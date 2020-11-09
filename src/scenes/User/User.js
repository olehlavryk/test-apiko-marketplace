import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { observer } from 'mobx-react';
import s from './User.module.scss';
import { useUsersCollection } from '../../stores/Users/UsersCollections';
import { UserStatistics } from '../../components/User/UserStatistics/UserStatistics';

export const User = observer(() => {
  const { userId } = useParams();

  const collection = useUsersCollection();
  const user = collection.get(userId);

  useEffect(() => {
    if (!user) {
      collection.getUser.run(userId);
    }
  }, []);

  if (collection.getUser.isLoading) {
    return <div>loading...</div>;
  } else if (!user) {
    return <div>User not found!</div>;
  }

  return (
    <>
      <main className={s.user_scene}>
        <div className="container">
          <div className={s.content_block}>
            <UserStatistics user={user} />
          </div>
        </div>
      </main>
    </>
  );
});
