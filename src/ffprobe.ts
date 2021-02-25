import { execFile } from "child_process";

interface FfprobeData {
  streams?: FfprobeStream[];
  format?: FfprobeFormat;
  frames?: FFprobeFrame[];
  packets?: FfprobePacket[];
  programs?: FfprobeProgram[];
}

interface FfprobeProgram {
  program_id: number;
  program_num: number;
  nb_streams: number;
  pmt_pid: number;
  pcr_pid: number;
  start_pts: number;
  start_time: string;
  tags: Tags;
  streams: FfprobeStream[];
}
export interface Tags {
  variant_bitrate: string;
}

interface FfprobePacket {
  codec_type: string;
  stream_index: number;
  pts: number;
  pts_time: string;
  dts: number;
  dts_time: string;
  duration: number;
  duration_time: string;
  size: string;
  pos: string;
  flags: string;
  side_data_list?: any[] | null;
}

interface FFprobeFrame {
  media_type: string;
  stream_index: number;
  key_frame: number;
  pkt_pts: number;
  pkt_pts_time: string;
  pkt_dts: number;
  pkt_dts_time: string;
  best_effort_timestamp: number;
  best_effort_timestamp_time: string;
  pkt_duration: number;
  pkt_duration_time: string;
  pkt_pos: string;
  pkt_size: string;
  sample_fmt: string;
  nb_samples: number;
  channels: number;
  channel_layout: string;
}

interface FfprobeStream {
  [key: string]: any;
  index: number;
  codec_name?: string;
  codec_long_name?: string;
  profile?: number;
  codec_type?: string;
  codec_time_base?: string;
  codec_tag_string?: string;
  codec_tag?: string;
  width?: number;
  height?: number;
  coded_width?: number;
  coded_height?: number;
  has_b_frames?: number;
  sample_aspect_ratio?: string;
  display_aspect_ratio?: string;
  pix_fmt?: string;
  level?: string;
  color_range?: string;
  color_space?: string;
  color_transfer?: string;
  color_primaries?: string;
  chroma_location?: string;
  field_order?: string;
  timecode?: string;
  refs?: number;
  id?: string;
  r_frame_rate?: string;
  avg_frame_rate?: string;
  time_base?: string;
  start_pts?: number;
  start_time?: number;
  duration_ts?: string;
  duration?: string;
  bit_rate?: string;
  max_bit_rate?: string;
  bits_per_raw_sample?: string;
  nb_frames?: string;
  nb_read_frames?: string;
  nb_read_packets?: string;
  sample_fmt?: string;
  sample_rate?: number;
  channels?: number;
  channel_layout?: string;
  bits_per_sample?: number;
  disposition?: FfprobeStreamDisposition;
}

interface FfprobeStreamDisposition {
  [key: string]: any;
  default?: number;
  dub?: number;
  original?: number;
  comment?: number;
  lyrics?: number;
  karaoke?: number;
  forced?: number;
  hearing_impaired?: number;
  visual_impaired?: number;
  clean_effects?: number;
  attached_pic?: number;
  timed_thumbnails?: number;
}

interface FfprobeFormat {
  [key: string]: any;
  filename?: string;
  nb_streams?: number;
  nb_programs?: number;
  format_name?: string;
  format_long_name?: string;
  start_time?: number;
  duration?: number;
  size?: number;
  bit_rate?: number;
  probe_score?: number;
  tags?: any[];
}

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
}

export class Ffprobe {
  public static path: string | null = null;

  private static getArgs(inputPath: string, opts: FfprobeOptions) {
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
  }

  public static run(
    input: string,
    opts?: FfprobeOptions
  ): Promise<FfprobeData> {
    const ffprobePath = Ffprobe.path || process.env.FFPROBE_PATH || "ffprobe";
    return new Promise((resolve, reject) => {
      execFile(
        ffprobePath,
        Ffprobe.getArgs(input, opts || {}),
        (err, stdout, stderr) => {
          if (err) {
            return reject(err);
          }
          if (stderr) {
            return reject(stderr);
          }
          resolve(JSON.parse(stdout));
        }
      );
    });
  }
}
