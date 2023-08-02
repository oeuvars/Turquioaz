import { createSignal, createEffect } from "solid-js";

const useMediaQuery = (query: string) => {
    const [matches, setMatches ] = createSignal(false);

    createEffect(() => {
        const media = window.matchMedia(query);
        if (media.matches !== matches()) {
            setMatches(media.matches);
        }
        const listener = () => setMatches(media.matches);
        window.addEventListener("resize", listener);
        return () => window.removeEventListener("resize", listener);
    }, [matches, query]);

    return matches;
}

export default useMediaQuery;
