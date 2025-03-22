export interface Snapshot {
  _id: string;
  url: string;
  content: string;
  createdAt: string;
}

export interface SnapshotsResponse {
  count: number;
  results: Snapshot[];
}

export interface DOMNode {
  id: string;
  tag: string;
  children: DOMNode[];
  attributes?: Record<string, string>;
  textContent?: string;
}

export interface MindmapData {
  nodes: DOMNode[];
  connections: Array<{
    source: string;
    target: string;
  }>;
}