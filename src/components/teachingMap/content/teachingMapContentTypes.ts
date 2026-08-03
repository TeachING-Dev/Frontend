export interface TeachingMapContentSection {
  id: number;
  highlightId: number;
  highlightText: string;
  title: string;
  highlightType: "core" | "warning";
  analysisTitle: string;
  analysisDescriptions: string[];
}
