import Skeletons from "../Skeletons";

type EpisodeSkeletonProps = {
  length: number;
};

export default function EpisodeSkeleton({ length }: EpisodeSkeletonProps) {
  function renderSkeletons() {
    return Array.from({ length: length }).map((_, index) => {
      return <Skeletons key={index} />;
    });
  }
  if (length === 4)
    return (
      <div className="flex gap-24 mt-5 opacity-80">{renderSkeletons()}</div>
    );

  if (length === 9)
    return (
      <div className="grid grid-cols-3 gap-y-24 ml-24  gap-4 mt-28 justify-center opacity-80">
        {renderSkeletons()}
      </div>
    );
}
