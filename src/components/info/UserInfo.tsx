import { User } from '@prisma/client';
import { Spinner } from '@/assets/icons/Spinner';

type UserInfoProps = {
  user?: User;
  loading: boolean;
};
const UserInfo = ({ user, loading }: UserInfoProps) => {
  return (
    <div className="flex flex-col justify-between p-4 sm:flex-row sm:px-8 sm:py-12">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900">Email:</span>{' '}
        <span className="text-xl">{loading ? <Spinner /> : user?.email}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900">Status:</span>{' '}
        <span className="text-xl">{loading ? <Spinner /> : user?.status}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold text-gray-900">Balance:</span>
        <span className="text-xl">{loading ? <Spinner /> : user?.amount}</span>
      </div>
    </div>
  );
};

export default UserInfo;
