export interface AnalyseIA {
  id?: number;
  feedbackId?: number;
  sentiment?: string;
  score?: number;
  mots_cles?: string[];
  resume?: string;
  dateAnalyse?: Date;
}

export interface AnalyseIADTO {
  id?: number;
  feedbackId?: number;
  sentiment?: string;
  score?: number;
  mots_cles?: string[];
  resume?: string;
  dateAnalyse?: string;
}
