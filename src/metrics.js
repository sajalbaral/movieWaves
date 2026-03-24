import { supabase } from "./supabase";

export const updateSearchCount = async (searchTerm, movie) => {
  if (!searchTerm?.trim() || !movie?.id) return;

  try {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    const { data: existingRow, error: fetchError } = await supabase
      .from("metrics")
      .select("id, count")
      .eq("search_term", normalizedSearchTerm)
      .eq("movie_id", String(movie.id))
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (existingRow) {
      const { error: updateError } = await supabase
        .from("metrics")
        .update({ count: existingRow.count + 1 })
        .eq("id", existingRow.id);

      if (updateError) throw updateError;
    } else {
      const { error: insertError } = await supabase.from("metrics").insert({
        search_term: normalizedSearchTerm,
        count: 1,
        poster_url: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        movie_id: String(movie.id),
      });

      if (insertError) throw insertError;
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTopSearches = async () => {
  try {
    const result = await supabase
      .from("metrics")
      .select("search_term, count, poster_url, movie_id")
      .order("count", { ascending: false })
      .limit(5);

    if (result.error) {
      console.error("Error fetching top searches:", result.error);
      return [];
    }

    return result.data || [];
  } catch (error) {
    console.error("Error fetching top searches:", error);
    return [];
  }
};
