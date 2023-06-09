import './Pagination.css';
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
}: PaginationProps) => (
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
        <button
          className="nav-button disabled:opacity-75"
          onClick={onPreviousPage}
          disabled={loading}
        >
          Previous {loading && <Spinner />}
        </button>
      )}
      {currentPage < numberOfPages && (
        <button
          className="nav-button ml-3 disabled:opacity-75"
          onClick={onNextPage}
          disabled={loading}
        >
          Next {loading && <Spinner />}
        </button>
      )}
    </div>
  </nav>
);
export default Pagination;
