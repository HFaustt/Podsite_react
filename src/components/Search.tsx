import { Input } from "@/components/ui/input";

type SearchProps = {
  onChange: (value: string) => void;
};
export function Search({ onChange }: SearchProps) {
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    onChange(value);
  }
  return (
    <div className="flex w-full max-w-sm items-center">
      <Input
        type="text"
        placeholder="Search"
        className="text-black w-[20rem] mr-4"
        onChange={handleInputChange}
      />
    </div>
  );
}
