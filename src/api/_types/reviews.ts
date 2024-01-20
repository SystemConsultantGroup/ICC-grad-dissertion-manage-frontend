import { CommonApiResponse, PagedApiResponse, PagedQueryRequest, Stage, Status } from "./common";
import { File } from "./file";
import { User } from "./user";

export type ReviewerRole = "COMMITTEE_CHAIR" | "COMMITTEE_MEMBER" | "ADVISOR";

export interface Reviewer {
  id: number;
  role: ReviewerRole;
  reviewerId: number;
  processId: number;
}

export interface ThesisFile {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  file: File;
}

export interface ThesisInfo {
  title: string;
  abstract: string;
  stage: Stage;
  summary: Status;
  studentInfo: User;
  thesisFile: File;
  presentationFile: File;
}

export interface Review {
  id: number;
  student: string;
  department: string;
  stage: Stage;
  title: string;
  status: Status;
  contentStatus: Status;
  presentationStatus: Status;
  summary: Status;
}

export interface DetailedReview extends Review {
  abstract: string;
  thesisFiles: ThesisFile[];
  comment: string;
  reviewFile: File;
}

export interface DetailedReviewResponse extends CommonApiResponse, DetailedReview {}

export interface DetailedRevision extends Review {
  abstract: string;
  thesisFiles: ThesisFile[];
  signFile: File;
}

export interface DetailedRevisionResponse extends CommonApiResponse, DetailedRevision {}

export interface PagedReviewsResponse extends PagedApiResponse<Review> {}

export interface PagedReviewsRequestQuery extends PagedQueryRequest {
  author?: string;
  department?: string;
  stage?: Stage;
  title?: string;
  status?: Status;
  summary?: Status;
}

export interface ThesisReview {
  id: number;
  thesisInfo: ThesisInfo;
  reviewer: User;
  file: File;
  contentStatus: Status;
  presentationStatus: Status;
  comment: string;
  isFinal: boolean;
  createdAt: string;
  updatedAt: string;
}

// GET: /v1/reviews/result/{id}, /v1/reviews/current/{id}
export interface AdminReviewResponse extends CommonApiResponse {
  id: number;
  title: string;
  student: string;
  department: string;
  abstract: string;
  thesisFiles: ThesisFile[];
  reviews: ThesisReview[];
}

export interface ThesisReviewStatus {
  id: number;
  contentStatus: Status;
  presentationStatus: Status;
  comment: string;
  isFinal: boolean;
  createdAt: string;
  updatedAt: string;
  reviewerId: number;
  thesisInfoId: number;
  fileId: string;
  reviewer: User;
}

export interface AdminReviewStatus {
  id: number;
  student: string;
  department: string;
  stage: Stage;
  title: string;
  reviews: ThesisReviewStatus[];
  reviewers: Reviewer[];
}

// GET: /v1/reviews/current
export interface PagedReviewStatusResponse extends PagedApiResponse<AdminReviewStatus> {}
