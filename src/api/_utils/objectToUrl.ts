interface TObjectToUrl {
  [key: string | number | symbol]: string | number | boolean | null | undefined;
}

export const objectToUrl = (object: TObjectToUrl) => {
  // concatenate each key and value with '=' and '&'
  const url = Object.entries(object)
    .reduce((acc, [key, value]) => {
      if (value === null || value === undefined) return acc;
      return `${acc}&${key}=${value}`;
    }, "")
    .slice(1);

  return url;
};

export const objectToQueryString = (object: TObjectToUrl) => {
  const url = objectToUrl(object);

  return url ? `?${url}` : "";
};
