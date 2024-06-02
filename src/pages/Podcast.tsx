import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useCallback, Suspense } from "react";
import EpisodeCard from "@/components/shared/EpisodeCard";
import Pagination from "@/components/Pagination";
import EpisodeSkeleton from "@/components/shared/EpisodeSkeleton";
import { EpisodeType } from "@/types/episode";
import { getEpisodes, getSearchedEpisodes } from "@/api/getShow";
import { getAccessToken } from "@/api/spotifyApi";
import { Search } from "@/components/Search";
import { debounce } from "lodash";
import { IoSearchOutline } from "react-icons/io5";

export default function Podcast() {
  const [isAccessTokenFetched, setIsAccessTokenFetched] = useState(false);

  useQuery({
    queryKey: ["getAccessToken"],
    queryFn: async () => {
      await getAccessToken();
      setIsAccessTokenFetched(true);
    },
    enabled: !isAccessTokenFetched,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const LIMIT = 9;
  const offset = (currentPage - 1) * LIMIT;

  const [allEpisodes, setAllEpisodes] = useState<EpisodeType[]>([]);

  const {
    data: episodes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["getEpisodes", currentPage],
    queryFn: () =>
      getEpisodes({ limit: String(LIMIT), offset: offset.toString() }),
    enabled: !search || isAccessTokenFetched,
  });

  const {
    data: searchedEp,
    error: searchError,
    isLoading: isSearching,
  } = useQuery({
    queryKey: ["getSearchedEpisodes"],
    queryFn: getSearchedEpisodes,
  });

  useEffect(() => {
    if (searchedEp) {
      setAllEpisodes(searchedEp.items);
    }
  }, [searchedEp]);

  const totalPages = Math.ceil(
    (episodes?.total || 0) / (episodes?.limit || LIMIT)
  );

  function handlePageChange(page: number) {
    setCurrentPage(page);
    navigate(`?page=${page}`);
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleAudioPlay = (id: string) => {
    setCurrentPlayingId(id === currentPlayingId ? null : id);
  };

  const debouncedSearch = debounce((value, callback) => {
    callback(value);
  }, 500);

  const onSearch = useCallback((searchValue: string) => {
    debouncedSearch(searchValue, setSearch);
  }, []);

  if (isLoading || isSearching)
    return (
      <div className="items-center justify-center ml-10 mt-[25rem]">
        <EpisodeSkeleton length={LIMIT} />
      </div>
    );

  if (error || searchError)
    return (
      <div>
        Failed to load data...
        <p>{error?.message || searchError?.message}</p>
      </div>
    );

  const filteredEpisodes = search
    ? allEpisodes.filter((episode: EpisodeType) =>
        episode.name.toLowerCase().includes(search.toLowerCase())
      )
    : episodes.items;

  return (
    <div>
      <div className="flex items-center justify-center h-[26rem] bg-black">
        <img
          src="/micBG.webp"
          alt="background image"
          className="object-cover w-full h-full opacity-60"
        />
        <h1 className="text-5xl font-bold text-center absolute top-[10rem]">
          Podcast
        </h1>
        <div className="absolute mt-[5rem] flex items-center">
          <Search onChange={onSearch} />
          <IoSearchOutline className="text-2xl absolute right-6 text-black" />
        </div>
      </div>
      <Suspense>
        <div className="grid mx-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-14 gap-4 mt-10 justify-center">
          {filteredEpisodes?.map((episode: EpisodeType) => (
            <EpisodeCard
              key={episode.id}
              episode={episode}
              isPlaying={episode.id === currentPlayingId}
              onTogglePlay={() => handleAudioPlay(episode.id)}
              title={episode.name}
            />
          ))}
        </div>
      </Suspense>
      <div className="flex items-center justify-center mt-10">
        {!search && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
