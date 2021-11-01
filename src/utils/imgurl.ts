const imgurl = (url: string) => {
  const host = 'http://image.yoolife.cn';
  if (url.includes(host)) return url;
  return host + url;
};

export {
  imgurl as default
};
