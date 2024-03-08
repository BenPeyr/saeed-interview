import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export type Data = {
  email: string;
};

const dummyData: Data = {
  email: "example@email.com",
};

export const useData = () =>
  useSWR<Data>(
    "data",
    () =>
      new Promise<Data>((resolve) => {
        setTimeout(() => {
          resolve(dummyData);
        }, 1000);
      }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

export const useUpdateData = () =>
  useSWRMutation<Partial<Data>, unknown, string, Data>(
    "data",
    (key, { arg }) =>
      new Promise<Data>((resolve) => {
        setTimeout(() => {
          resolve({ ...dummyData, ...arg });
        }, 1000);
      }),
    {
      populateCache: true,
      revalidate: false,
    }
  );
