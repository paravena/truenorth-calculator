import { OperationRecordResponse } from '@/models';
import { Spinner } from '@/assets/icons/Spinner';

type PaginationProps = OperationRecordResponse['pagination'] & {
  onPreviousPage(): void;
  onNextPage(): void;
  loading: boolean;
};
const Pagination = ({
  count,
  toItem,
  fromItem,
  numberOfPages,
  currentPage,
  onPreviousPage,
  onNextPage,
  loading,
}: PaginationProps) => {
  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{fromItem}</span> to{' '}
          <span className="font-medium">{toItem}</span> of{' '}
          <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        {currentPage > 1 && (
          <a
            href="#"
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            onClick={onPreviousPage}
          >
            Previous
          </a>
        )}
        {currentPage < numberOfPages && (
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
            onClick={onNextPage}
          >
            Next
          </a>
        )}
        {loading && <Spinner />}
      </div>
    </nav>
  );
};
export default Pagination;
