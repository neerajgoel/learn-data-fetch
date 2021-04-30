
export type data = {
  timeStr: String;
};

export type frame = {
  index: number;
  data: data;
};

export type frames = {
  message: frame[];
};


export type SingleMessageApiResponse = {
  frames: frame[];
};