import { Spinner } from '@/assets/icons/Spinner';
import { OperationRecordResponse } from '@/models';
import { Pagination } from '@/components';

type RecordTableProps = {
  records?: OperationRecordResponse;
  loading: boolean;
  onNextPage(): void;
  onPreviousPage(): void;
};
const RecordTable = ({
  records,
  loading,
  onPreviousPage,
  onNextPage,
}: RecordTableProps) => {
  return (
    <div className="px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Operation
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Cost
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Balance
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {records &&
                    records.data.map(record => (
                      <tr key={record.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {record.operation.type}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {record.operation.cost}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {record.amount}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {record.date.toString()}
                        </td>
                      </tr>
                    ))}
                  {loading && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-4 text-sm text-gray-500"
                      >
                        <div className="flex">
                          <Spinner /> <span>Loading...</span>{' '}
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {records && (
                <Pagination
                  {...records?.pagination}
                  loading={loading}
                  onPreviousPage={onPreviousPage}
                  onNextPage={onNextPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordTable;
