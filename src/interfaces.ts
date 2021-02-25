export interface FfprobeData {
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
interface Tags {
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
