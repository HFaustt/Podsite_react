import { Button } from "./ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};
export default function Pagination({
  currentPage,
  totalPages,

  onChange,
}: PaginationProps) {
  function nextPage() {
    onChange(currentPage + 1);
  }

  function prevPage() {
    onChange(currentPage - 1);
  }

  function renderPages() {
    return Array.from({ length: totalPages }).map((_, index) => {
      return (
        <button
          key={index}
          onClick={() => onChange(index + 1)}
          className={`px-3 mx-2 py-1 rounded-md hover:bg-yellow-300 hover:text-black transition-all duration-300 ${
            index + 1 === currentPage ? "bg-yellow-500 text-black" : "bg-black"
          }`}
        >
          {index + 1}
        </button>
      );
    });
  }

  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 font-semibold"
      >
        Previous
      </Button>
      <div>{renderPages()}</div>
      <Button
        onClick={nextPage}
        disabled={totalPages === currentPage}
        className="rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 font-semibold"
      >
        Next
      </Button>
    </div>
  );
}
