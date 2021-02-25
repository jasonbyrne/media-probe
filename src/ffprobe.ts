import { execFile } from "child_process";
import { FfprobeData } from "./interfaces";
export interface FfprobeOptions {
  showStreams?: boolean;
  showFormat?: boolean;
  showFrames?: boolean;
  showPackets?: boolean;
  showPrograms?: boolean;
  countFrames?: boolean;
  countPackets?: boolean;
  selectType?: "audio" | "video";
  selectIndex?: number;
  path?: string;
}

const getArgs = (inputPath: string, opts: FfprobeOptions): string[] => {
  const args: string[] = [];
  if (opts.showStreams !== false) {
    args.push("-show_streams");
  }
  if (opts.showFormat !== false) {
    args.push("-show_format");
  }
  if (opts.showFrames === true) {
    args.push("-show_frames");
  }
  if (opts.showPackets === true) {
    args.push("-show_packets");
  }
  if (opts.showPrograms === true) {
    args.push("-show_programs");
  }
  if (opts.countFrames === true) {
    args.push("-count_frames");
  }
  if (opts.countPackets === true) {
    args.push("-count_packets");
  }
  if (opts.selectIndex !== undefined || opts.selectType !== undefined) {
    const filter: string[] = [];
    if (opts.selectType !== undefined) {
      filter.push(opts.selectType == "audio" ? "a" : "v");
    }
    if (opts.selectIndex !== undefined) {
      filter.push(opts.selectIndex.toString());
    }
    args.push("-select_streams", filter.join(":"));
  }
  args.push("-v", "quiet", "-print_format", "json", inputPath);
  return args;
};

export const ffprobe = (
  input: string,
  opts?: FfprobeOptions
): Promise<FfprobeData> => {
  const ffprobePath = opts?.path || process.env.FFPROBE_PATH || "ffprobe";
  return new Promise((resolve, reject) => {
    execFile(ffprobePath, getArgs(input, opts || {}), (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      if (stderr) {
        return reject(stderr);
      }
      resolve(JSON.parse(stdout));
    });
  });
};
