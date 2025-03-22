import { Snapshot } from './Snapshot';

export const mockSnapshots: Snapshot[] = [
  {
    _id: "67de59984fe77eff89a9a4f3",
    url: "http://localhost:5174/",
    content: "<html lang=\"en\"><head>...</head><body>...</body></html>",
    createdAt: "2025-03-22T06:32:56.765Z"
  },
  {
    _id: "67de59984fe77eff89a9a4f4",
    url: "http://localhost:5174/dashboard",
    content: "<html><head>...</head><body><div id=\"app\">...</div></body></html>",
    createdAt: "2025-03-22T06:30:00.000Z"
  },
  {
    _id: "67de59984fe77eff89a9a4f5",
    url: "http://localhost:5174/profile",
    content: "<html><head>...</head><body><main>...</main></body></html>",
    createdAt: "2025-03-22T06:28:00.000Z"
  },
  {
    _id: "67de59984fe77eff89a9a4f6",
    url: "http://localhost:5174/settings",
    content: "<html><head>...</head><body><div class=\"settings\">...</div></body></html>",
    createdAt: "2025-03-22T06:25:00.000Z"
  },
  {
    _id: "67de59984fe77eff89a9a4f7",
    url: "http://localhost:5174/analytics",
    content: "<html><head>...</head><body><section>...</section></body></html>",
    createdAt: "2025-03-22T06:20:00.000Z"
  }
];