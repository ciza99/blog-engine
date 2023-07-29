import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { axios } from "utils/axios";

const getImage = async (id?: string) => {
  return axios
    .get<Blob>(`/images/${id}`, { responseType: "blob" })
    .then((res) => res.data);
};

/*
 * Simple hook to download image from server and create a blob url.
 * This hook is needed because images are protected by auth headers.
 */
export const useImage = (id?: string) => {
  const [src, setSrc] = useState<string>();
  const { data: image, isLoading } = useQuery({
    queryFn: () => getImage(id),
    queryKey: ["image", id],
    enabled: !!id,
    // Don't refetch images
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!image) {
      setSrc(undefined);
      return;
    }

    const url = URL.createObjectURL(image);
    setSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  return { src, image, isLoading };
};
