// candidate Interfaces
export interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number;
}

export interface CandidatesState {
  list: Candidate[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Campaign interfaces
export interface Campaign {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CampaignState {
  list: Campaign[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface UpdatedCampaign {
  id: string;
  name: string;
  description: string;
  image: string;
}
//  Allowed User Interfaces
export interface AllowedUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface AllowedUserState {
  list: AllowedUser[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
// tokens Interface

export interface Tokens {
  loading: boolean;
  error: null | string;
  cleared: boolean;
}

export interface TokensState {
  tokens: Tokens[];
  loading: boolean;
  error: null | any;
  cleared: boolean;
}
