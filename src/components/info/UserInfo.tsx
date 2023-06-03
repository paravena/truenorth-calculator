import { User } from '@prisma/client';

type UserInfoProps = {
  user?: User;
  loading?: boolean;
};
const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div className="flex justify-around p-12">
      {user ? (
        <>
          <div>
            <span className="text-sm font-semibold text-gray-900">Email:</span>{' '}
            {user.email}
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Status:</span>{' '}
            {user.status}
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">
              Balance:
            </span>{' '}
            {user.amount}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserInfo;
