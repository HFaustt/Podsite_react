import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  value: number;
};
export default function ProgressBar({ value }: ProgressBarProps) {
  return (
    <div className="absolute ml-4 bottom-[1.1rem] left-[2px] w-[75%]">
      <Progress className="h-[12px]" value={value} />
    </div>
  );
}
