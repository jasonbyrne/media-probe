import { Ffprobe } from "./ffprobe";

(async () => {
  const data = await Ffprobe.run(
    "https://damb2tknfsomm.cloudfront.net/uploaded/aAYy1Go5MBVVwwZBB9oZNveaDeo7KEYe/playlist.m3u8",
    {
      selectType: "video",
      selectIndex: 0,
    }
  );
  console.log(data);
})();
