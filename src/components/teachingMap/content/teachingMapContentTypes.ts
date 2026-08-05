export type TeachingMapHighlightType = "MAIN" | "CAUTION";

export interface TeachingMapContentSection {
  id: number;
  highlightId: number;
  highlightText: string;
  title: string;
  highlightType: TeachingMapHighlightType;
  analysisTitle: string;
  analysisDescriptions: string[];
}
