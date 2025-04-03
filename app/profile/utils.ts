import { fetchConfig } from "../fetchConfig";
import { Profile } from "./interface";

export const getMyProfile = async (): Promise<{
  profile?: Profile;
  error?: string;
}> => {
  const res = await fetchConfig(`/user/manage/`);

  if (res.data) {
    return { profile: res.data };
  } else return { error: res.error };
};

export const getProfile = async (
  username: string
): Promise<{
  profile?: Profile;
  error?: string;
}> => {
  const res = await fetchConfig(`/user/manage/${username}/`);

  if (res.data) {
    return { profile: res.data };
  } else return { error: res.error };
};
